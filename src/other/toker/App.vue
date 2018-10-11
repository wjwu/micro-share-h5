<template>
  <div v-if="showApp">
    <div class="weui-cells__title">我的二维码：请导入您的微信号和微信群二维码，以便后续制作海报时统一导入使用。（请保持正方形）</div>
    <div class="weui-cells__title">我的店铺名称：请输入您的不超过6个字的店铺名称，以便在后续制作海报/货架时制作店铺水印信章使用。</div>
    <div class="weui-cells__title">我的店铺地址：请输入您的店铺地址信息，以便在海报中使用（由于空间限制，请简化填写地址信息）。</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">店铺名称</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="shopName" class="weui-input" type="text" placeholder="请输入店铺名称" maxlength="6">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">店铺地址</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="shopAddress" class="weui-input" type="text" placeholder="请输入店铺地址" maxlength="20">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">条码名称</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="name" class="weui-input" type="text" placeholder="请输入条码名称" maxlength="20">
        </div>
      </div>
      <div class="page__bd">
        <div class="weui-gallery" id="gallery">
          <span class="weui-gallery__img" id="galleryImg"></span>
          <div class="weui-gallery__opr">
            <a href="javascript:" class="weui-gallery__del">
              <i class="weui-icon-delete weui-icon_gallery-delete"></i>
            </a>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <p class="weui-uploader__title">二维码（最大4MB）</p>
                <div class="weui-uploader__info">{{images.length}}/1</div>
              </div>
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">
                  <li v-for="(image,i) in images" :key="i" class="weui-uploader__file" @click="handleImgClick(image,i)" :style="`background-image:url('${imageHost}/${image}')`"></li>
                  <li v-if="uploading" class="weui-uploader__file weui-uploader__file_status">
                    <div class="weui-uploader__file-content">{{percent}}%</div>
                  </li>
                </ul>
                <div v-if="images.length !== 1" class="weui-uploader__input-box">
                  <input id="uploaderInput" @change="handleImgChange($event)" class="weui-uploader__input" type="file" accept="image/*">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">店铺描述</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="shopDesc" class="weui-textarea" placeholder="请输入店铺描述" rows="3" maxlength="100"></textarea>
          <div class="weui-textarea-counter"><span>{{shopDesc.length}}</span>/100</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSave">提交</a>
    </div>
    <back></back>
  </div>
</template>

<script>
import * as qiniu from "qiniu-js";
import axios from "axios";
import weui from "weui.js";
import { auth } from "../../common/js/auth";
import config from "../../common/js/config";
import { tryFunc, openToast } from "../../common/js/common";
import Back from "../../common/components/Back";
import "../../common/js/share";

export default {
  components: {
    Back
  },
  data() {
    return {
      showApp: false,
      name: "",
      shopName: "",
      shopAddress: "",
      shopDesc: "",
      token: "",
      uploading: false,
      percent: 0,
      images: [],
      imageHost: config.imageHost
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      let response = await axios.get(`${config.apiHost}/token`, {
        headers: {
          userId: localStorage.getItem("userId")
        }
      });
      this.token = response.data.uptoken;
      response = await axios.get(`${config.apiHost}/user/shopInfo`, {
        headers: {
          userId: localStorage.getItem("userId")
        }
      });
      if (response.data) {
        this.name = response.data.qrTitle;
        this.shopName = response.data.name;
        this.shopAddress = response.data.address;
        this.shopDesc = response.data.description;
        let src = response.data.src;
        if (src) {
          this.images = [src.substr(src.lastIndexOf("/") + 1)];
        }
      }
    });
  },
  methods: {
    async handleImgChange(e) {
      if (!this.token) {
        openToast("上传Token无效，请刷新页面重试");
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
          mimeType: ["image/png", "image/jpeg", "image/jpg", "image/gif"]
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
          if (confirm("确定删除该图片？")) {
            _this.images.splice(idx, 1);
          }
          gallery.hide(function() {});
        }
      });
    },
    handleSave() {
      if (this.images.length !== 0 && !this.name) {
        openToast("请输入条码名称");
        return;
      }
      if (!this.shopName) {
        openToast("请输入店铺名称");
        return;
      }
      tryFunc(async () => {
        await axios.post(
          `${config.apiHost}/user/shopInfo`,
          {
            address: this.shopAddress,
            description: this.shopDesc,
            name: this.shopName,
            qrTitle: this.name,
            src: this.images.map(item => `${this.imageHost}/${item}`).join(",")
          },
          {
            headers: {
              userId: localStorage.getItem("userId")
            }
          }
        );
        weui.alert("操作成功", () => {
          // this.name = '';
          // this.shopName = '';
          // this.shopAddress = '';
          // this.shopDesc = '';
          // this.images = [];
        });
      });
    }
  }
};
</script>

