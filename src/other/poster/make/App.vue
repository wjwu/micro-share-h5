<template>
  <div v-if="showApp">
    <div class="weui-cells__title">生成海报</div>
    <div class="weui-cells weui-cells_form">
      <img :src="template" id='template'>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">主标题</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="title" class="weui-input" type="text" placeholder="请输入主标题">
        </div>
      </div>
      <div class="weui-cell" v-if="hasSubTitle">
        <div class="weui-cell__hd">
          <label class="weui-label">副标题</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="subTitle" class="weui-input" type="text" placeholder="请输入副标题">
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">二维码</label>
        </div>
        <div class="weui-cell__bd">
          <select v-model="selectedQr" class="weui-select">
            <option value="" v-if="qrImgs.length > 0">请选择二维码</option>
            <option v-for="(qr,i) in qrImgs" :key="i" :value="qr.img">{{qr.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSave">提交</a>
    </div>
    <!--画布-->
    <canvas id="main" height="500px" width="900px" style="display:none;"></canvas>
    <!--二维码-->
    <img id="qrcode" style="display:none;" :src="selectedQr" />
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import { auth } from '../../../common/js/auth';
import config from '../../../common/js/config';
import { tryFunc, openToast, getQueryString } from '../../../common/js/common';

export default {
  computed: {
    hasSubTitle() {
      if (this.template) {
        let fileName = this.template.substring(
          this.template.lastIndexOf('/') + 1
        );
        const titles = fileName.split('.')[0].split('+');
        return titles.length > 1;
      }
      return false;
    }
  },
  data() {
    return {
      showApp: false,
      template: getQueryString('t'),
      qrImgs: [],
      title: '',
      subTitle: '',
      selectedQr: '',
      ctx: null
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/user/qrcode`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.qrImgs = data;
    });
  },
  methods: {
    handleSave() {
      if (!this.title) {
        openToast('请输入主标题');
        return;
      }
      if (!this.subTitle) {
        openToast('请输入副题');
        return;
      }
      if (!this.selectedQr) {
        openToast('请选择二维码');
        return;
      }
      this.initCanvas();
      this.make();
    },
    initCanvas() {
      // 获取画布对象
      let canvas = document.getElementById('main');
      let mainCtx = canvas.getContext('2d');
      this.ctx = mainCtx;
      let maxWidth = canvas.width;
      let maxHeight = canvas.height;
      mainCtx.clearRect(0, 0, 1000, 1000);
      // 获取图片的实际路径
      let starImg = new Image();
      starImg.src = this.$el.querySelector('#template').attributes['src'].value;
      starImg.setAttribute('crossOrigin', 'Anonymous');

      // 合成
      starImg.onload = function() {
        // 先把图片绘制在这里
        mainCtx.drawImage(starImg, 0, 0, 900, 500);
      };

      let qrcode = new Image();
      qrcode.src = this.$el.querySelector('#qrcode').attributes['src'].value;
      qrcode.setAttribute('crossOrigin', 'Anonymous');

      // 合成
      let qrcodeSize = maxWidth / 8;
      qrcode.onload = function() {
        // 先把图片绘制在这里
        mainCtx.drawImage(
          qrcode,
          maxWidth - qrcodeSize - maxWidth * 0.1,
          maxHeight - qrcodeSize - maxHeight * 0.1,
          qrcodeSize,
          qrcodeSize
        );
      };
    },
    make() {
      let fileName = this.template.substring(
        this.template.lastIndexOf('/') + 1
      );
      const titlesParams = fileName.split('.')[0].split('+');
      for (let i = 0; i < titlesParams.length; i++) {
        let point = titlesParams[i].split(',');
        // 设置用户文本的大小字体等属性
        this.ctx.font = 'small-caps bold ' + point[1] + 'px 微软雅黑';
        // 设置用户文本填充颜色
        this.ctx.fillStyle = point[0];
        // 绘制文字
        let text;
        if (i === 0) {
          text = this.title;
        } else {
          text = this.subTitle;
        }
        let textWidth = this.ctx.measureText(text).width;
        this.ctx.fillText(text, point[2] - textWidth / 2, point[3]);
      }

      let canvas = document.getElementById('main');
      let imageData = canvas.toDataURL('image/png');
      this.$el.querySelector('#template').src = imageData;
      openToast('生成成功，请长按图片保存到手机');
    }
  }
};
</script>

<style lang="scss">
.weui-cells_form {
  img {
    width: 100%;
  }
}
</style>



