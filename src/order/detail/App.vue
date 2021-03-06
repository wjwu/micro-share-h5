<template>
  <div v-if="showApp">
    <div v-if="order.originalOrder && order.originalOrder.status === 'MATCH_SUCCESS'" class="weui-cells__title">由于结伴双方无法在同一时间进行确认操作，系统设定先发起结伴一方先预先支付服务费用等另一方进行确认。3天内另一方拒绝结伴或者不进行确认操作，本次结伴失败，系统自动退回您预先支付的服务费。</div>
    <weui-cells-title>订单信息</weui-cells-title>
    <weui-cells v-if="order.originalOrder">
      <weui-cell label="订单编号">
        {{order.originalOrder.number}}
      </weui-cell>
      <weui-cell label="创建时间">
        {{order.originalOrder.createTime | time}}
      </weui-cell>
      <weui-cell label="服务费" v-if="order.originalOrder.status !== 'MATCH_ONGOING'">
        {{order.originalOrder.price}}
      </weui-cell>
      <weui-cell label="订单状态">
        {{order.originalOrder.status | status}}
      </weui-cell>
      <weui-cell label="群名称">
        {{order.originalOrder.groupName}}
      </weui-cell>
      <weui-cell label="群行业">
        {{order.originalOrder.industry}}
      </weui-cell>
      <weui-cell label="群人数">
        {{order.originalOrder.groupMemberCount}}
      </weui-cell>
    </weui-cells>
    <weui-cells-title v-if="order.originalOrder && order.originalOrder.status == 'MATCH_ONGOING'">条件信息</weui-cells-title>
    <weui-cells v-if="order.originalOrder && order.originalOrder.status == 'MATCH_ONGOING'">
      <weui-cell label="匹配范围">
        {{order.originalOrder.matchRange}}米
      </weui-cell>
    </weui-cells>
    <weui-cells-title v-if="order.matchedOrder">商伴信息</weui-cells-title>
    <weui-cells v-if="order.matchedOrder">
      <weui-cell v-if="order.matchedOrder.status == 'DONE'">
        <template slot="head">
          <label class="weui-label">
            手机号
            <span class="weui-badge" style="margin-left: 5px;">重要</span>
          </label>
        </template>
        {{order.matchedOrder.phone}}
      </weui-cell>
      <weui-cell v-if="order.matchedOrder.status == 'DONE'">
        <template slot="head">
          <label class="weui-label">
            微信号
            <span class="weui-badge" style="margin-left: 5px;">重要</span>
          </label>
        </template>
        {{order.matchedOrder.wechat}}
      </weui-cell>
      <weui-cell label="订单状态">
        {{order.matchedOrder.status | status}}
      </weui-cell>
      <weui-cell label="群名称">
        {{order.matchedOrder.groupName}}
      </weui-cell>
      <weui-cell label="群行业">
        {{order.matchedOrder.industry}}
      </weui-cell>
      <weui-cell label="群位置">
        {{order.matchOrderExtInfo.location}}
      </weui-cell>
      <weui-cell label="产品描述">
        {{order.matchOrderExtInfo.description}}
      </weui-cell>
      <div class="weui-cell weui-cell_switch">
        <div class="weui-cell__bd">点击查看群审核材料</div>
        <div class="weui-cell__ft">
          <input class="weui-switch" type="checkbox" v-model="showMsgs">
        </div>
      </div>
      <weui-cell v-if="showMsgs">
        <ul class="msgs">
          <li v-for="msg in order.matchOrderExtInfo.msgList" :key="msg.id">
            <div class="msg">
              <div class="sender">{{msg.senderName}}</div>
              <div class="content">
                <i class="arrow out"></i>
                <i class="arrow in"></i>
                <span>{{msg.name}}</span>
              </div>
            </div>
            <p class="time">{{msg.createTime | time}}</p>
          </li>
        </ul>
      </weui-cell>
    </weui-cells>
    <weui-btn-area>
      <weui-btn type="primary" v-if="order.matchedOrder && order.matchedOrder.status === 'DONE'" :href="`/order/evaluate.html?orderId=${order.matchedOrder.id}`">去评价</weui-btn>
      <weui-btn type="warn" v-if="order.originalOrder && order.originalOrder.status === 'DONE' && order.reported" :href="`/complaint/submit.html?orderId=${order.originalOrder.id}`">去投诉</weui-btn>
      <weui-btn type="primary" v-if="order.originalOrder && order.originalOrder.status === 'MATCH_SUCCESS'" @click="handlePay">同意匹配并支付</weui-btn>
      <weui-btn type="warn" v-if="order.originalOrder && order.originalOrder.status === 'MATCH_SUCCESS'" @click="handleDisagree">不同意匹配</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import format from 'date-fns/format';
import { auth } from '../../common/js/auth';
import {
  openAlert,
  tryFunc,
  getQueryString,
  wxPay
} from '../../common/js/common';
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
    WeuiBtn
  },
  data() {
    return {
      orderId: getQueryString('orderId'),
      order: {},
      showApp: false,
      showMsgs: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      if (!this.orderId) {
        openAlert('订单编号无效');
        return;
      }
      const { data } = await axios.get(`/order/${this.orderId}`);
      if (!data) {
        openAlert('订单编号无效');
      } else {
        this.order = data;
      }
    });
  },
  methods: {
    async handlePay() {
      tryFunc(async () => {
        const { data } = await axios.get('/pay/wechat', {
          params: {
            orderId: this.orderId
          }
        });
        try {
          await wxPay(data);
          window.location.href = '/order/pay/success.html';
        } catch (e) {
          window.location.href = '/order/pay/fail.html';
        }
      });
    },
    handleDisagree() {
      tryFunc(async () => {
        await axios.post(`/order/${this.orderId}/refuse`);
        openAlert('【匹配失败】您已拒绝支付，系统重新匹配中', () => {
          window.location.reload();
        });
      });
    }
  },
  filters: {
    status: val => {
      if (val === 'MATCH_ONGOING') {
        return '匹配中';
      } else if (val === 'MATCH_SUCCESS') {
        return '匹配成功';
      } else if (val === 'MATCH_FAILED') {
        return '匹配失败';
      } else if (val === 'PAID') {
        return '已支付';
      } else if (val === 'DONE') {
        return '完成';
      } else if (val === 'COMMENT') {
        return '已评价';
      } else if (val === 'REPORTED') {
        return '被投诉';
      } else if (val === 'REPORTED_DISAVOW') {
        return '被投诉—不承认';
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


