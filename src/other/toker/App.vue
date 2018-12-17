<template>
  <div v-if="showApp">
    <weui-cells-title>二维码：请导入您的微信号或微信群二维码，以便后续制作海报时统一导入使用。（请保持正方形）</weui-cells-title>
    <weui-cells-title>店铺名称：请输入您的不超过6个字的店铺名称，以便在后续制作海报/货架时制作店铺水印信章使用。</weui-cells-title>
    <weui-cells-title>店铺地址：请输入您的店铺地址信息，以便在海报中使用（由于空间限制，请简化填写地址信息）。</weui-cells-title>
    <weui-cells>
      <weui-cell label="店铺名称">
        <input v-model="shopName" class="weui-input" type="text" placeholder="请输入店铺名称（不超过10字)" maxlength="10">
      </weui-cell>
      <weui-cell label="店铺地址">
        <input v-model="shopAddress" class="weui-input" type="text" placeholder="请输入店铺地址（不超过20字）" maxlength="20">
      </weui-cell>
      <image-upload title="二维码" :token="token" v-model="images"></image-upload>
      <image-upload title="宣传展示图" tip="（请您选择一张和您商品贴切相关的精美图片）" :token="token" v-model="logos"></image-upload>
      <image-upload title="商城背景图" :token="token" v-model="bgs"></image-upload>
    </weui-cells>
    <weui-cells-title>店铺描述</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <weui-textarea v-model="shopDesc" placeholder="请输入店铺描述" rows="3" maxlength="100"></weui-textarea>
      </weui-cell>
    </weui-cells>
    <weui-cells-title>店长公告</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <weui-textarea v-model="shopNotice" placeholder="请输入店长公告" rows="3" maxlength="50"></weui-textarea>
      </weui-cell>
    </weui-cells>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleSave">提交</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc, openAlert } from '../../common/js/common';
import {
  ImageUpload,
  WeuiCellsTitle,
  WeuiCells,
  WeuiCell,
  WeuiBtnArea,
  WeuiBtn,
  WeuiTextarea
} from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    ImageUpload,
    WeuiCellsTitle,
    WeuiCells,
    WeuiCell,
    WeuiBtnArea,
    WeuiBtn,
    WeuiTextarea
  },
  data() {
    return {
      showApp: false,
      shopName: '',
      shopAddress: '',
      shopDesc: '',
      shopNotice: '',
      token: '',
      images: [],
      logos: [],
      bgs: [],
      imageHost: config.imageHost
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      let response = await axios.get('/token');
      this.token = response.data.uptoken;
      response = await axios.get('/user/shopInfo');
      if (response.data) {
        this.shopName = response.data.name;
        this.shopAddress = response.data.address;
        this.shopDesc = response.data.description;
        this.shopNotice = response.data.notice;
        let bgs = response.data.background;
        if(bgs){
           this.bgs = [bgs.substr(bgs.lastIndexOf('/') + 1)];
        }
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
      if (!this.shopName) {
        openAlert('请输入店铺名称');
        return;
      }
      if (!this.shopAddress) {
        openAlert('请输入店铺地址');
        return;
      }
      if (this.images.length === 0) {
        openAlert('请上传至少一张二维码图片');
        return;
      }
      if (this.logos.length === 0) {
        openAlert('请上传至少一张宣传展示图');
        return;
      }
      if (this.bgs.length === 0) {
        openAlert('请上传至少一张商城背景图');
        return;
      }
      if (!this.shopDesc) {
        openAlert('请输入店铺描述');
        return;
      }
      if (!this.shopNotice) {
        openAlert('请输入店长公告');
        return;
      }
      tryFunc(async () => {
        await axios.post('/user/shopInfo', {
          address: this.shopAddress,
          description: this.shopDesc,
          notice: this.shopNotice,
          name: this.shopName,
          src: this.images.map(item => `${this.imageHost}/${item}`).join(','),
          logo: this.logos.map(item => `${this.imageHost}/${item}`).join(','),
          background: this.bgs
            .map(item => `${this.imageHost}/${item}`)
            .join(',')
        });
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

