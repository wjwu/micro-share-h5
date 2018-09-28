<template>
  <div v-if="showApp">
    <div class="group">
      <div class="weui-cells__title">我的群列表</div>
      <div class="weui-tab__panel">
        <div class="weui-panel weui-panel_access">
          <div class="weui-panel__bd" v-if="myGroups.length>0">
            <div v-for="item in myGroups" :key="item.id" class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd">
                <i class="fa fa-weixin fa-2x"></i>
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">{{item.name}}
                  <span class="count"> | {{item.number}}人</span>
                </h4>
              </div>
            </div>
          </div>
          <div class="weui-panel__bd" v-else>
            <div class="weui-loadmore weui-loadmore_line">
              <span class="weui-loadmore__tips">暂无数据</span>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-cells__title">商伴的群列表</div>
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd" v-if="orderGroups.length>0">
          <div v-for="item in orderGroups" :key="item.id" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-2x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.name}}
                <span class="count"> | {{item.number}}人</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <back></back>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import Back from '../../common/components/Back';
import '../../common/js/share';

export default {
  components: {
    Back
  },
  data() {
    return {
      showApp: false,
      myGroups: [],
      orderGroups: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/user/myAllRoom`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      for (let item of data) {
        if (item.type === 'NORMAL') {
          this.myGroups.push(item);
        } else {
          this.orderGroups.push(item);
        }
      }
    });
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
}

.weui-cell__fd {
  .weui-btn + .weui-btn {
    margin-top: 0;
  }
}

.fa {
  color: #1aad19;
}
</style>

