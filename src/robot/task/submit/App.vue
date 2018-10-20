<template>
  <div class="main" v-if="showApp">
    <weui-cells-title>请设置您的群发任务</weui-cells-title>
    <weui-cells>
      <weui-cell label="标题">
        <input v-model="title" class="weui-input" type="text" placeholder="请输入标题">
      </weui-cell>
      <weui-cell-select label="消息类型">
        <select class="weui-select" v-model="messageType">
          <option value="TEXT">文本</option>
          <option selected="selected" value="CARD">分享卡片</option>
          <option value="IMG">图片</option>
        </select>
      </weui-cell-select>
    </weui-cells>
    <weui-cells v-if="messageType === 'IMG'">
      <image-upload title="图片" :token="token" :max="2" v-model="images" multiple></image-upload>
    </weui-cells>
    <weui-cells-title v-if="messageType === 'TEXT'">消息内容</weui-cells-title>
    <weui-cells v-if="messageType === 'TEXT'">
      <weui-cell>
        <weui-textarea v-model="content" maxlength="200" placeholder="请输入群发消息内容" rows="3"></weui-textarea>
      </weui-cell>
    </weui-cells>
    <weui-cells-title v-if="messageType === 'CARD'">由于分享卡片消息的特殊性，请直接将分享卡片消息发送给机器人，机器人将自动为您立即转发到设置的群组中。</weui-cells-title>
    <weui-cells-title>请选择需要群发的群组和群</weui-cells-title>
    <weui-cells-checkbox>
      <weui-check-label v-for="room in rooms" :key="room.id" :id="room.id" v-model="room.checked">
        {{room.name}}
      </weui-check-label>
      <weui-cell v-if="!rooms || rooms.length === 0">暂无可用群</weui-cell>
    </weui-cells-checkbox>
    <weui-cells-title>请选择发送类型</weui-cells-title>
    <weui-cells-radio>
      <weui-cell-select label="发送类型">
        <select class="weui-select" v-model="sendType" :disabled="messageType === 'CARD'">
          <option selected="selected" value="NOW">立即发送</option>
          <option value="TASK">定时发送</option>
        </select>
      </weui-cell-select>
      <weui-check-label type="radio" v-if="sendType === 'TASK'" @change="handleDayChange(0)" name="radioSend" id="no-repeat">不重复发送</weui-check-label>
      <weui-check-label type="radio" v-if="sendType === 'TASK'" @change="handleDayChange(-1)" name="radioSend" id="every">每天发送</weui-check-label>
      <weui-check-label type="radio" v-if="sendType === 'TASK'" @change="handleDayChange(1)" name="radioSend" id="mon">每周一发送</weui-check-label>
      <weui-check-label type="radio" v-if="sendType === 'TASK'" @change="handleDayChange(2)" name="radioSend" id="tue">每周二发送</weui-check-label>
      <weui-check-label type="radio" v-if="sendType === 'TASK'" @change="handleDayChange(3)" name="radioSend" id="wed">每周三发送</weui-check-label>
      <weui-check-label type="radio" v-if="sendType === 'TASK'" @change="handleDayChange(4)" name="radioSend" id="thu">每周四发送</weui-check-label>
      <weui-check-label type="radio" v-if="sendType === 'TASK'" @change="handleDayChange(5)" name="radioSend" id="fri">每周五发送</weui-check-label>
      <weui-check-label type="radio" v-if="sendType === 'TASK'" @change="handleDayChange(6)" name="radioSend" id="sat">每周六发送</weui-check-label>
      <weui-check-label type="radio" v-if="sendType === 'TASK'" @change="handleDayChange(7)" name="radioSend" id="sun">每周日发送</weui-check-label>
      <weui-cell v-if="sendType === 'TASK'" label="发送时间">
        <input v-model="time" class="weui-input" type="time">
      </weui-cell>
    </weui-cells-radio>
    <weui-btn-area>
      <weui-btn type="primary" :disabled="disabled" @click="handleSubmit">发送</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../../../common/js/axios';
import weui from 'weui.js';
import format from 'date-fns/format';
import { auth } from '../../../common/js/auth';
import config from '../../../common/js/config';
import { tryFunc, openAlert } from '../../../common/js/common';
import {
  ImageUpload,
  WeuiCellsTitle,
  WeuiCells,
  WeuiCell,
  WeuiCellSelect,
  WeuiTextarea,
  WeuiCellsCheckbox,
  WeuiCheckLabel,
  WeuiCellsRadio,
  WeuiBtnArea,
  WeuiBtn
} from '../../../common/components';
import '../../../common/js/share';

export default {
  components: {
    ImageUpload,
    WeuiCellsTitle,
    WeuiCells,
    WeuiCell,
    WeuiCellSelect,
    WeuiTextarea,
    WeuiCellsCheckbox,
    WeuiCheckLabel,
    WeuiCellsRadio,
    WeuiBtnArea,
    WeuiBtn
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
        openAlert('请输入标题');
        return;
      }
      if (this.messageType === 'TEXT' && !this.content) {
        openAlert('请输入消息内容');
        return;
      } else if (this.messageType === 'IMG' && this.images.length === 0) {
        openAlert('请至少上传一张图片');
        return;
      }
      const checkedRoom = this.rooms.filter(item => item.checked);
      if (checkedRoom.length === 0) {
        openAlert('请至少选择一个群');
        return;
      }

      if (this.messageType === 'TEXT' || this.messageType === 'IMG') {
        if (!this.time) {
          openAlert('请输入发送时间');
          return;
        }
        let hours = Number(this.time.split(':')[0]);
        let minutes = Number(this.time.split(':')[1]);
        if (hours <= 8 || (hours >= 21 && minutes > 0)) {
          openAlert('在非09:00-21:00时间段之外，管家不发送讯息');
          return;
        }
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



