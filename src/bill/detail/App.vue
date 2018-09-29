<template>
  <div v-if="showApp">
    <div class="weui-cells__title">账单详情</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">商品名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" readonly="readonly" type="text" v-model="bill.itemName">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">购买数量</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" readonly="readonly" v-model="bill.number">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">客户名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" readonly="readonly" v-model="bill.userName">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">购买日期</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" readonly="readonly" v-model="bill.date">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">支付金额</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" readonly="readonly" v-model="bill.amount">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">支付状态</label>
        </div>
        <div class="weui-cell__bd">
          {{pay}}
        </div>
      </div>
    </div>
    <div class="weui-cells__title">备注</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="bill.remark" class="weui-textarea" readonly="readonly" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>{{bill.remark.length}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_default" href="javascript:history.go(-1);">返回列表</a>
    </div>
    <back></back>
  </div>
</template>
<script>
import axios from 'axios';
import format from 'date-fns/format';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc, getQueryString } from '../../common/js/common';
import Back from '../../common/components/Back';
import '../../common/js/share';

export default {
  components: {
    Back
  },
  data() {
    return {
      pid: getQueryString('id'),
      bill: '',
      pay: '',
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/account/${this.pid}`);
      this.bill = data;
      this.bill.date = format(data.date, 'YYYY-MM-DD');
      this.pay = data.pay ? '已支付' : '待支付';
    });
  },
  methods: {}
};
</script>
