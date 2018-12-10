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
      <weui-cell label="购买商品">
        <span v-for="(item,i) in order.buyerOrderItemList" :key="i">
          <!-- TODO 商品名字居中对齐    这里会有多个商品的情况-->
          <div class="item"><img style="width:2rem;" :src="item.img" />&nbsp;{{item.title}} * {{item.num}}</div>
        </span>
      </weui-cell>
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
.item{
   display:flex;align-items: center;justify-content: left;padding-bottom: .5rem;
}
</style>


