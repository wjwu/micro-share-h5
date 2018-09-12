<template>
  <div v-if="showApp">
    <div class="weui-cells__title">账目查询</div>
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell" v-for="item in list" :key="item.id">
            <div class="weui-cell__hd"><label class="weui-label">{{item.userName}}</label></div>
            <div class="weui-cell__bd">
                <span class="weui-badge" :style="item.pay ? '' : 'background-color:#1AAD19;'">{{item.pay ? '已支付' : '待支付'}}</span>
            </div>
            <div class="weui-cell__bd"><a :href="'./detail.html?id=' + item.id" class="weui-btn weui-btn_mini weui-btn_default" style="display:block">查看明细</a></div>
        </div>
    </div>


    <div style="position: fixed;bottom: 0;width: 100%;">
        <div class="weui-cells__title">账目期内合计</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">
                        已收账款
                    </label>
                </div>
                <div class="weui-cell__bd">
                    <i class="weui-icon-success"></i>￥{{totalIn}}
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">
                        待收账款
                    </label>
                </div>
                <div class="weui-cell__bd">
                    <i class="weui-icon-warn" style="display: inline-block;"></i>￥{{totalWait}}
                </div>
            </div>
        </div>
    </div>
    <div class="weui-loadmore weui-loadmore_line">
            <span class="weui-loadmore__tips">暂无数据</span>
        </div>
  </div>
</template>

<script>
import "babel-polyfill";
import axios from "axios";
import config from "../../common/js/config";
import { tryFunc, openToast, getQueryString } from "../../common/js/common";

export default {
  data() {
    return {
      showApp: false,
      from: getQueryString("from"),
      to: getQueryString("to"),
      totalIn: 0,
      totalWait: 0,
      list: []
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      const { data } = await axios.get(
        `${config.apiHost}/account/query?startDate=${this.from}&endDate=${
          this.to
        }`,
        {
          headers: {
            //userId: localStorage.getItem("userId")
            userId: 'f6217fc2-7bae-4972-87d5-563f02fdd9e4'
          }
        }
      );
      if (!data) {
        openToast("暂无数据!")
        return;
      }
      console.log(data);
      this.totalIn = data.totalIn;
      this.totalWait = data.totalWait;
      this.list = data.list;
    });
  },
  methods: {}
};
</script>


