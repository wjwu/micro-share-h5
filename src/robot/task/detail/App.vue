<template>
  <div class="main" v-if="showApp && task">
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">标题</label>
        </div>
        <div class="weui-cell__bd">
          {{task.title}}
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">消息类型</label>
        </div>
        <div class="weui-cell__bd">
          {{task.msgType | msgType}}
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form" v-if="task.msgType === 'IMG'">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <p class="weui-uploader__title">图片</p>
            </div>
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles">
                <li v-for="(image,i) in task.images" :key="i" class="weui-uploader__file" :style="`background-image:url('${image}')`"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title" v-if="task.msgType === 'TEXT'">消息内容</div>
    <div class="weui-cells weui-cells_form" v-if="task.msgType === 'TEXT'">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="task.text" readonly class="weui-textarea" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>{{task.text.length}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">发送群组</div>
    <div class="weui-cells">
      <div class="weui-cell" v-for="(room,i) in task.roomNames" :key="i">
        <div class="weui-cell__bd">
          {{room}}
        </div>
      </div>
    </div>
    <div class="weui-cells__title">发送设置</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>{{task.taskType==='NOW'?'立即发送':'定时发送'}}</span>
          <span v-if="task.taskType==='TASK'"> | {{task.sendDayNum | sendDayNum}} | {{task.sendTime}}</span>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:history.go(-1)">返回</a>
    </div>
  </div>
</template>

<script>
import axios from '../../../common/js/axios';
import { auth } from '../../../common/js/auth';
import { tryFunc, getQueryString } from '../../../common/js/common';
import '../../../common/js/share';

export default {
  data() {
    return {
      showApp: false,
      taskId: getQueryString('tId'),
      task: null
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`/user/task/${this.taskId}`);
      data.roomNames = data.roomNames.split(',');
      if (data.img) {
        data.images = data.img.split(',');
      }
      this.task = data;
    });
  },
  filters: {
    sendDayNum(val) {
      switch (val) {
        case -1:
          return '不重复发送';
        case 0:
          return '每天发送';
        case 1:
          return '每周一发送';
        case 2:
          return '每周二发送';
        case 3:
          return '每周三发送';
        case 4:
          return '每周四发送';
        case 5:
          return '每周五发送';
        case 6:
          return '每周六发送';
        case 7:
          return '每周日发送';
        default:
          return '';
      }
    },
    msgType(val) {
      if (val === 'TEXT') {
        return '文本';
      } else if (val === 'IMG') {
        return '图片';
      } else if (val === 'CARD') {
        return '分享卡片';
      }
      return '';
    }
  }
};
</script>

