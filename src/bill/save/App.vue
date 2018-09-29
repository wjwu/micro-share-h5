<template>
  <div v-if="showApp">
    <div class="weui-cells__title">保存账单</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">商品名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="itemName" placeholder="请输入商品名称">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">购买数量</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" v-model="number" placeholder="请输入购买数量">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">客户名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="userName" placeholder="请输入客户名称">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">购买日期</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" v-model="date">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">支付金额</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" v-model="amount" placeholder="请输入需要支付的金额">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">是否完成支付</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="pay">
            <option value="true" selected>是</option>
            <option value="false">否</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">备注</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="remark" class="weui-textarea" placeholder="可备注客户地址、联系方式等（可选）" rows="2"></textarea>
          <div class="weui-textarea-counter">
            <span>{{remark.length}}</span>/50</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSave">保存账单</a>
      <a class="weui-btn weui-btn_warn" href="./my.html">账目查询</a>
    </div>
    <back></back>
  </div>
</template>
<script>
import axios from 'axios';
import format from 'date-fns/format';
import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc, openTips } from '../../common/js/common';
import Back from '../../common/components/Back';
import '../../common/js/share';

const today = format(new Date(), 'YYYY-MM-DD');

export default {
  components: {
    Back
  },
  data() {
    return {
      itemName: '',
      number: '',
      userName: '',
      amount: '',
      pay: true,
      remark: '',
      date: today,
      showApp: false,
      regPrice: new RegExp('[0-9\\.]')
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
  },
  methods: {
    handlKeyDownPrice(e) {
      if (!this.regPrice.test(e.data)) {
        e.preventDefault();
      }
    },
    handleSave() {
      const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      if (!this.itemName) {
        openTips('请输入商品名称');
        return;
      }
      if (!this.number) {
        openTips('请输入数量');
        return;
      }
      if (!this.userName) {
        openTips('请输入客户姓名');
        return;
      }
      if (!reg.test(this.amount)) {
        openTips('金额不能为空，最多保留两位小数');
        return;
      }

      tryFunc(async () => {
        await axios.post(
          `${config.apiHost}/account`,
          {
            type: this.type,
            amount: this.amount,
            remark: this.remark,
            date: this.date,
            itemName: this.itemName,
            userName: this.userName,
            number: this.number,
            pay: this.pay
          },
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
      });

      weui.dialog({
        content: '保存成功',
        buttons: [
          {
            label: '确定',
            type: 'primary',
            onClick: () => {
              this.itemName = '';
              this.number = '';
              this.userName = '';
              this.amount = '';
              this.pay = true;
              this.remark = '';
              this.date = today;
            }
          }
        ]
      });
    }
  }
};
</script>
