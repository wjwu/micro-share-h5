<template>
  <div v-if="showApp">
    <div class="weui-tab__panel" v-if="list.length>0">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd">
          <div v-for="(item,i) in list" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-2x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.groupName}}</h4>
              <p class="weui-media-box__desc">{{item.groupMemberCount}}人 | {{item.industry}}</p>
              <p class="weui-media-box__desc">{{item.createTime | time}} | {{item.status | status}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a :href="`/order/detail.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">详情</a>
              <a :href="`/order/evaluate.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">评价</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-else>
      <span class="weui-loadmore__tips">暂无数据</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../common/js/config';
import { auth } from '../../../common/js/auth';
import { tryFunc } from '../../../common/js/common';

export default {
  data() {
    return {
      list: [],
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(
        `${config.apiHost}/order/status/waitComment`,
        {
          headers: {
            userId: localStorage.getItem('userId')
          }
        }
      );
      this.list = data;
    });
  },
  methods: {
    encodeURIComponent(val) {
      window.encodeURIComponent(val);
    }
  },
  filters: {
    status: val => {
      if (val === 'MATCH_ONGOING') {
        return '匹配中';
      } else if (val === 'MATCH_SUCCESS') {
        return '匹配成功';
      } else if (val === 'MATCH_FAILED') {
        return '匹配失败';
      } else if (val === 'PAID') {
        return '已支付';
      } else if (val === 'DONE') {
        return '完成';
      } else if (val === 'COMMENT') {
        return '已评价';
      } else if (val === 'REPORTED') {
        return '被投诉';
      } else if (val === 'REPORTED_DISAVOW') {
        return '被投诉—不承认';
      } else {
        return '';
      }
    },
    time: val => {
      return format(val, 'YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style lang="scss">
.fa {
  color: #1aad19;
}

.weui-media-box__fd {
  display: flex;
  flex-direction: column;
}
.weui-loadmore_line .weui-loadmore__tips {
  background-color: transparent;
}
</style>

