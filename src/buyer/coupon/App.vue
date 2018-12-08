<template>
  <div v-if="showApp">
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">我的优惠券</div>
      <div class="weui-panel__bd" v-if="coupons.length > 0 ">
        <div class="weui-media-box weui-media-box_text" v-for="item in coupons" :key="item.id">
          <h4 class="weui-media-box__title">￥{{item.price}}元</h4>
          <!-- <p class="weui-media-box__desc">{{item.desc}}</p> -->
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">{{item.createTime | time}}</li>
          </ul>
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
      coupons: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/user/coupon');
      this.coupons = data;
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



