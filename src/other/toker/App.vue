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
      <image-upload title="二维码" :token="token" v-model="images"></image-upload>
      <image-upload title="店铺Logo" :token="token" v-model="logos"></image-upload>
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
  </div>
</template>

<script>
import axios from 'axios';
import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc, openToast } from '../../common/js/common';
import ImageUpload from '../../common/components/ImageUpload';
import '../../common/js/share';

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      showApp: false,
      name: '',
      shopName: '',
      shopAddress: '',
      shopDesc: '',
      token: '',
      images: [],
      logos: [],
      imageHost: config.imageHost
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      let response = await axios.get(`${config.apiHost}/token`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.token = response.data.uptoken;
      response = await axios.get(`${config.apiHost}/user/shopInfo`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      if (response.data) {
        this.name = response.data.qrTitle;
        this.shopName = response.data.name;
        this.shopAddress = response.data.address;
        this.shopDesc = response.data.description;
        let src = response.data.src;
        if (src) {
          this.images = [src.substr(src.lastIndexOf('/') + 1)];
        }
        let logo = response.data.logo;
        if (logo) {
          this.logos = [logo.substr(logo.lastIndexOf('/') + 1)];
        }
      }
    });
  },
  methods: {
    handleSave() {
      if (this.images.length !== 0 && !this.name) {
        openToast('请输入条码名称');
        return;
      }
      if (!this.shopName) {
        openToast('请输入店铺名称');
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
            src: this.images.map(item => `${this.imageHost}/${item}`).join(','),
            logo: this.logos.map(item => `${this.imageHost}/${item}`).join(',')
          },
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
        weui.alert('操作成功', () => {
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

