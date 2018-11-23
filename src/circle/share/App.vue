<template>
  <div v-if="showApp">
    <div class="title">
      <h1>邀请加入</h1>
    </div>
    <div class="desc">
      您的好友<b>{{userName}}</b>邀请您一起组建<b>{{circleName}}</b>商伴圈，联合抱团经营。加入圈子，您将有机会免费获得手掌柜智能社交商城工具
    </div>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleJoinClick">立即加入</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { WeuiBtnArea, WeuiBtn } from '../../common/components';
import { tryFunc, getQueryString, openAlert } from '../../common/js/common';
import '../../common/js/share';

export default {
  components: {
    WeuiBtnArea,
    WeuiBtn
  },
  data() {
    return {
      showApp: false,
      circleId: getQueryString('circleId'),
      userName: getQueryString('userName'),
      circleName: ''
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      const { data } = await axios.get(`/circle/${this.circleId}`);
      this.circleName = data.name;
      this.showApp = true;
    });
  },
  methods: {
    handleJoinClick() {
      tryFunc(async () => {
        await axios.post(`/circle/${this.circleId}/addMember`);
        openAlert('加入成功', () => {
          window.location.href = `/circle/detail.html?id=${this.circleId}`;
        });
      });
    }
  }
};
</script>

<style lang="scss">
.desc {
  padding: 0 2rem 2rem 2rem;
  font-size: 0.875rem;
  color: #808080;

  b {
    margin: 0 0.3125rem;
    font-size: 1rem;
  }
}
</style>

