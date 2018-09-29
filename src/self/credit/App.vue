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
      credits: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/credit`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
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



