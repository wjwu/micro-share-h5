<template>
  <div v-if="showApp">
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">我的投诉</div>
      <div class="weui-panel__bd" v-if="comps.length > 0">
        <div class="weui-media-box weui-media-box_text" v-for="item in comps" :key="item.id" @click="handleClick(item.id)">
          <h4 class="weui-media-box__title">{{item.status | status}}</h4>
          <p class="weui-media-box__desc">{{item.content}}</p>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">投诉时间</li>
            <li class="weui-media-box__info__meta">{{item.createTime | time}}</li>
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">点击查看详情</li>
          </ul>
        </div>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-else>
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
    <back></back>
  </div>
</template>

<script>
import axios from 'axios';
import format from 'date-fns/format';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc } from '../../common/js/common';
import Back from '../../common/components/Back';
import '../../common/js/share';

export default {
  components: {
    Back
  },
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
      this.comps = data;
    });
  },
  methods: {
    handleClick(id) {
      window.location.href = `./detail.html?compsId=${id}`;
    }
  },
  filters: {
    status: val => {
      if (val === 'REPORTED') {
        return '投诉';
      } else if (val === 'REPORTED_DISAVOW') {
        return '投诉不承认';
      } else if (val === 'SUCCESS') {
        return '投诉处理成功';
      } else {
        return '';
      }
    },
    time: val => {
      return format(val, 'YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>
