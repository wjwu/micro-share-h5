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
        <div class="weui-panel__bd">
          <div v-for="(item,i) in all" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-2x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.groupName}}</h4>
              <p class="weui-media-box__desc">{{item.groupMemberCount}}人 | {{item.industry}}</p>
              <p class="weui-media-box__desc">{{item.createTime | time}} | {{item.status | status}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a v-if="item.status === 'MATCH_FAILED'" :href="`./manual.html?orderId=${item.id}&name=${encodeURIComponent(item.groupName)}`" class="weui-btn weui-btn_mini weui-btn_default">手动匹配</a>
              <a :href="`./detail.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">查看详情</a>
              <a v-if="item.status === 'DONE'" :href="`./evaluate.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">去评价</a>
            </div>
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
      let response = await axios.get(`${config.apiHost}/task`, {
        userId: localStorage.getItem('userId')
      });
      this.tasks = response.data;
      response = await axios.get(`${config.apiHost}/task/history`, {
        userId: localStorage.getItem('userId')
      });
      this.histories = response.data;
    });
  },
  methods: {
    handleTabClick(tab) {
      this.selectedTab = tab;
    }
  }
};
</script>
