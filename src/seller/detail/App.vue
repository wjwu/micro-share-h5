<template>
  <div v-if="showApp">
    <weui-cells-title>订单信息</weui-cells-title>
    <weui-cells v-if="order">
      <weui-cell label="订单编号">{{order.number}}</weui-cell>
      <weui-cell label="订单状态">
        <span class="weui-badge" style="margin-left: 5px;">{{order.status | status}}</span>
      </weui-cell>
      <weui-cell label="抵用金额">{{order.coupon}}</weui-cell>
      <weui-cell label="实付金额">
        <span style="color: #e84200;font-weight: 900;font-size: 1.2rem;">￥{{order.price}}</span>
      </weui-cell>
      <weui-cell label="创建时间">{{order.createTime | time}}</weui-cell>
      <weui-cell label="收货地址">{{order.address}}</weui-cell>
      <weui-cell label="联系人">{{order.name}}</weui-cell>
      <weui-cell label="联系方式">{{order.phone}}</weui-cell>
      <weui-cell label="购买商品">
        <span v-for="(item,i) in order.buyerOrderItemList" :key="i">
          <div class="item">
            <img style="width:2rem;" :src="item.img">
            &nbsp;{{item.title}} * {{item.num}}
          </div>
        </span>
      </weui-cell>
    </weui-cells>
    <weui-btn-area>
      <weui-btn type="primary" v-if="order && order.status === 'SUBMIT'" @click="handleReceive(order.id)">已收款</weui-btn>
      <weui-btn type="primary" v-if="order && order.status === 'RECEIVE'" @click="handleSended(order.id)">已发货</weui-btn>
      <weui-btn type="primary" v-if="order && order.status === 'SENDED'" @click="handleScore(order.id)">计入积分</weui-btn>
    </weui-btn-area>
    <mask-input :visible.sync="showMask" @ok="handleOk" :value="score" :max="maxScore" title="请输入积分" tip="积分"></mask-input>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import format from 'date-fns/format';
import MaskInput from '../../buyer/member/MaskInput';
import { openAlert, tryFunc, getQueryString } from '../../common/js/common';
import {
  WeuiCellsTitle,
  WeuiCells,
  WeuiCell,
  WeuiBtnArea,
  WeuiBtn
} from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    WeuiCellsTitle,
    WeuiCells,
    WeuiCell,
    WeuiBtnArea,
    WeuiBtn,
    MaskInput
  },
  computed: {
    maxScore() {
      return Number(this.order.coupon) + Number(this.order.price);
    },
    score() {
      return (Number(this.order.coupon) + Number(this.order.price)).toString();
    }
  },
  data() {
    return {
      orderId: getQueryString('orderId'),
      order: {},
      showMask: false,
      showApp: false,
      showMsgs: false,
      id: null
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      if (!this.orderId) {
        openAlert('订单编号无效');
        return;
      }
      const { data } = await axios.get(`/buyer/order/${this.orderId}`);
      if (!data) {
        openAlert('订单编号无效');
      } else {
        this.order = data;
      }
    });
  },
  methods: {
    handleScore(id) {
      this.showMask = true;
      this.id = id;
    },
    handleOk(value) {
      tryFunc(async () => {
        await axios
          .put(`/shop/${this.id}/score/${value}`)
          .then(function(response) {
            window.location.reload();
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    handleSended(id) {
      tryFunc(async () => {
        await axios
          .put(`/buyer/order/${id}/send`)
          .then(function(response) {
            window.location.reload();
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    handleReceive(id) {
      tryFunc(async () => {
        await axios
          .put(`/buyer/order/${id}/receive`)
          .then(function(response) {
            window.location.reload();
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  },
  filters: {
    status: val => {
      if (val === 'SUBMIT') {
        return '提交订单';
      } else if (val === 'RECEIVE') {
        return '已收钱';
      } else if (val === 'SENDED') {
        return '已发货';
      } else if (val === 'USED') {
        return '已核销';
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

<style lang="scss">
.item {
  display: flex;
  align-items: center;
  justify-content: left;
  padding-bottom: 0.5rem;
}
</style>


