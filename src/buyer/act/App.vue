<template>
  <div v-if="showApp">
    <div class="page input js_show">
      <div class="page__hd" style="padding: 20px;">
        <h1 class="page__title">老带新活动</h1>
        <p class="page__desc">老、新顾客各赠送现金抵扣券<span style='color:red;'>{{shopAct.price ? shopAct.price : 'X'}}</span>元（每次购物限用一张）</p>
      </div>
    </div>
    <div class="weui-cells__title">活动设置</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">开始时间</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" v-model="shopAct.startTime">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">结束时间</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" v-model="shopAct.endTime">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">单张券价值</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" placeholder="请输入单张券价值" v-model="shopAct.price">
        </div>
        <div class="weui-cell__ft" style="font-size:1rem;">元</div>
      </div>
      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">保存</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../common/js/axios";
import weui from 'weui.js';
import { tryFunc, openAlert } from "../../common/js/common";

export default {
  data() {
    return {
      showApp: false,
      shopAct: {
        startTime: "",
        endTime: "",
        price: ""
      }
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      const userId = localStorage.getItem("userId");
      const { data } = await axios.get("/user/shopAct?userId=" + userId);
      if (data) {
        this.shopAct = data;
      }
    });
  },
  methods: {
    handleSave() {
      if (!this.shopAct.startTime) {
        openAlert("请选择活动开始时间");
        return;
      }
      if (!this.shopAct.endTime) {
        openAlert("请选择活动结束时间");
        return;
      }
      if (!this.shopAct.price) {
        openAlert("请输入活动优惠价格");
        return;
      }
      var startTime = new Date(this.shopAct.startTime)
      var endTime = new Date(this.shopAct.endTime)
      if(startTime.getTime() > endTime.getTime()){
        openAlert("结束时间不能小于开始时间");
        return;
      } 
      tryFunc(async () => {
        await axios.post("/user/shopAct", {
          ...this.shopAct
        });
        weui.dialog({
          content: "保存成功",
          buttons: [
            {
              label: "确定",
              type: "primary"
            }
          ]
        });
      });
    }
  }
};
</script>

<style lang="scss">
</style>



