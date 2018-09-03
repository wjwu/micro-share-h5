<template>
  <div v-if="showApp">
    <div class="title">
      <h1>订单详情</h1>
    </div>
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
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            价格
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.originalOrder.price}}</span>
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
      <a class="weui-btn weui-btn_primary" href="./match_list.html">返回</a>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import moment from 'moment';
import config from '../common/js/config';
import { auth } from '../common/js/auth';
import { openToast, tryFunc, getQueryString } from '../common/js/common';

export default {
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
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

