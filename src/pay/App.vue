<template>
  <bar v-if="showApp">
    <div class="content">
      <div class="intro">
        <p>提醒:</p>
        <p>1.购买支付成功后，货架购买功能自动开通。</p>
        <p>2.个人账户货架能开通，并提供人工客服服务。</p>
      </div>
      <h4>产品报价</h4>
      <div class="price">
        <img src="./assets/images/pay.png" />
      </div>
      <h4>产品购买</h4>
      <div class="weui-cells__title"><b>商城模块版</b></div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label class="weui-label">购买时长</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" v-model="shoperLong">
              <option value="">请选择</option>
              <option value="1">1个月</option>
              <option value="3">3个月</option>
              <option value="6">6个月</option>
              <option value="12">12个月</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">价格</label>
          </div>
          <div class="weui-cell__bd t-r">
            ￥{{shoperTotal}}
          </div>
        </div>
      </div>
      <div class="weui-cells__title"><b>基础功能版</b></div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label class="weui-label">购买数量</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" v-model="baseAmount">
              <option value="">请选择</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label class="weui-label">购买时长</label>
          </div>
          <div class="weui-cell__bd">
            <select class="weui-select" v-model="baseLong">
              <option value="">请选择</option>
              <option value="1">1个月</option>
              <option value="3">3个月</option>
              <option value="6">6个月</option>
              <option value="12">12个月</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">价格</label>
          </div>
          <div class="weui-cell__bd t-r">
            ￥{{baseTotal}}
          </div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">总价合计</label>
          </div>
          <div class="weui-cell__bd t-r">
            ￥{{shoperTotal + baseTotal}}
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button :class="{'btn-disabled':total===0}" @click="handlePay">确定并支付</button>
    </div>
  </bar>
</template>

<script>
import axios from '../common/js/axios';
import { auth, checkPhone } from '../common/js/auth';
import { tryFunc, wxPay } from '../common/js/common';
import Bar from '../common/components/Bar';
import '../common/js/share';

export default {
  components: {
    Bar
  },
  computed: {
    shoperTotal() {
      const long = Number(this.shoperLong);
      if (long === 6) {
        return Math.floor(long * 99 * 0.95);
      } else if (long === 12) {
        return Math.floor(long * 99 * 0.9);
      }
      return long * 99;
    },
    baseTotal() {
      const long = Number(this.baseLong);
      const amount = Number(this.baseAmount);
      if (long === 6) {
        return Math.floor(amount * long * 15 * 0.95);
      } else if (long === 12) {
        return Math.floor(amount * long * 15 * 0.9);
      }
      return amount * long * 15;
    },
    total() {
      return this.shoperTotal + this.baseTotal;
    }
  },
  data() {
    return {
      showApp: false,
      shoperLong: '',
      baseAmount: '',
      baseLong: ''
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      if (checkPhone()) {
        this.showApp = true;
      }
    });
  },
  methods: {
    handlePay() {
      if (this.total === 0) {
        return;
      }
      tryFunc(async () => {
        let response = await axios.post('/vip/order', {
          baseVipMonth: this.baseLong,
          baseVipSize: this.baseAmount,
          advVipMonth: this.shoperLong,
          price: this.total
        });
        response = await axios.get('/pay/wechat', {
          params: {
            orderId: response.data.id
          }
        });
        try {
          await wxPay(response.data);
          window.location.href = '/success.html';
        } catch (e) {
          window.location.href = '/fail.html';
        }
      });
    }
  }
};
</script>

<style lang="scss">
html {
  min-height: 100%;
  position: relative;
}
body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.weui-tab__panel {
  padding-bottom: 100px;
}

.t-r {
  text-align: right;
}

.content {
  min-height: 100%;
  color: #666666;
  background-color: #fff;

  h4 {
    padding: 1.25rem 0;
    font-size: 1rem;
    color: #333;
    line-height: 1.125rem;
    text-align: center;
  }

  .intro {
    padding: 1.25rem 0.9375rem;
    background-color: #f5f9fe;
    font-size: 0.875rem;
    line-height: 1.3125rem;
  }

  .price {
    text-align: center;

    img {
      width: 21.5rem;
    }
  }

  /*.calculate {
    width: 100%;
    padding: 0 .5rem;

    thead {
      background-color: #3e88ee;
      color: #fff;
    }

    tbody {
      background-color: #f4f4f4;
    }

    td {
      padding: 4px 0;
      text-align: center;
    }
  }*/
}

.footer {
  position: fixed;
  width: 100%;
  bottom: 50px;
  height: 50px;
  display: flex;
  z-index: 500;

  button {
    flex: 1;
    font-size: 1rem;
    color: #fff;
    background-color: #3e88ee;
    font-weight: 900;
    border: none;
    outline: none;
  }

  .btn-disabled {
    background-color: #86b6f9;
  }
}
</style>


