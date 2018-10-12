<template>
  <div v-if="showApp">
    <div class="group">
      <div class="weui-cells__title">我的群列表</div>
      <div v-if="myGroups.length>0">
        <div class="weui-cells">
          <div class="weui-cell" v-for="item in myGroups" :key="item.id">
            <div class="weui-cell__bd">{{item.name}} | {{item.number}}人</div>
            <div class="weui-cell__fd">
              <a href="javascript:;" @click="handleClick(item.id)" class="weui-btn weui-btn_mini weui-btn_primary">分享</a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
      <div class="weui-cells__title">商伴的群列表</div>
      <div v-if="orderGroups.length>0">
        <div class="weui-cells">
          <div class="weui-cell" v-for="item in orderGroups" :key="item.id">
            <div class="weui-cell__bd">{{item.name}} | {{item.number}}人</div>
          </div>
        </div>
      </div>
      <div v-else class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
    <div class="mask" v-show="showMask" @click="handleMaskClick">
      <p>请长按二维码转发</p>
      <vue-qr :text="shareUrl" :size="200" :margin="10"></vue-qr>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import VueQr from '../../common/lib/vue-qr/main';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import '../../common/js/share';

export default {
  components: {
    VueQr
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
.group {
  .weui-loadmore_line {
    margin-top: 1.5rem;

    .weui-loadmore__tips {
      background-color: #f8f8f8 !important;
    }
  }

  .weui-cells {
    margin-top: 0;
  }
}

.weui-cell__fd {
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

