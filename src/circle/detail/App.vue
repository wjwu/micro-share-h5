<template>
  <div v-if="showApp && circle">
    <div class="title">
      <h1>{{circle.name}}</h1>
    </div>
    <weui-cells>
      <weui-cell label="人数：">{{circle.groupNum}}</weui-cell>
      <weui-cell label="行业：">{{circle.industry}}</weui-cell>
      <weui-cell label="主题：">{{circle.subject}}</weui-cell>
    </weui-cells>
    <weui-panel label="圈子成员">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <weui-cells>
          <weui-cell :key="item.userId" v-for="item in circle.circleMemberDtoList">
            <template slot="head">
              <img :src="item.headPhoto">
            </template>
            <p>{{item.nickName}}</p>
          </weui-cell>
        </weui-cells>
      </div>
    </weui-panel>
    <!-- <weui-panel label="审核通过成员">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <weui-cells>
          <weui-cell>
            <template slot="head">
              <img src="../../vip/shopper/assets/images/newuser.png">
            </template>
            <p>成员1</p>
          </weui-cell>
        </weui-cells>
      </div>
    </weui-panel> -->
  </div>
</template>

<script>
import {
  WeuiCells,
  WeuiCell,
  WeuiCellsTitle,
  WeuiPanel
} from '../../common/components';
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc, getQueryString } from '../../common/js/common';

export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellsTitle,
    WeuiPanel
  },
  data() {
    return {
      showApp: false,
      circle: null
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`/circle/${getQueryString('id')}`);
      if (data.circleMemberDtoList) {
        data.groupNum = data.circleMemberDtoList.length;
      } else {
        data.groupNum = 0;
      }
      this.circle = data;
    });
  }
};
</script>

<style lang="scss">
img {
  margin-right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
}
/*.member {
  display: flex;
  align-items: center;
  img {
    margin-right: 1rem;
    width: 1.75rem;
    height: 1.75rem;
  }
}*/
</style>

