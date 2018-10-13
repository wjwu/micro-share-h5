<template>
  <div v-if="product && showApp">
    <div class="weui-cells__title">修改商品信息</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入商品名" maxlength="100" v-model="product.name">
        </div>
      </div>
      <image-upload title="商品图片" :token="token" :max="5" v-model="images" multiple></image-upload>
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
          <textarea class="weui-textarea" v-model="product.description" maxlength="200" placeholder="请输入商品描述信息（可选）" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>{{product.description.length}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">提交</a>
    </div>
  </div>
</template>

<script>
import weui from 'weui.js';
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc, openAlert, getQueryString } from '../../common/js/common';
import ImageUpload from '../../common/components/ImageUpload';
import '../../common/js/share';

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      pId: getQueryString('pId'),
      product: null,
      token: '',
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
      const { data } = await axios.get('/token');
      this.token = data.uptoken;
    });
  },
  mounted() {
    tryFunc(async () => {
      if (!this.pId) {
        openAlert('商品编号无效');
        return;
      }
      const { data } = await axios.get(`/item/${this.pId}`);
      this.product = data;
      this.images = data.imgUrl
        .split(',')
        .map(item => item.substr(item.lastIndexOf('/') + 1));
    });
  },
  methods: {
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
        openAlert('请输入商品名称');
        return;
      }
      if (this.images.length === 0) {
        openAlert('请至少上传一张商品图片');
        return;
      }
      const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      if (!reg.test(this.product.sellPrice)) {
        openAlert('商品价格不能为空，最多保留两位小数');
        return;
      }
      tryFunc(async () => {
        await axios.put(
          `${config.apiHost}/item/${this.pId}`,
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
              label: '留在本页',
              type: 'primary',
              onClick: () => {
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

