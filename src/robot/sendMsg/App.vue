<template>
  <div class="main" v-if="showApp">
    <div class="weui-cells__title">今日还剩
      <b style="color:red;">{{times}}</b> 次群发消息</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">消息类型</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="messageType">
            <option selected="selected" value="TEXT">文本</option>
            <option value="IMG">图片</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form" v-if="messageType === 'IMG'">
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
                <input id="uploaderInput" @change="handleImgChange($event)" class="weui-uploader__input" type="file" accept="image/*" multiple="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title" v-if="messageType === 'TEXT'">消息内容</div>
    <div class="weui-cells weui-cells_form" v-if="messageType === 'TEXT'">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="请输入群发消息内容" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>0</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">请选择需要群发的群组和群</div>
    <div class="weui-cells weui-cells_checkbox">
      <label class="weui-cell weui-check__label" :for="room.id" v-for="room in rooms" :key="room.id">
        <div class="weui-cell__hd">
          <input type="checkbox" class="weui-check" :id="room.id">
          <i class="weui-icon-checked"></i>
        </div>
        <div class="weui-cell__bd">
          <p>{{room.name}}</p>
        </div>
      </label>
      <div class="weui-cell" v-if="!rooms || rooms.length === 0">暂无可用群</div>
    </div>
    <div class="weui-cells__title">请选择发送类型</div>
    <div class="weui-cells weui-cells_radio">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">发送类型</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="sendType">
            <option selected="selected" value="IMT">立即发送</option>
            <option value="TIMING">定时发送</option>
          </select>
        </div>
      </div>
      <label v-if="sendType === 'TIMING'" class="weui-cell weui-check__label" for="no-repeat">
        <div class="weui-cell__bd">
          <p>不重复发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" id="no-repeat" name="radioSend" checked="checked">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TIMING'" class="weui-cell weui-check__label" for="every">
        <div class="weui-cell__bd">
          <p>每天发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" id="every" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TIMING'" class="weui-cell weui-check__label" for="mon">
        <div class="weui-cell__bd">
          <p>每周一发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" id="mon" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TIMING'" class="weui-cell weui-check__label" for="tue">
        <div class="weui-cell__bd">
          <p>每周二发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" id="tue" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TIMING'" class="weui-cell weui-check__label" for="wed">
        <div class="weui-cell__bd">
          <p>每周三发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" id="wed" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TIMING'" class="weui-cell weui-check__label" for="thu">
        <div class="weui-cell__bd">
          <p>每周四发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" id="thu" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TIMING'" class="weui-cell weui-check__label" for="fri">
        <div class="weui-cell__bd">
          <p>每周五发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" id="fri" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TIMING'" class="weui-cell weui-check__label" for="sat">
        <div class="weui-cell__bd">
          <p>每周六发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" id="sat" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TIMING'" class="weui-cell weui-check__label" for="sun">
        <div class="weui-cell__bd">
          <p>每周日发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" id="sun" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" :disabled="disabled" href="javascript:;">发送</a>
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js';
// import axios from 'axios';
import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc, openToast } from '../../common/js/common';

export default {
  data() {
    return {
      showApp: false,
      times: null,
      messageType: 'TEXT',
      sendType: 'IMT',
      rooms: [],
      disabled: false,
      token: '',
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
      // let { data } = await axios.get(`${config.apiHost}/token`, {
      //   headers: {
      //     userId: localStorage.getItem('userId')
      //   }
      // });
      // this.token = data.uptoken;
      // data = await axios.get(`${config.apiHost}/user/myRoom`, {
      //   headers: {
      //     userId: localStorage.getItem('userId')
      //   }
      // });
      // if (!data || data.length === 0) {
      //   this.disabled = true;
      // }
      // this.rooms = data;
      // this.rooms = [
      //   {
      //     id: 1,
      //     name: '111111'
      //   },
      //   {
      //     id: 2,
      //     name: '222222'
      //   }
      // ];
      this.times = localStorage.getItem('sendMsgTimes');
      if (!this.times) {
        this.times = 5;
        localStorage.setItem('sendMsgTimes', 5);
      }
    });
  },
  methods: {
    async handleImgChange(e) {
      if (!this.token) {
        openToast('上传Token无效，请刷新页面重试');
        return;
      }
      let file = e.target.files[0];
      if (!file) {
        return;
      }
      if (file.size > 1024 * 1024 * 4) {
        openToast('图片大小最大不超过4MB');
        return;
      }
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
    }
  }
};
</script>


