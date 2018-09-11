<template>
  <div v-if="showApp">
    <div class="weui-cells__title">查询条件</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">开始日期</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" v-model="from">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">结束日期</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" v-model="to">
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSearch">查询</a>
    </div>
  </div>
</template>

<script>
import "babel-polyfill";
import axios from "axios";
import moment from "moment";
import { auth } from "../../common/js/auth";
import config from "../../common/js/config";
import { tryFunc } from "../../common/js/common";

export default {
  data() {
    return {
      showApp: false,
      to: moment(new Date()).format("YYYY-MM-DD"),
      from: moment(new Date().getTime() - 30 * 24 * 3600 * 1000).format(
        "YYYY-MM-DD"
      )
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      this.$nextTick(() => {
        this.handleSearch();
      });
    });
  },
  methods: {
    handleSearch() {
      tryFunc(async () => {
        const { data } = await axios.get(`${config.apiHost}/account`, {
          params: {
            endDate: this.to,
            startDate: this.from
          },
          headers: {
            userId: localStorage.getItem("userId")
          }
        });
        this.data = data;
      });
    }
  }
};
</script>


