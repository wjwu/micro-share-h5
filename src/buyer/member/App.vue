<template>
  <div>
    <div class="weui-panel" v-if="showApp">
      <div class="weui-panel__hd">
        <label>会员昵称</label>
        <label>券数量</label>
        <label>积分数</label>
        <label>核销积分</label>
      </div>
      <div class="weui-panel__bd" v-if="memberList.length>0">
        <div v-for="(item,i) in memberList" :key="i" class="weui-media-box weui-media-box_text">
          <p class="weui-media-box__desc">
            <label>{{item.name}}</label>
            <label>{{item.coupons}}</label>
            <label>{{item.score}}</label>
            <label @click="handleClick(item.memberId)">核销积分</label>
          </p>
        </div>
      </div>
    </div>
    <mask-input :visible.sync="showMask" @ok="handleOk" :max="100" title="请输入核销积分" tip="核销积分"></mask-input>
  </div>
</template>

<script>
import { tryFunc } from '../../common/js/common';
import axios from '../../common/js/axios';
import MaskInput from './MaskInput';

export default {
  components: {
    MaskInput
  },
  data() {
    return {
      showApp: false,
      showMask: false,
      memberList: [],
      selectedMemberId: ''
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      const { data } = await axios.get('/shop/memberList');
      this.memberList = data;
    });
  },
  methods: {
    handleClick(memberId) {
      this.showMask = true;
      this.selectedMemberId = memberId;
    },
    handleOk(value) {
      tryFunc(async () => {
        await axios.put(`/shop/${this.selectedMemberId}?score=${value}`);
      });
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


