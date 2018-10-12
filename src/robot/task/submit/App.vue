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
            <option value="CARD">分享卡片</option>
            <option selected="selected" value="TEXT">文本</option>
            <option value="IMG">图片</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form" v-if="messageType === 'IMG'">
      <image-upload title="图片" :token="token" :max="2" v-model="images" multiple></image-upload>
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
    <div class="weui-cells__title" v-if="messageType === 'CARD'">由于分享卡片消息的特殊性，请直接将分享卡片消息发送给机器人，机器人将自动为您立即转发到设置的群组中。</div>
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
          <select class="weui-select" v-model="sendType" :disabled="messageType === 'CARD'">
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
import axios from '../../../common/js/axios';
import weui from 'weui.js';
import format from 'date-fns/format';
import { auth } from '../../../common/js/auth';
import config from '../../../common/js/config';
import { tryFunc, openToast } from '../../../common/js/common';
import ImageUpload from '../../../common/components/ImageUpload';
import '../../../common/js/share';

export default {
  components: {
    ImageUpload
  },
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
      images: [],
      imageHost: config.imageHost
    };
  },
  watch: {
    messageType(val) {
      if (val === 'CARD') {
        this.sendType = 'NOW';
      }
    }
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      let response = await axios.get('/token');
      this.token = response.data.uptoken;
      response = await axios.get('/user/myAllRoom');
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
    handleDayChange(val) {
      this.selectedDay = val;
    },
    handleSubmit() {
      if (!this.title) {
        openToast('请输入标题');
        return;
      }
      if (this.messageType === 'TEXT' && !this.content) {
        openToast('请输入消息内容');
        return;
      } else if (this.messageType === 'IMG' && this.images.length === 0) {
        openToast('请至少上传一张图片');
        return;
      }
      const checkedRoom = this.rooms.filter(item => item.checked);
      if (checkedRoom.length === 0) {
        openToast('请至少选择一个群');
        return;
      }

      if (
        (this.messageType === 'TEXT' || this.messageType === 'IMG') &&
        !this.time
      ) {
        openToast('请输入发送时间');
        return;
      }
      tryFunc(async () => {
        await axios.post('/user/task', {
          img: this.images.map(item => `${config.imageHost}/${item}`).join(','),
          msgType: this.messageType,
          roomIds: checkedRoom.map(item => item.wechatId).join(','),
          roomNames: checkedRoom.map(item => item.name).join(','),
          sendDayNum: this.selectedDay,
          sendTime: this.time,
          taskType: this.sendType,
          text: this.content,
          title: this.title
        });
        const dialog = weui.dialog({
          content: '操作成功',
          buttons: [
            {
              label: '任务管理',
              type: 'default',
              onClick: () => {
                window.location.href = './list.html';
              }
            },
            {
              label: '继续添加',
              type: 'primary',
              onClick: () => {
                this.rooms.forEach(item => (item.checked = false));
                this.images = [];
                this.messageType = 'TEXT';
                this.roomIds = [];
                this.roomNames = [];
                this.selectedDay = 0;
                this.time = format(new Date(), 'HH:mm');
                this.sendType = 'NOW';
                this.content = '';
                this.title = '';
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



