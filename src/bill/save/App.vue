<template>
  <div v-if="showApp">
    <div class="weui-cells__title">保存账单</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">账单类型</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="type" @change="handleTypeChange">
            <option value="IN" selected="selected">收入</option>
            <option value="OUT">支出</option>
          </select>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">{{typeName}}日期</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" v-model="date">
        </div>
        <div class="weui-cell__bd" v-if="date === today">
          <span class="weui-badge" style="margin-left: 5px;">今天</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">{{typeName}}金额</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="amount" type="text" placeholder="请输入账单金额" pattern="[0-9]*" @textInput="handlKeyDownPrice($event)">
        </div>
      </div>
    </div>
    <div class="weui-cells__title">备注</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="remark" class="weui-textarea" placeholder="请输入备注信息（可选）" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>{{remark.length}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSave">保存{{typeName}}账单</a>
    </div>
  </div>
</template>
<script>
import 'babel-polyfill';
import axios from 'axios';
import moment from 'moment';
import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc, openToast } from '../../common/js/common';

const today = moment(new Date()).format('YYYY-MM-DD');

export default {
  data() {
    return {
      type: 'IN',
      typeName: '收入',
      amount: '',
      remark: '',
      today: today,
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
    handleTypeChange() {
      if (this.type === 'OUT') {
        this.typeName = '支出';
      } else {
        this.typeName = '收入';
      }
    },
    handlKeyDownPrice(e) {
      if (!this.regPrice.test(e.data)) {
        e.preventDefault();
      }
    },
    handleSave() {
      const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      if (!reg.test(this.amount)) {
        openToast('金额不能为空，最多保留两位小数');
        return;
      }

      tryFunc(async () => {
        await axios.post(
          `${config.apiHost}/account`,
          {
            type: this.type,
            amount: this.amount,
            remark: this.remark,
            date: this.date
          },
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
      });

      const dialog = weui.dialog({
        content: '操作成功',
        buttons: [
          {
            label: '查看账单',
            type: 'default',
            onClick: () => {
              window.location.href = './my.html';
            }
          },
          {
            label: '继续添加',
            type: 'primary',
            onClick: () => {
              this.type = 'IN';
              this.date = this.today;
              this.amount = '';
              this.remark = '';
              dialog.hide();
            }
          }
        ]
      });
    }
  }
};
</script>
