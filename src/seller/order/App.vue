<template>
  <div class="weui-tab" v-if="showApp">
    <div class="weui-navbar">
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='all'}" @click="handleTabChange('all')">全部</div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='unreceive'}" @click="handleTabChange('unreceive')">未收款</div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='unsend'}" @click="handleTabChange('unsend')">未发货</div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected ==='unuse'}" @click="handleTabChange('unuse')">未核销</div>
    </div>
    <div class="weui-tab__panel">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd" v-if="selected === 'all' && all.length>0">
          <div v-for="(item,i) in all" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img :src="item.buyerOrderItemList[0].img">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title" style="color:#E64340;">共计￥{{item.price}}元</h4>
              <p class="weui-media-box__desc">{{item.address}}</p>
              <p class="weui-media-box__desc">{{item.status | status}} | {{item.createTime | time}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a @click="handleDel(item.id)" class="weui-btn weui-btn_mini weui-btn_warn">删除订单</a>
              <a :href="`/seller/detail.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">查看详情</a>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-if="selected === 'unuse' && unuse.length>0">
          <div v-for="(item,i) in unuse" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img :src="item.buyerOrderItemList[0].img">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title" style="color:#E64340;">共计￥{{item.price}}元</h4>
              <p class="weui-media-box__desc">{{item.address}}</p>
              <p class="weui-media-box__desc">{{item.status | status}} | {{item.createTime | time}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a :href="`/seller/detail.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">查看详情</a>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-if="selected === 'unsend' && unsend.length>0">
          <div v-for="(item,i) in unsend" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img :src="item.buyerOrderItemList[0].img">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title" style="color:#E64340;">共计￥{{item.price}}元</h4>
              <p class="weui-media-box__desc">{{item.address}}</p>
              <p class="weui-media-box__desc">{{item.status | status}} | {{item.createTime | time}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a :href="`/seller/detail.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">查看详情</a>
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-if="selected === 'unreceive' && unreceive.length>0">
          <div v-for="(item,i) in unreceive" :key="i" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img :src="item.buyerOrderItemList[0].img">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title" style="color:#E64340;">共计￥{{item.price}}元</h4>
              <p class="weui-media-box__desc">{{item.address}}</p>
              <p class="weui-media-box__desc">{{item.status | status}} | {{item.createTime | time}}</p>
            </div>
            <div class="weui-media-box__fd">
              <a :href="`/seller/detail.html?orderId=${item.id}`" class="weui-btn weui-btn_mini weui-btn_default">查看详情</a>
            </div>
          </div>
        </div>
        <!-- <div class="weui-panel__bd" v-else>
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__bd">
              <div class="weui-loadmore weui-loadmore_line">
                <span class="weui-loadmore__tips">没有更多数据了</span>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import format from 'date-fns/format';
import { tryFunc, openConfirm } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      selected: 'all',
      all: [],
      unreceive: [],
      unsend: [],
      unuse: [],
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      const { data } = await axios.get('/shop/order/');
      this.all = data;
      for (let item of data) {
        if (item.status === 'SUBMIT') {
          this.unreceive.push(item);
        } else if (item.status === 'RECEIVE') {
          this.unsend.push(item);
        } else if (item.status === 'SENDED') {
          this.unuse.push(item);
        }
      }
    });
  },
  methods: {
    handleDel(id) {
      openConfirm('您确定要删除订单吗？', () => {
        axios.delete(`/buyer/order/${id}`).then(function(response) {
          window.location.reload();
        });
      });
    },
    encodeURIComponent(val) {
      window.encodeURIComponent(val);
    },
    handleTabChange(name) {
      this.selected = name;
    }
  },
  filters: {
    status: val => {
      if (val === 'SUBMIT') {
        return '提交订单';
      } else if (val === 'RECEIVE') {
        return '已收钱';
      } else if (val === 'SENDED') {
        return '已发货';
      } else if (val === 'USED') {
        return '已核销';
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
.weui-media-box__fd {
  display: flex;
  flex-direction: column;
}

.weui-media-box__hd {
  img {
    width: 4rem;
  }
}
</style>

