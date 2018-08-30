<template>
  <div class="weui-tab" v-if="showApp">
    <div class="weui-navbar">
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='all'}" @click="handleTabChange('all')">
        全部
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='auditing'}" @click="handleTabChange('auditing')">
        审核中
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='success'}" @click="handleTabChange('success')">
        审核成功
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='fail'}" @click="handleTabChange('fail')">
        审核失败
      </div>
    </div>
    <div class="weui-tab__panel">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd" v-if="selected === 'all' && all.length>0">
          <div v-if="all && all.length > 0" v-for="(item,i) in all" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-3x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.name}}
                <span class="count">{{item.count}}人 / {{item.status | status}}</span>
              </h4>
              <p class="weui-media-box__desc">{{item.location}}</p>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else-if="selected === 'auditing' && auditing.length>0">
          <div v-if="auditing && auditing.length > 0" v-for="(item,i) in auditing" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-3x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.name}}
                <span class="count">{{item.count}}人</span>
              </h4>
              <p class="weui-media-box__desc">{{item.location}}</p>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else-if="selected === 'success' && success.length>0">
          <div v-if="success && success.length > 0" v-for="(item,i) in success" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-3x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.name}}
                <span class="count">{{item.count}}人</span>
              </h4>
              <p class="weui-media-box__desc">{{item.location}}</p>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else-if="selected === 'fail' && fail.length>0">
          <div v-for="(item,i) in fail" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-3x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.name}}
                <span class="count">{{item.count}}人</span>
              </h4>
              <p class="weui-media-box__desc">{{item.location}}</p>
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
import config from '../common/js/config';
import { auth } from '../common/js/auth';
import { Indicator } from 'mint-ui';
import { openToast } from '../common/js/common';

export default {
  data() {
    return {
      selected: 'all',
      all: [],
      auditing: [],
      success: [],
      fail: [],
      showApp: false
    };
  },
  async mounted() {
    Indicator.open();
    try {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/user/myGroup`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.all = data;
      for (let item of data) {
        if (item.status === 'REVIEW_ONGOING') {
          this.auditing.push(item);
        } else if (item.status === 'REVIEW_SUCCESS') {
          this.success.push(item);
        } else if (item.status === 'REVIEW_FAILED') {
          this.fail.push(item);
        }
      }
      Indicator.close();
    } catch (e) {
      Indicator.close();
      if (e.response && e.response.data) {
        openToast(e.response.data.message);
      } else {
        openToast(e);
      }
    }
  },
  methods: {
    handleTabChange(name) {
      this.selected = name;
    }
  },
  filters: {
    status: val => {
      if (val === 'REVIEW_ONGOING') {
        return '审核中';
      } else if (val === 'REVIEW_SUCCESS') {
        return '审核成功';
      } else if (val === 'REVIEW_FAILED') {
        return '审核失败';
      } else {
        return '';
      }
    }
  }
};
</script>

<style lang="scss">
.fa {
  color: #1aad19;
}

.count {
  float: right;
  color: #999;
  font-size: 13px;
  line-height: 2.1;
}

.no-data {
  text-align: center;
}
</style>


