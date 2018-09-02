<template>
  <div class="weui-tab" v-if="showApp">
    <div class="weui-navbar">
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='all'}" @click="handleTabChange('all')">
        全部
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='matching'}" @click="handleTabChange('matching')">
        匹配中
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='match_success'}" @click="handleTabChange('match_success')">
        匹配成功
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='done'}" @click="handleTabChange('done')">
        交易成功
      </div>
    </div>
    <div class="weui-tab__panel">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd" v-if="selected === 'all' && all.length>0">
          <div v-for="(item,i) in all" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-2x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.groupName}}</h4>
              <p class="weui-media-box__desc">{{item.groupMemberCount}}人 | {{item.industry}}</p>
              <p class="weui-media-box__desc">{{item.createTime | time}} | {{item.status | status}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a v-if="item.status === 'MATCH_FAILED'" @click="handleManual" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">手动匹配</a>
              <a v-if="item.status === 'DONE'" :href="`./order_detail.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">查看详情</a>
              <a v-if="item.status === 'DONE'" :href="`./evaluate.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">去评价</a>
              <a v-if="item.status === 'MATCH_SUCCESS'" :href="`./partner.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">查看商伴</a>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else-if="selected === 'matching' && matching.length>0">
          <div v-for="(item,i) in matching" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-2x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.groupName}}</h4>
              <p class="weui-media-box__desc">{{item.groupMemberCount}}人 | {{item.industry}}</p>
              <p class="weui-media-box__desc">{{item.createTime | time}}</p>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else-if="selected === 'match_success' && match_success.length>0">
          <div v-for="(item,i) in match_success" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-2x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.groupName}}</h4>
              <p class="weui-media-box__desc">{{item.groupMemberCount}}人 | {{item.industry}}</p>
              <p class="weui-media-box__desc">{{item.createTime | time}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a :href="`./partner.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">查看商伴</a>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else-if="selected === 'done' && done.length>0">
          <div v-for="(item,i) in done" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-2x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.groupName}}</h4>
              <p class="weui-media-box__desc">{{item.groupMemberCount}}人 | {{item.industry}}</p>
              <p class="weui-media-box__desc">{{item.createTime | time}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a :href="`./order_detail.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">查看详情</a>
              <a :href="`./evaluate.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">去评价</a>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else>
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__bd">
              <p class="weui-media-box__desc no-data">暂无数据</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import moment from 'moment';
import config from '../common/js/config';
import { auth } from '../common/js/auth';
import { tryFunc } from '../common/js/common';

export default {
  data() {
    return {
      selected: 'all',
      all: [],
      matching: [],
      match_success: [],
      done: [],
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/order/`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.all = data;
      for (let item of data) {
        if (item.status === 'MATCH_ONGOING') {
          this.matching.push(item);
        } else if (item.status === 'MATCH_SUCCESS') {
          this.match_success.push(item);
        } else if (item.status === 'DONE') {
          this.done.push(item);
        }
      }
    });
  },
  methods: {
    handleTabChange(name) {
      this.selected = name;
    },
    handleManual() {
      tryFunc(async () => {
        await axios.post(
          `${config.apiHost}/order/manual`,
          {
            matchedOrderId: '',
            originalOrderId: ''
          },
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
      });
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
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style lang="scss">
.fa {
  color: #1aad19;
}

// .count {
//   float: right;
//   color: #999;
//   font-size: 13px;
//   line-height: 2.1;
// }
.weui-media-box__fd {
  display: flex;
  flex-direction: column;
}

.no-data {
  text-align: center;
}
</style>

