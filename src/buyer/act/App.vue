<template>
  <div v-if="showApp">
    <div class="page input js_show">
      <div class="page__hd" style="padding: 20px;">
        <h1 class="page__title">老带新活动</h1>
        <p class="page__desc">
          <span style="color:red;">1.请您务必慎重设置抵扣券金额和有效期，以避免失误给您带来不必要的损失。</span>
          <br>2.新老顾客各赠送现金抵扣券
          满
          <span
            style="color:red;"
          >{{shopAct.mustPrice ? shopAct.mustPrice : '0'}}</span> 减
          <span style="color:red;">{{shopAct.price ? shopAct.price : 'X'}}</span>元（每次购物限用一张）
        </p>
      </div>
    </div>
    <div class="weui-cells__title">活动设置</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">分享标题</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            type="text"
            v-model="shopAct.title"
            maxlength="25"
            placeholder="请输入分享标题"
          >
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">分享描述</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            type="text"
            v-model="shopAct.description"
            maxlength="50"
            placeholder="请输入分享描述"
          >
        </div>
      </div>
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
          <label class="weui-label">使用门槛</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            type="number"
            placeholder="满XX元减可使用优惠券"
            value="0"
            v-model="shopAct.mustPrice"
          >
        </div>
        <div class="weui-cell__ft" style="font-size:1rem;">元</div>
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
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">券有效期</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="shopAct.expireNum">
            <option value="1" selected>1个月</option>
            <option value="2">2个月</option>
            <option value="3">3个月</option>
          </select>
        </div>
      </div>
      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">保存</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../common/js/axios";
import weui from "weui.js";
import wxApi from "../../common/js/wxApi";
import { tryFunc, openAlert } from "../../common/js/common";
import config from "../../common/js/config";

export default {
  data() {
    return {
      showApp: false,
      shopAct: {
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        expireNum: 1,
        mustPrice: "",
        price: ""
      },
      userId: localStorage.getItem("userId"),
      imgUrl: "",
      link: ""
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;

      const resp = await axios.get("/user/shopInfoById?userId=" + this.userId);
      if (resp.data) {
        this.imgUrl = resp.data.logo;
      } else {
        openAlert("请先设置店铺基本信息", () => {
          window.location.href = "/other/toker.html";
        });
      }

      const { data } = await axios.get("/user/shopAct?userId=" + this.userId);
      if (data) {
        this.shopAct = data;
      }

      this.link = config.webHost + `/shop.html?userId=${this.userId}`;
      await wxApi.config(["onMenuShareTimeline", "onMenuShareAppMessage"]);

      window.wx.onMenuShareAppMessage(
        {
          title: this.shopAct.title,
          desc: this.shopAct.description,
          link: this.link,
          imgUrl: this.imgUrl
        },
        function(res) {}
      );
      window.wx.onMenuShareTimeline(
        {
          title: this.shopAct.title,
          desc: this.shopAct.description,
          link: this.link,
          imgUrl: this.imgUrl
        },
        function(res) {}
      );
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
      if (!this.shopAct.title) {
        openAlert("请输入分享活动标题");
        return;
      }
      if (!this.shopAct.description) {
        openAlert("请输入分享活动描述");
        return;
      }
      if (!this.shopAct.mustPrice) {
        openAlert("请输入使用门槛");
        return;
      }
      if (!this.shopAct.price) {
        openAlert("请输入活动优惠价格");
        return;
      }
      var startTime = new Date(this.shopAct.startTime);
      var endTime = new Date(this.shopAct.endTime);
      if (startTime.getTime() > endTime.getTime()) {
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
              type: "primary",
              onClick: () => {
                window.location.reload();
              }
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



