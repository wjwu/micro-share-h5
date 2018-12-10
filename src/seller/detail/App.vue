<template>
  <div v-if="showApp">
    <weui-cells-title>订单信息</weui-cells-title>
    <weui-cells v-if="order">
      <weui-cell label="订单编号">{{order.number}}</weui-cell>
      <weui-cell label="计入积分">
        <span class="weui-badge" style="margin-left: 5px;">{{order.status | status}}</span>
      </weui-cell>
      <weui-cell label="抵用金额">{{order.coupon}}</weui-cell>
      <weui-cell label="实付金额">
        <span style="color: #e84200;font-weight: 900;font-size: 1.2rem;">￥{{order.price}}</span>
      </weui-cell>
      <weui-cell label="创建时间">{{order.createTime | time}}</weui-cell>
      <weui-cell label="收货地址">{{order.address}}</weui-cell>
    </weui-cells>
    <weui-btn-area>
      <weui-btn
        type="primary"
        v-if="order && order.status === 'UN_USE'"
        @click="handleScore(order.id)"
      >计入积分</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from "../../common/js/axios";
import format from "date-fns/format";
import { openAlert, tryFunc, getQueryString } from "../../common/js/common";
import {
  WeuiCellsTitle,
  WeuiCells,
  WeuiCell,
  WeuiBtnArea,
  WeuiBtn
} from "../../common/components";
import "../../common/js/share";

export default {
  components: {
    WeuiCellsTitle,
    WeuiCells,
    WeuiCell,
    WeuiBtnArea,
    WeuiBtn
  },
  data() {
    return {
      orderId: getQueryString("orderId"),
      order: {},
      showApp: false,
      showMsgs: false
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      if (!this.orderId) {
        openAlert("订单编号无效");
        return;
      }
      const { data } = await axios.get(`/buyer/order/${this.orderId}`);
      if (!data) {
        openAlert("订单编号无效");
      } else {
        this.order = data;
      }
    });
  },
  methods: {
    handleScore(id) {
      console.log(11);
      axios.put(`/shop/${id}/score`);
      window.location.reload();
    }
  },
  filters: {
    status: val => {
      if (val === "UN_USE") {
        return "未核销";
      } else if (val === "USED") {
        return "已核销";
      } else {
        return "";
      }
    },
    time: val => {
      return format(val, "YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="scss">
.msgs {
  font-size: 0.875rem;
  background-color: #f8f8f8;
  color: #444;

  .msg {
    display: flex;
  }

  li {
    padding: 0.5rem 0.5rem 0 0.5rem;
  }

  .sender {
    color: #ccc;
    flex-shrink: 0;
  }

  .content {
    position: relative;
    margin-left: 1rem;
    background-color: #fff;
    padding: 0.3rem 0.5rem;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
  }

  .arrow {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
  }
  .out {
    border-top: 5px solid transparent;
    border-right: 10px solid #e6e6e6;
    border-bottom: 5px solid transparent;
    left: -11px;
    top: 5px;
  }

  .in {
    border-top: 5px solid transparent;
    border-right: 10px solid #fff;
    border-bottom: 5px solid transparent;
    left: -9px;
    top: 5px;
  }

  .time {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.75rem;
    color: #ccc;
  }
}
</style>


