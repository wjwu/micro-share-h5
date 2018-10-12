<template>
  <div v-if="showApp && comps">
    <div class="weui-cells__title">投诉详情</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            订单号：
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.orderNo}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            投诉时间
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.createTime | time}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            投诉状态
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.status | status}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            投诉类型
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.type | type}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            投诉人
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.fromUserName}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            被投诉人
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.toUserName}}</span>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">投诉理由</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea readonly="readonly" class="weui-textarea" rows="3" v-model="comps.content"></textarea>
        </div>
      </div>
    </div>
    <div class="weui-cells__title" v-if="comps.refuseContent">拒绝理由</div>
    <div class="weui-cells weui-cells_form" v-if="comps.refuseContent">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea readonly="readonly" class="weui-textarea" rows="3" v-model="comps.refuseContent"></textarea>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">证据照片</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files">
                <li v-for="(image,i) in comps.imgs" :key="i" class="weui-uploader__file" :style="`background-image:url('${image}')`"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a v-if="comps.status==='REPORTED' && userId === comps.toId" class="weui-btn weui-btn_primary" :href="`/complaint/solve.html?compsId=${compsId}`">处理</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import format from 'date-fns/format';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { openToast, tryFunc, getQueryString } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      compsId: getQueryString('compsId'),
      comps: null,
      showApp: false,
      userId: localStorage.getItem('userId')
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      await this.getComps();
    });
  },
  methods: {
    async getComps() {
      if (!this.compsId) {
        openToast('投诉编号无效');
        return;
      }
      let { data } = await axios.get(
        `${config.apiHost}/user/report/${this.compsId}`,
        {
          headers: {
            userId: this.userId
          }
        }
      );
      data.imgs = data.imgs.split(',');
      this.comps = data;
    }
  },
  filters: {
    type: val => {
      if (val === 'RESOURCE_ILLEGAL') {
        return '对方源群涉嫌非法';
      } else if (val === 'ACT_ILLEGAL') {
        return '对方行为涉嫌非法';
      }
      return '';
    },
    status: val => {
      if (val === 'REPORTED') {
        return '投诉';
      } else if (val === 'REPORTED_DISAVOW') {
        return '投诉不承认';
      } else if (val === 'SUCCESS') {
        return '投诉处理成功';
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
