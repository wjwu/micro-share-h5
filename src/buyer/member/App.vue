<template>
  <div class="weui-panel" v-if="showApp">
    <div class="weui-panel__hd">
      <label>会员昵称</label>
      <label>券数量</label>
      <label>积分数</label>
      <label>核销积分</label>
    </div>
    <div class="weui-panel__bd" v-if="memberList.length>0">
      <div v-for="(item,i) in memberList" :key="i"  class="weui-media-box weui-media-box_text">
        <p class="weui-media-box__desc">
          <label>{{item.name}}</label>
          <label>{{item.coupons}}</label>
          <label>{{item.score}}</label>
          <label @click="handleClick(item.memberId)">核销积分</label>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import { tryFunc } from "../../common/js/common";
import axios from "../../common/js/axios";

export default {

data() {
    return {
      showApp: false,
      memberList: [],
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      const { data } = await axios.get("/shop/memberList");
      this.memberList = data;
    });
  },methods: {
    handleClick(memberId){
      //TODO 弹窗输入数值，值不能大于当前的item.score
      const num = 5;
      axios.put(`/shop/${memberId}?score=${num}`);
      window.location.reload();
    }
  }
};
</script>

<style lang="scss">
.weui-panel__hd {
  display: flex;
  label {
    flex: 1;
    font-weight: bold;
    text-align: center;
  }
}
.weui-media-box__desc {
  display: flex;
  label {
    flex: 1;
    text-align: center;
  }
}
.weui-panel__hd:after {
  left: 0;
}
.weui-media-box:before {
  left: 0;
}
</style>


