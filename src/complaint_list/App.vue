<template>
  <div v-if="showApp">
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">我的投诉</div>
      <div class="weui-panel__bd" v-if="comps">
        <div class="weui-media-box weui-media-box_text" v-for="item in comps" :key="item.id">
          <h4 class="weui-media-box__title">已投诉(状态)</h4>
          <p class="weui-media-box__desc">投诉理由xxxxxxxxxxxxxxxxxxx!</p>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">投诉时间</li>
            <li class="weui-media-box__info__meta">2018-09-05 11:44</li>
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">点击查看详情</li>
          </ul>
        </div>
      </div>
      <div class="weui-panel__bd" v-else>
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__bd">
            <div class="weui-loadmore weui-loadmore_line">
              <span class="weui-loadmore__tips">暂无数据</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
// import moment from 'moment';
import { auth } from '../common/js/auth';
import config from '../common/js/config';
import { tryFunc } from '../common/js/common';

export default {
  data() {
    return {
      showApp: false,
      comps: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/user/report`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.msgs = data;
    });
  },
  methods: {
  }
};
</script>
