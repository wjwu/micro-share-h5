<template>
  <div v-if="showApp">
    <div class="weui-cells__title">上传商品</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入商品名(不超过50字)" maxlength="50" v-model="product.name">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <p class="weui-uploader__title">图片（最大4MB）</p>
              <div class="weui-uploader__info">{{images.length}}/5</div>
            </div>
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles">
                <li v-for="(image,i) in images" :key="i" class="weui-uploader__file" @click="handleImgClick(image,i)" :style="`background-image:url('${imageHost}/${image}')`"></li>
                <li v-if="uploading" class="weui-uploader__file weui-uploader__file_status">
                  <div class="weui-uploader__file-content">{{percent}}%</div>
                </li>
              </ul>
              <div v-if="images.length !== 5" class="weui-uploader__input-box">
                <input id="uploaderInput" @change="handleImgChange($event)" class="weui-uploader__input" type="file" accept="image/*" multiple="multiple">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">价格</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="product.sellPrice" type="text" pattern="[0-9]*" @textInput="handlKeyDownPrice($event)" placeholder="请输入商品价格">
        </div>
      </div>
    </div>
    <div class="weui-cells__title">描述</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" v-model="product.description" maxlength="100" placeholder="请输入商品描述信息（可选）,不超过100字" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>{{product.description.length}}</span>/100</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">提交</a>
    </div>
    <back></back>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js';
import axios from 'axios';
import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc, openToast } from '../../common/js/common';
import Back from '../../common/components/Back';

export default {
  components: {
    Back
  },
  data() {
    return {
      product: {
        name: '',
        sellPrice: '',
        description: ''
      },
      token: '',
      uploading: false,
      percent: 0,
      images: [],
      imageHost: config.imageHost,
      regPrice: new RegExp('[0-9\\.]'),
      showApp: false
    };
  },
  created() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/token`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.token = data.uptoken;
    });
  },
  methods: {
    async handleImgChange(e) {
      if (!this.token) {
        openToast('上传Token无效，请刷新页面重试');
        return;
      }
      for (let file of e.target.files) {
        if (!file) {
          continue;
        }
        if (file.size > 1024 * 1024 * 4) {
          openToast(`图片${file.name}大小超过4MB，无法上传`);
        } else {
          this.upload(file);
        }
      }
    },
    upload(file) {
      const observable = qiniu.upload(
        file,
        null,
        this.token,
        {
          mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
        },
        {
          useCdnDomain: false,
          disableStatisticsReport: false,
          retryCount: 3,
          region: null
        }
      );
      const _this = this;
      this.uploading = true;
      observable.subscribe({
        next(res) {
          _this.percent = res.total.percent.toFixed(0);
        },
        error(error) {
          openToast(JSON.stringify(error));
        },
        complete(res) {
          _this.uploading = false;
          _this.percent = 0;
          _this.images.push(res.hash);
        }
      });
    },
    handleImgClick(hash, idx) {
      const _this = this;
      const gallery = weui.gallery(`${this.imageHost}/${hash}`, {
        onDelete: function() {
          if (confirm('确定删除该图片？')) {
            _this.images.splice(idx, 1);
          }
          gallery.hide(function() {});
        }
      });
    },
    handlKeyDownStock(e) {
      if (!/^[0-9]$/.test(e.data)) {
        e.preventDefault();
      }
    },
    handlKeyDownPrice(e) {
      if (!this.regPrice.test(e.data)) {
        e.preventDefault();
      }
    },
    handleSave() {
      if (!this.product.name) {
        openToast('请输入商品名称');
        return;
      }
      if (this.images.length === 0) {
        openToast('请至少上传一张商品图片');
        return;
      }
      const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      if (!reg.test(this.product.sellPrice)) {
        openToast('商品价格不能为空，最多保留两位小数');
        return;
      }
      const _this = this;
      tryFunc(async () => {
        await axios.post(
          `${config.apiHost}/item`,
          {
            ...this.product,
            imgUrl: this.images
              .map(item => `${this.imageHost}/${item}`)
              .join(',')
          },
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
        const dialog = weui.dialog({
          content: '操作成功',
          buttons: [
            {
              label: '货架管理',
              type: 'default',
              onClick: () => {
                window.location.href = './shelves.html';
              }
            },
            {
              label: '继续上传',
              type: 'primary',
              onClick: () => {
                _this.product = {
                  name: '',
                  sellPrice: '',
                  description: ''
                };
                _this.images = [];
                dialog.hide();
              }
            }
          ]
        });
      });
    }
  }
};
</script>

