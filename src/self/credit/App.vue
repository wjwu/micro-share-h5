<template>
  <div v-if="showApp">
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">我的信用记录</div>
      <div class="weui-panel__bd" v-if="credits.length > 0 ">
        <div class="weui-media-box weui-media-box_text" v-for="item in credits" :key="item.id">
          <a :href="item.link">
            <h4 class="weui-media-box__title">{{Number(item.score)>0?`+${item.score}`:item.score}}</h4>
            <p class="weui-media-box__desc">{{item.desc}}</p>
            <ul class="weui-media-box__info">
              <li class="weui-media-box__info__meta">{{item.createTime | time}}</li>
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
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import format from 'date-fns/format';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      showApp: false,
      credits: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/credit');
      this.credits = data;
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



