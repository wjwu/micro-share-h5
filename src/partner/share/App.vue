<template>
  <div v-if="showApp">
    <weui-cells-title>我的群列表</weui-cells-title>
    <weui-cells v-if="myGroups.length>0">
      <weui-cell v-for="item in myGroups" :key="item.id">
        {{item.name}} | {{item.number}}人
        <template slot="foot">
          <weui-btn type="primary" mini @click="handleClick(item.id)">分享</weui-btn>
        </template>
      </weui-cell>
    </weui-cells>
    <weui-load-more-line v-else></weui-load-more-line>
    <weui-cells-title>商伴的群列表</weui-cells-title>
    <weui-cells v-if="orderGroups.length>0">
      <weui-cell v-for="item in orderGroups" :key="item.id">
        {{item.name}} | {{item.number}}人
      </weui-cell>
    </weui-cells>
    <weui-load-more-line v-else></weui-load-more-line>
    <div class="mask" v-show="showMask" @click="handleMaskClick">
      <p>请长按二维码转发</p>
      <vue-qr :text="shareUrl" :size="200" :margin="10"></vue-qr>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import VueQr from '../../common/lib/vue-qr';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import {
  WeuiCells,
  WeuiCell,
  WeuiCellsTitle,
  WeuiLoadMoreLine,
  WeuiBtn
} from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    VueQr,
    WeuiCells,
    WeuiCell,
    WeuiCellsTitle,
    WeuiLoadMoreLine,
    WeuiBtn
  },
  data() {
    return {
      showApp: false,
      myGroups: [],
      orderGroups: [],
      shareUrl: '',
      showMask: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/user/myAllRoom');
      for (let item of data) {
        if (item.type === 'NORMAL') {
          this.myGroups.push(item);
        } else {
          this.orderGroups.push(item);
        }
      }
    });
  },
  methods: {
    handleClick(id) {
      this.shareUrl = `${config.webHost}/partner/add.html?pid=${id}`;
      this.showMask = true;
    },
    handleMaskClick(e) {
      if (e.target.classList && e.target.classList[0] !== 'mask') {
        e.preventDefault();
        return;
      }
      this.showMask = false;
    }
  }
};
</script>

<style lang="scss">
.weui-loadmore__tips {
  background-color: #f8f8f8 !important;
}

.weui-cell__ft {
  line-height: 0;
}
.mask {
  z-index: 99;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
  padding-top: 45%;

  p {
    padding: 10px 0;
    color: #fff;
  }
}
</style>

