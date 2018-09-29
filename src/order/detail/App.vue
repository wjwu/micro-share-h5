<template>
  <div v-if="showApp">
    <div class="weui-cells__title">订单信息</div>
    <div class="weui-cells weui-cells_form" v-if="order.originalOrder">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            订单编号
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.originalOrder.number}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            创建时间
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.originalOrder.createTime | time}}</span>
        </div>
      </div>
      <div class="weui-cell" v-if="order.originalOrder !== 'MATCH_ONGOING'">
        <div class="weui-cell__hd">
          <label class="weui-label">
            价格
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.originalOrder.price}}</span>
        </div>
      </div>
      <div class="weui-cell" v-else>
        <div class="weui-cell__hd">
          <label class="weui-label">
            服务费
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.originalOrder.groupMemberCount | price}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            订单状态
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.originalOrder.status | status}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            群名称
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.originalOrder.groupName}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            群行业
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.originalOrder.industry}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            群人数
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.originalOrder.groupMemberCount}}</span>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">商伴信息</div>
    <div class="weui-cells weui-cells_form" v-if="order.matchedOrder">
      <div class="weui-cell" v-if="order.matchedOrder.status == 'DONE'">
        <div class="weui-cell__hd">
          <label class="weui-label">
            手机号
            <span class="weui-badge" style="margin-left: 5px;">重要</span>
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.matchedOrder.phone}}</span>
        </div>
      </div>
      <div class="weui-cell" v-if="order.matchedOrder.status == 'DONE'">
        <div class="weui-cell__hd">
          <label class="weui-label">
            微信号
            <span class="weui-badge" style="margin-left: 5px;">重要</span>
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.matchedOrder.wechat}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            订单状态
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.matchedOrder.status | status}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            群名称
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.matchedOrder.groupName}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            群行业
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.matchedOrder.industry}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            群人数
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.matchedOrder.groupMemberCount}}</span>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a v-if="order.matchedOrder && order.matchedOrder.status === 'DONE'" class="weui-btn weui-btn_primary" :href="`./evaluate.html?orderId=${order.matchedOrder.id}`">去评价</a>
      <a v-if="order.originalOrder && order.originalOrder.status === 'DONE' && order.reported" class="weui-btn weui-btn_default" :href="`./complaint.html?orderId=${order.originalOrder.id}`">去投诉</a>
      <a v-if="order.originalOrder && order.originalOrder.status === 'MATCH_SUCCESS'" class="weui-btn weui-btn_primary" href="javascript:;" @click="handlePay">去支付</a>
      <a class="weui-btn weui-btn_default" href="javascript:history.back()">返回</a>
    </div>
    <back></back>
  </div>
</template>

<script>
import axios from 'axios';
import format from 'date-fns/format';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { openToast, tryFunc, getQueryString } from '../../common/js/common';
import Back from '../../common/components/Back';
import '../../common/js/share';

export default {
  components: {
    Back
  },
  data() {
    return {
      orderId: getQueryString('orderId'),
      order: {},
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      if (!this.orderId) {
        openToast('订单编号无效');
        return;
      }
      const { data } = await axios.get(
        `${config.apiHost}/order/${this.orderId}`,
        {
          headers: {
            userId: localStorage.getItem('userId')
          }
        }
      );
      this.order = data;
    });
  },
  methods: {
    handlePay() {
      tryFunc(async () => {
        await axios.post(`${config.apiHost}/pay/${this.orderId}/fortest`);
        window.location.href = './pay/success.html';
      });
    }
  },
  filters: {
    price: val => {
      const groupCount = Number(val);
      if (groupCount >= 200 && groupCount < 300) {
        return 5;
      } else if (groupCount >= 300 && groupCount < 400) {
        return 8;
      } else if (groupCount >= 400 && groupCount <= 500) {
        return 10;
      } else {
        return 'Unknown';
      }
    },
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

