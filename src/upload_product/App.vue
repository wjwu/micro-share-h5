<template>
  <div>
    <div class="weui-cells__title">上传商品</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入商品名">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <p class="weui-uploader__title">图片</p>
              <div class="weui-uploader__info">0/2</div>
            </div>
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles">
                <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
                  <div class="weui-uploader__file-content">
                    <i class="weui-icon-warn"></i>
                  </div>
                </li>
                <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
                  <div class="weui-uploader__file-content">50%</div>
                </li>
              </ul>
              <div class="weui-uploader__input-box">
                <input id="uploaderInput" @change="handleImgChange($event)" class="weui-uploader__input" type="file" accept="image/*" multiple="">
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
          <input class="weui-input" type="text" placeholder="请输入商品价格">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">成本</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="成本价（可选）">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">库存</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="库存数量">
        </div>
      </div>
    </div>
    <div class="weui-cells__title">描述</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="请输入商品描述信息（可选）" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>0</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">确定</a>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import * as qiniu from 'qiniu-js';
import axios from 'axios';
// import { auth } from '../common/js/auth';
import config from '../common/js/config';
import { tryFunc, openToast } from '../common/js/common';

export default {
  data() {
    return {
      token: ''
    };
  },
  created() {
    tryFunc(async () => {
      const { data } = await axios.get(`${config.apiHost}/token`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.token = data.uptoken;
    });
  },
  methods: {
    handleImgChange(e) {
      if (!this.token) {
        openToast('上传Token无效，请刷新页面重试');
        return;
      }
      let file = e.target.files[0];
      const observable = qiniu.upload(
        file,
        null,
        this.token,
        {
          fname: file.name,
          params: {},
          mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
        },
        {
          useCdnDomain: false,
          disableStatisticsReport: false,
          retryCount: 3,
          region: null
        }
      );
      observable.subscribe({
        next(res) {
          console.log(res);
        },
        error(error) {
          console.log(error);
        },
        complete(res) {
          console.log(res);
        }
      });
    },
    handleSave() {}
  }
};
</script>

