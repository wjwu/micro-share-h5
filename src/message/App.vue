<template>
  <bar v-if="showApp" :active-index="4">
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">我的消息</div>
      <div class="weui-panel__bd" v-if="msgs.length > 0 ">
        <div class="weui-media-box weui-media-box_text" v-for="item in msgs" :key="item.id">
          <a :href="item.link">
            <h4 class="weui-media-box__title">{{item.title}}</h4>
            <p class="weui-media-box__desc">{{item.text}}</p>
            <ul class="weui-media-box__info">
              <li class="weui-media-box__info__meta">官方消息</li>
              <li class="weui-media-box__info__meta">{{item.createTime | time}}</li>
              <!-- <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">
              <a :href="item.link">点击查看详情</a>
            </li> -->
            </ul>
          </a>
        </div>
      </div>
      <div class="weui-panel__bd" v-else>
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__bd">
            <div class="weui-loadmore weui-loadmore_line">
              <span class="weui-loadmore__tips">没有更多数据了</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </bar>
</template>

<script>
import axios from '../common/js/axios';
import format from 'date-fns/format';
import { auth } from '../common/js/auth';
import { tryFunc } from '../common/js/common';
import Bar from '../common/components/Bar';
import '../common/js/share';

export default {
  components: {
    Bar
  },
  data() {
    return {
      showApp: false,
      msgs: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/user/myMsg');
      this.msgs = data;
    });
  },
  filters: {
    time: val => {
      return format(val, 'YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style lang="scss">
.weui-media-box {
  h4 {
    color: #000 !important;
  }
}
</style>



