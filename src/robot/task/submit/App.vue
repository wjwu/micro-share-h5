<template>
  <div class="main" v-if="showApp">
    <div class="weui-cells__title">请设置您的群发任务</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">标题</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="title" class="weui-input" type="text" placeholder="请输入标题">
        </div>
      </div>
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
              <div class="weui-uploader__info">{{images.length}}/4</div>
            </div>
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles">
                <li v-for="(image,i) in images" :key="i" class="weui-uploader__file" @click="handleImgClick(image,i)" :style="`background-image:url('${imageHost}/${image}')`"></li>
                <li v-if="uploading" class="weui-uploader__file weui-uploader__file_status">
                  <div class="weui-uploader__file-content">{{percent}}%</div>
                </li>
              </ul>
              <div v-if="images.length !== 4" class="weui-uploader__input-box">
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
          <textarea v-model="content" class="weui-textarea" maxlength="200" placeholder="请输入群发消息内容" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>{{content.length}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">请选择需要群发的群组和群</div>
    <div class="weui-cells weui-cells_checkbox">
      <label class="weui-cell weui-check__label" :for="room.id" v-for="room in rooms" :key="room.id">
        <div class="weui-cell__hd">
          <input type="checkbox" class="weui-check" :id="room.id" v-model="room.checked">
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
            <option selected="selected" value="NOW">立即发送</option>
            <option value="TASK">定时发送</option>
          </select>
        </div>
      </div>
      <label v-if="sendType === 'TASK'" class="weui-cell weui-check__label" for="no-repeat">
        <div class="weui-cell__bd">
          <p>不重复发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" @change="handleDayChange(0)" value="0" class="weui-check" id="no-repeat" name="radioSend" checked="checked">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TASK'" class="weui-cell weui-check__label" for="every">
        <div class="weui-cell__bd">
          <p>每天发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" @change="handleDayChange(-1)" value="-1" class="weui-check" id="every" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TASK'" class="weui-cell weui-check__label" for="mon">
        <div class="weui-cell__bd">
          <p>每周一发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" @change="handleDayChange(1)" value="1" class="weui-check" id="mon" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TASK'" class="weui-cell weui-check__label" for="tue">
        <div class="weui-cell__bd">
          <p>每周二发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" @change="handleDayChange(2)" value="2" class="weui-check" id="tue" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TASK'" class="weui-cell weui-check__label" for="wed">
        <div class="weui-cell__bd">
          <p>每周三发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" @change="handleDayChange(3)" value="3" class="weui-check" id="wed" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TASK'" class="weui-cell weui-check__label" for="thu">
        <div class="weui-cell__bd">
          <p>每周四发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" @change="handleDayChange(4)" value="4" class="weui-check" id="thu" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TASK'" class="weui-cell weui-check__label" for="fri">
        <div class="weui-cell__bd">
          <p>每周五发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" @change="handleDayChange(5)" value="5" class="weui-check" id="fri" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TASK'" class="weui-cell weui-check__label" for="sat">
        <div class="weui-cell__bd">
          <p>每周六发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" @change="handleDayChange(6)" value="6" class="weui-check" id="sat" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label v-if="sendType === 'TASK'" class="weui-cell weui-check__label" for="sun">
        <div class="weui-cell__bd">
          <p>每周日发送</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" @change="handleDayChange(7)" value="7" class="weui-check" id="sun" name="radioSend">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <div v-if="sendType === 'TASK'" class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">发送时间</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="time" class="weui-input" type="time">
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" :disabled="disabled" href="javascript:;" @click="handleSubmit">发送</a>
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js';
import axios from 'axios';
import weui from 'weui.js';
import { format } from 'date-fns';
import { auth } from '../../../common/js/auth';
import config from '../../../common/js/config';
import { tryFunc, openToast } from '../../../common/js/common';

export default {
  data() {
    return {
      showApp: false,
      title: '',
      content: '',
      messageType: 'TEXT',
      sendType: 'NOW',
      time: format(new Date(), 'HH:mm'),
      rooms: [],
      selectedRooms: [],
      selectedDay: 0,
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
      let response = await axios.get(`${config.apiHost}/token`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.token = response.data.uptoken;
      response = await axios.get(`${config.apiHost}/user/myRoom`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      if (!response.data || response.data.length === 0) {
        this.disabled = true;
      }
      for (let room of response.data) {
        room.checked = false;
      }
      this.rooms = response.data;
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
    },
    handleDayChange(val) {
      this.selectedDay = val;
    },
    handleSubmit() {
      if (!this.title) {
        openToast('请输入标题');
        return;
      }
      if (this.messageType === 'TEXT') {
        if (!this.content) {
          openToast('请输入标题');
          return;
        }
      } else {
        if (this.images.length === 0) {
          openToast('请至少上传一张图片');
          return;
        }
      }
      const checkedRoom = this.rooms.filter(item => item.checked);
      if (checkedRoom.length === 0) {
        openToast('请至少选择一个群');
        return;
      }

      if (!this.time) {
        openToast('请输入发送时间');
        return;
      }
      tryFunc(async () => {
        await axios.post(
          `${config.apiHost}/user/task`,
          {
            img: this.images
              .map(item => `${config.imageHost}/${item}`)
              .join(','),
            msgType: this.messageType,
            roomIds: checkedRoom.map(item => item.id).join(','),
            roomNames: checkedRoom.map(item => item.name).join(','),
            sendDayNum: this.selectedDay,
            sendTime: this.time,
            taskType: this.sendType,
            text: this.content,
            title: this.title
          },
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
        const dialog = weui.dialog({
          content: "操作成功",
          buttons: [
            {
              label: "任务管理",
              type: "default",
              onClick: () => {
                window.location.href = "./task.html";
              }
            },
            {
              label: "继续添加",
              type: "primary",
              onClick: () => {
                this.rooms.forEach(item => (item.checked = false));
                this.images = [];
                this.messageType = "TEXT";
                this.roomIds = [];
                this.roomNames = [];
                this.selectedDay = 0;
                this.time = format(new Date(), "HH:mm");
                this.sendType = "NOW";
                this.content = "";
                this.title = "";
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

<style lang="scss">
</style>



