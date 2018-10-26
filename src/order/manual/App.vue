<template>
  <div v-if="showApp">
    <div class="title">
      <h1>{{name}}</h1>
      <div class="sub">系统将为你匹配附近的微信群</div>
    </div>
    <div class="weui-cells__title">筛选范围</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">距离</label>
        </div>
        <div class="weui-cell__bd">
          <select v-model="selectedRadius" class="weui-select" @change="handleChange">
            <option value="1000" selected="selected">1000</option>
            <option value="2000">2000</option>
            <option value="3000">3000</option>
            <option value="5000">5000</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">可匹配的群列表</div>
      <div class="weui-panel__bd">
        <div v-for="item in orders" :key="item.id" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-2x"></i>
          </div>
          <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.groupName}}</h4>
              <p class="weui-media-box__desc">{{item.groupMemberCount}}人 | {{item.industry}}</p>
              <p class="weui-media-box__desc">{{item.createTime | time}}</p>
          </div>
          <div class="weui-media-box__fd">
            <a href="javascript:;" @click="handleClick(item.id)" class="weui-btn weui-btn_mini weui-btn_default">跟TA匹配</a>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_default" href="./list/all.html">返回</a>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import format from 'date-fns/format';
import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import { openAlert, tryFunc, getQueryString } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      selectedRadius: 1000,
      orderId: getQueryString('orderId'),
      name: getQueryString('name'),
      orders: [],
      showApp: false
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
      await this.getList();
    });
  },
  methods: {
    async getList() {
      const { data } = await axios.get('/order/manual', {
        params: {
          orderId: this.orderId,
          radius: this.selectedRadius
        }
      });
      this.orders = data;
    },
    handleChange() {
      tryFunc(async () => {
        await this.getList();
      });
    },
    handleClick(id) {
      const _this = this;
      const $dialog = weui.dialog({
        content: '确定进行匹配',
        buttons: [
          {
            label: '取消',
            type: 'default',
            onClick: function() {
              $dialog.hide();
            }
          },
          {
            label: '确定',
            type: 'primary',
            onClick: function() {
              _this.handleManual(id);
            }
          }
        ]
      });
    },
    handleManual(id) {
      tryFunc(async () => {
        await axios.post('/order/manual', {
          matchedOrderId: id,
          originalOrderId: this.orderId
        });
        window.location.href = `./detail.html?orderId=${this.orderId}`;
      });
    }
  },
  filters: {
    time: val => {
      return format(val, 'YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style lang="scss">
.fa {
  color: #1aad19;
}

.weui-media-box__fd {
  display: flex;
  flex-direction: column;
}
</style>
