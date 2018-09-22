<template>
  <div class="weui-tab">
    <div class="weui-navbar">
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedTab==='task'}" @click="handleTabClick('task')">
        群发任务
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedTab==='history'}" @click="handleTabClick('history')">
        群发记录
      </div>
    </div>
    <div class="weui-tab__panel">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd" v-if="tasks.length>0">
          <div v-for="(item,i) in tasks" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.title}}</h4>
              <p class="weui-media-box__desc">{{item.roomNames}}</p>
              <p class="weui-media-box__desc" v-if="item.taskType==='NOW'">立即发送</p>
              <p class="weui-media-box__desc" v-else>定时发送 | {{item.sendDayNum | sendDayNum}} | {{item.sendTime}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a :href="`./detail.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">详情</a>
              <a :href="`./evaluate.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_warn">删除</a>
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
import axios from 'axios';
// import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc } from '../../common/js/common';

export default {
  data() {
    return {
      selectedTab: 'task',
      tasks: [],
      histories: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      let response = await axios.get(`${config.apiHost}/user/task`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.tasks = response.data;
      response = await axios.get(`${config.apiHost}/user/task/history`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.histories = response.data;
    });
  },
  methods: {
    handleTabClick(tab) {
      this.selectedTab = tab;
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
    }
  }
};
</script>
