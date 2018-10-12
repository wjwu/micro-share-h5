<template>
  <div v-if="showApp">
    <div class="weui-cells__title">生成海报</div>
    <div class="weui-cells weui-cells_form">
      <img :src="source" id='template'>
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
            <option v-for="(qr,i) in qrImgs" :key="i" :value="qr.img + '?imageView2/2/w/200/h/200/q/75|imageslim'">{{qr.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSave">提交</a>
    </div>
    <!--画布-->
    <canvas id="main" :height="canvasMaxHeight" :width="canvasMaxWidth" style="display:none"></canvas>
    <!--二维码-->
    <img id="qrcode" :src="selectedQr" style="display:none" />
  </div>
</template>

<script>
import axios from 'axios';
import weui from 'weui.js';
import { auth } from '../../../common/js/auth';
import config from '../../../common/js/config';
import { tryFunc, openToast, getQueryString } from '../../../common/js/common';
import '../../../common/js/share';

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
      source: getQueryString('s'),
      template: getQueryString('t'),
      qrImgs: [],
      title: '',
      subTitle: '',
      selectedQr: '',
      canvasMaxWidth: 900,
      canvasMaxHeight: 500
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/user/shopInfo`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      if (data) {
        var name = data.qrTitle;
        if (name) {
          this.qrImgs = [{ name: name, img: data.src }];
        }
      }
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

      this.make();
    },
    async make() {
      const loading = weui.loading('数据加载中');
      try {
        const context = await this.createCanvas(this.template);
        this.drawQrCode(context, this.canvasMaxWidth, this.canvasMaxHeight);
        this.drawTitle(context, this.template, this.title, this.subTitle);
        setTimeout(() => {
          this.convertToImage(loading);
        }, 500);
      } catch (e) {
        console.error(e);
        alert(JSON.stringify(e));
      }
    },
    createCanvas(templateUrl) {
      let canvas = document.getElementById('main');
      let context = canvas.getContext('2d');
      context.clearRect(0, 0, 1000, 1000);

      let tmpImg = new Image();
      tmpImg.setAttribute('crossOrigin', 'Anonymous');
      tmpImg.src = templateUrl;

      return new Promise((resolve, reject) => {
        if (tmpImg.complete) {
          context.drawImage(tmpImg, 0, 0, 900, 500);
          resolve(context);
        } else {
          tmpImg.onload = () => {
            context.drawImage(tmpImg, 0, 0, 900, 500);
            resolve(context);
          };
        }
      });
    },
    drawQrCode(context, maxWidth, maxHeight) {
      let qrcode = new Image();
      qrcode.setAttribute('crossOrigin', 'Anonymous');
      qrcode.src = document.getElementById('qrcode').src;

      let qrcodeSize = maxWidth / 8;
      const doDraw = () => {
        context.drawImage(
          qrcode,
          maxWidth - qrcodeSize - maxWidth * 0.1,
          maxHeight - qrcodeSize - maxHeight * 0.1,
          qrcodeSize,
          qrcodeSize
        );
      };
      if (qrcode.complete) {
        doDraw();
      } else {
        qrcode.onload = doDraw;
      }
    },
    drawTitle(context, templateUrl, title, subTitle) {
      let fileName = templateUrl.substring(templateUrl.lastIndexOf('/') + 1);
      const titlesParams = fileName.split('.')[0].split('+');
      for (let i = 0; i < titlesParams.length; i++) {
        let point = titlesParams[i].split(',');
        // 设置用户文本的大小字体等属性
        context.font = 'small-caps bold ' + point[1] + 'px 微软雅黑';
        // 设置用户文本填充颜色
        context.fillStyle = point[0];
        // 绘制文字
        let text;
        if (i === 0) {
          text = title;
        } else {
          text = subTitle;
        }
        let textWidth = context.measureText(text).width;
        context.fillText(text, point[2] - textWidth / 2, point[3]);
      }
    },
    convertToImage(loading) {
      let canvas = document.getElementById('main');
      let imageData = canvas.toDataURL('image/png');
      document.getElementById('template').setAttribute('src', imageData);
      loading.hide();
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



