<template>
  <cust-bar v-if="showApp" :active-index="3">
    <div class="main" v-if="user">
      <div class="hd">
        <div class="avatar"></div>
        <div class="info">
          <div class="name">{{user.userName}}</div>
        </div>
      </div>
      <div class="bd">
        <weui-cells>
          <weui-cell-access empty-body empty-foot href="/buyer/order/list.html">
            <template slot="head">
              <div class="head">
                <img src="./assets/images/order.png">
                <label>我的订单</label>
              </div>
            </template>
          </weui-cell-access>
          <weui-cell-access empty-body empty-foot href="/buyer/score.html">
            <template slot="head">
              <div class="head">
                <img src="">
                <label>我的消费积分</label>
              </div>
            </template>
          </weui-cell-access>
          <weui-cell-access empty-body empty-foot href="/buyer/coupon.html">
            <template slot="head">
              <div class="head">
                <img src="">
                <label>我的优惠券</label>
              </div>
            </template>
          </weui-cell-access>
        </weui-cells>
        <weui-cells>
          <weui-cell-access empty-body empty-foot href="/feedback.html">
            <template slot="head">
              <div class="head">
                <img src="">
                <label>参与老带新活动</label>
              </div>
            </template>
          </weui-cell-access>
          <weui-cell-access empty-body empty-foot href="/buyer/invitation.html">
            <template slot="head">
              <div class="head">
                <img src="">
                <label>我的邀请</label>
              </div>
            </template>
          </weui-cell-access>
        </weui-cells>
      </div>
    </div>
  </cust-bar>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import { CustBar, WeuiCells, WeuiCellAccess } from '../../common/components';
import '../../common/js/share.js';

export default {
  components: {
    CustBar,
    WeuiCells,
    WeuiCellAccess
  },
  data() {
    return {
      showApp: false,
      user: null
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/user/info');
      this.user = data;
      this.$nextTick(() => {
        document.querySelector('.hd').style.background = `url("${
          this.user.headPhoto
        }") no-repeat`;
        document.querySelector('.avatar').style.background = `url("${
          this.user.headPhoto
        }") no-repeat`;
      });
    });
  }
};
</script>

<style lang="scss">
.head {
  display: flex;
  align-items: center;
  img {
    margin-right: 1rem;
    width: 1.75rem;
    height: 1.75rem;
  }
}

.main {
  .hd {
    position: relative;
    height: 11.5625rem;
    background-size: cover !important;
    &:after {
      content: '';
      width: 100%;
      height: 11.5625rem;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      background-size: inherit;
      filter: blur(3px);
      z-index: 2;
    }
    .avatar {
      position: absolute;
      top: 1.5625rem;
      left: calc(50% - 2.625rem);
      width: 5.25rem;
      height: 5.25rem;
      border-radius: 50%;
      border: 1px solid #fff;
      background-size: cover !important;
      z-index: 3;
    }
    .info {
      position: absolute;
      width: 100%;
      top: 7.5rem;
      z-index: 3;
      .name {
        font-size: 1.125rem;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>

