<template>
  <div class="weui-tab" v-if="showApp">
    <div class="weui-navbar">
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedTab==='task'}" @click="handleTabClick('task')">
        群发任务
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedTab==='history'}" @click="handleTabClick('history')">
        群发记录
      </div>
    </div>
    <div class="weui-tab__panel" v-if="selectedTab==='task'">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd" v-if="tasks.length>0">
          <div v-for="item in tasks" :key="item.id" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.title}}</h4>
              <p class="weui-media-box__desc">{{item.roomNames}}</p>
              <p class="weui-media-box__desc" v-if="item.taskType==='NOW'">立即发送</p>
              <p class="weui-media-box__desc" v-else>定时发送 | {{item.sendDayNum | sendDayNum}} | {{item.sendTime}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a :href="`./detail.html?tId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">详情</a>
              <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" @click="handleDelete(item.id)">删除</a>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else>
          <div class="weui-loadmore weui-loadmore_line">
            <span class="weui-loadmore__tips">暂无数据</span>
          </div>
        </div>
        <div class="weui-btn-area">
          <a href="./submit.html" class="weui-btn weui-btn_primary">新增任务</a>
          <weui-cells-title>1、请设置您的群发任务（可用时间09:00-21:00）</weui-cells-title>
          <weui-cells-title>2、每天自己群发消息不超过10条，在商伴群发消息不超过3条(超过将忽略)</weui-cells-title>
          <weui-cells-title>3、群发消息只有具备管家的群（自己&商伴）中才能够送达</weui-cells-title>
          <weui-cells-title>4、提交发送申请后，系统将在0-5分钟内进行发送</weui-cells-title>
        </div>

      </div>
    </div>
    <div class="weui-tab__panel" v-if="selectedTab==='history'">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd" v-if="histories.length>0">
          <div v-for="item in histories" :key="item.id" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.taskName}}</h4>
              <p class="weui-media-box__desc">{{item.createTime | time}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a :href="`./detail.html?tId=${item.taskId}`" class="weui-btn weui-btn_mini weui-btn_default">详情</a>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else>
          <div class="weui-loadmore weui-loadmore_line">
            <span class="weui-loadmore__tips">暂无数据</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../../common/js/axios';
import format from 'date-fns/format';
import { auth } from '../../../common/js/auth';
import config from '../../../common/js/config';
import { tryFunc, openConfirm } from '../../../common/js/common';
import '../../../common/js/share';
import {
  WeuiCells,
  WeuiCellAccess,
  WeuiCellsTitle,
  WeuiLoadMoreLine,
  WeuiBtnArea,
  WeuiBtn,
  WeuiCellsCheckbox,
  WeuiCheckLabel
} from '../../../common/components';

export default {
  components: {
    WeuiCells,
    WeuiCellAccess,
    WeuiCellsTitle,
    WeuiLoadMoreLine,
    WeuiBtnArea,
    WeuiBtn,
    WeuiCellsCheckbox,
    WeuiCheckLabel
  },
  data() {
    return {
      showApp: false,
      selectedTab: 'task',
      tasks: [],
      histories: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      await this.getTasks();
      let response = await axios.get('/user/task/history');
      this.histories = response.data;
    });
  },
  methods: {
    async getTasks() {
      let response = await axios.get(`${config.apiHost}/user/task`);
      this.tasks = response.data;
    },
    handleTabClick(tab) {
      this.selectedTab = tab;
    },
    handleDelete(id) {
      openConfirm('您确实要删除该任务？', () => {
        tryFunc(async () => {
          await axios.delete(`${config.apiHost}/user/task/${id}`);
          await this.getTasks();
        });
      });
    }
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
    time: val => {
      return format(val, 'YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>
