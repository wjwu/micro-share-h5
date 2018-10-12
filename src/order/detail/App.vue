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
      <div class="weui-cell" v-if="order.originalOrder.status !== 'MATCH_ONGOING'">
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
    <div class="weui-cells__title" v-if="order.originalOrder && order.originalOrder.status == 'MATCH_ONGOING'">条件信息</div>
    <div class="weui-cells weui-cells_form" v-if="order.originalOrder && order.originalOrder.status == 'MATCH_ONGOING'">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            匹配范围
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.originalOrder.matchRange}}米</span>
        </div>
      </div>
    </div>
    <div class="weui-cells__title" v-if="order.matchedOrder">商伴信息</div>
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
            群位置
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.matchOrderExtInfo.location}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            产品描述
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{order.matchOrderExtInfo.description}}</span>
        </div>
      </div>
      <div class="weui-cell weui-cell_switch">
        <div class="weui-cell__bd">点击查看群审核材料</div>
        <div class="weui-cell__ft">
          <input class="weui-switch" type="checkbox" v-model="showMsgs">
        </div>
      </div>
      <div class="weui-cell" v-if="showMsgs">
        <div class="weui-cell__bd">
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
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a v-if="order.matchedOrder && order.matchedOrder.status === 'DONE'" class="weui-btn weui-btn_primary" :href="`/order/evaluate.html?orderId=${order.matchedOrder.id}`">去评价</a>
      <a v-if="order.originalOrder && order.originalOrder.status === 'DONE' && order.reported" class="weui-btn weui-btn_warn" :href="`/complaint/submit.html?orderId=${order.originalOrder.id}`">去投诉</a>
      <a v-if="order.originalOrder && order.originalOrder.status === 'MATCH_SUCCESS'" class="weui-btn weui-btn_primary" href="javascript:;" @click="handlePay">同意匹配并支付</a>
      <a v-if="order.originalOrder && order.originalOrder.status === 'MATCH_SUCCESS'" class="weui-btn weui-btn_warn" href="javascript:;" @click="handleDisagree">不同意匹配</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import format from 'date-fns/format';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import {
  openToast,
  tryFunc,
  getQueryString,
  wxPay
} from '../../common/js/common';
import '../../common/js/share';

export default {
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
      if (!data) {
        openToast('订单编号无效');
      } else {
        this.order = data;
      }
    });
  },
  methods: {
    async handlePay() {
      tryFunc(async () => {
        const { data } = await axios.get(`${config.apiHost}/pay/wechat`, {
          headers: {
            userId: localStorage.getItem('userId')
          },
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
        await axios.post(
          `${config.apiHost}/order/${this.orderId}/refuse`,
          {},
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
        openToast('【匹配失败】您已拒绝支付，系统重新匹配中', () => {
          window.location.reload();
        });
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


