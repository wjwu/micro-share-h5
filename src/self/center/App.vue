<template>
  <bar v-if="showApp" :active-index="5">
    <div class="main">
      <div class="hd">
        <div class="avatar"></div>
        <div class="info">
          <div class="name">{{user.userName}}</div>
          <div class="tag">
            <span class="vip" v-if="user.vipDto">VIP</span>
            <span class="credit" @click="handleJump('/self/credit.html')">{{user.creditScore}}分</span>
            <span class="vip" @click="handleJump('/circle/intro.html')">申请圈主</span>
          </div>
        </div>
      </div>
      <div class="bd">
        <div class="my">
          <div @click="handleJump('/vip/shopper.html')">我的管家</div>
          <div @click="handleJump('/group/enter.html')">
            我的商伴
          </div>
        </div>
        <weui-cells>
          <weui-cell-access empty-body empty-foot href="/self/info.html">
            <template slot="head">
              <div class="head">
                <img src="./assets/images/info.png">
                <label>个人资料</label>
              </div>
            </template>
          </weui-cell-access>
          <weui-cell-access empty-body empty-foot href="/self/consume.html">
            <template slot="head">
              <div class="head">
                <img src="./assets/images/bill.png">
                <label>我的消费</label>
              </div>
            </template>
          </weui-cell-access>
          <weui-cell-access empty-body empty-foot href="/message.html">
            <template slot="head">
              <div class="head">
                <img src="./assets/images/message.png">
                <label>我的消息</label>
              </div>
            </template>
          </weui-cell-access>
        </weui-cells>
        <weui-cells>
          <weui-cell-access empty-body empty-foot href="/feedback.html">
            <template slot="head">
              <div class="head">
                <img src="./assets/images/feedback.png">
                <label>我的建议</label>
              </div>
            </template>
          </weui-cell-access>
          <weui-cell-access empty-body empty-foot href="/order/list/complaint.html">
            <template slot="head">
              <div class="head">
                <img src="./assets/images/complanion.png">
                <label>举报与投诉</label>
              </div>
            </template>
          </weui-cell-access>
          <weui-cell-access empty-body empty-foot href="/rule.html">
            <template slot="head">
              <div class="head">
                <img src="./assets/images/rule.png">
                <label>运行规则</label>
              </div>
            </template>
          </weui-cell-access>
        </weui-cells>
        <weui-cells>
          <weui-cell-access empty-body empty-foot href="/qa.html">
            <template slot="head">
              <div class="head">
                <img src="./assets/images/qa.png">
                <label>联系客服</label>
              </div>
            </template>
          </weui-cell-access>
        </weui-cells>
      </div>
    </div>
  </bar>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import { Bar, WeuiCells, WeuiCellAccess } from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    Bar,
    WeuiCells,
    WeuiCellAccess
  },
  data() {
    return {
      showApp: false,
      user: {}
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/user/info');
      this.user = data;
      this.$el.querySelector('.hd').style.background = `url("${
        this.user.headPhoto
      }") no-repeat`;
      this.$el.querySelector('.avatar').style.background = `url("${
        this.user.headPhoto
      }") no-repeat`;
    });
  },
  methods: {
    handleJump(url) {
      window.location.href = url;
    }
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
    // background: url('./assets/images/timg.jpg') no-repeat;
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
      // background: url('./assets/images/timg.jpg') no-repeat;
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
      .tag {
        display: flex;
        font-size: 0.875rem;
        color: #fff;
        justify-content: center;
        .vip,
        .credit {
          display: inline-block;
          margin: 0 0.3125rem;
          padding: 0 0.5rem 0 1.5rem;
          text-align: right;
          border-radius: 15px;
        }
        .vip {
          background: url('./assets/images/VIP@3x.png') no-repeat 0.375rem
            center/ 1rem;
          background-color: #fc863f;
        }
        .credit {
          background: url('./assets/images/credit@3x.png') no-repeat 0.375rem
            center/ 1rem;
          background-color: #49c7f6;
        }
      }
    }
  }
  .bd {
    .my {
      background: #fff;
      height: 3.75rem;
      padding: 0.625rem;
      display: flex;
      font-size: 1rem;
      color: #222;
      div {
        flex: 1;
        text-align: center;
        padding-top: 1.3rem;
      }
      div:first-of-type {
        border-right: 1px solid #e8e8e8;
        background: url('./assets/images/Robot@3x.png') no-repeat center 0 /1.5rem;
      }
      div:last-of-type {
        background: url('./assets/images/group@3x.png') no-repeat center 0 /1.5rem;
      }
    }
  }
}
</style>