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
              <i class="fa fa-weixin fa-3x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.groupName}}</h4>
              <p class="weui-media-box__desc">{{item.groupMemberCount}}人 | {{item.industry}}</p>
              <p class="weui-media-box__desc">{{item.createTime | time}} | {{item.status | status}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a v-if="item.status === 'MATCH_FAILED'" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">手动匹配</a>
              <a v-if="item.status === 'DONE'" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">查看详情</a>
              <a v-if="item.status === 'DONE'" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">去评价</a>
              <a v-if="item.status === 'MATCH_SUCCESS'" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">查看商伴</a>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else-if="selected === 'matching' && matching.length>0">
          <div v-for="(item,i) in matching" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-3x"></i>
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
              <i class="fa fa-weixin fa-3x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.groupName}}</h4>
              <p class="weui-media-box__desc">{{item.groupMemberCount}}人 | {{item.industry}}</p>
              <p class="weui-media-box__desc">{{item.createTime | time}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">查看商伴</a>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-else-if="selected === 'done' && done.length>0">
          <div v-for="(item,i) in done" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <i class="fa fa-weixin fa-3x"></i>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.groupName}}</h4>
              <p class="weui-media-box__desc">{{item.groupMemberCount}}人 | {{item.industry}}</p>
              <p class="weui-media-box__desc">{{item.createTime | time}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">查看详情</a>
              <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">去评价</a>
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
  <!-- <div class="weui-tab"> -->
  <!-- <div class="weui-navbar">
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='all'}" @click="handleTabChange('all')">
        全部
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='matching'}" @click="handleTabChange('matching')">
        匹配中
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='matched'}" @click="handleTabChange('matched')">
        匹配成功
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='traded'}" @click="handleTabChange('traded')">
        交易成功
      </div>
    </div>
    <div class="weui-tab__panel">
      <div class="weui-panel weui-panel_access"> -->
  <!-- <div class="weui-panel__hd weui-cell">
          <div class="weui-cell__bd">2018/07/13 23:37:44</div>
          <div class="weui-cell__ft">交易成功</div>
        </div> -->
  <!-- <div class="weui-panel__bd">
          <div v-for="(item,i) in all" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.title}}</h4>
              <p class="weui-media-box__desc">{{item.people}}人&nbsp;&nbsp;{{item.industry}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default">手动匹配</a>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  <!-- <div class="weui-panel__ft">
          <div class="weui-cell weui-cell_link">
            <div class="weui-cell__bd"></div>
            <div class="weui-cell__ft">
              <a class="weui-cell_link" href="javascript:;">手动匹配</a>
              <a class="weui-cell_link" href="javascript:;">评价</a>
            </div>
          </div>
        </div> -->
  <!-- </div> -->
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import moment from 'moment';
import config from '../common/js/config';
import { auth } from '../common/js/auth';
import { Indicator } from 'mint-ui';
import { openToast } from '../common/js/common';

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
  async mounted() {
    Indicator.open();
    try {
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

