<template>
  <div v-if="showApp && comps">
    <weui-cells-title>投诉详情</weui-cells-title>
    <weui-cells>
      <weui-cell label="订单号：">
        {{comps.orderNo}}
      </weui-cell>
      <weui-cell label="投诉时间：">
        {{comps.createTime | time}}
      </weui-cell>
      <weui-cell label="投诉状态：">
        {{comps.status | status}}
      </weui-cell>
      <weui-cell label="投诉类型：">
        {{comps.type | type}}
      </weui-cell>
      <weui-cell label="投诉人：">
        {{comps.fromUserName}}
      </weui-cell>
      <weui-cell label="被投诉人：">
        {{comps.toUserName}}
      </weui-cell>
    </weui-cells>
    <weui-cells-title>投诉理由</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <textarea readonly="readonly" class="weui-textarea" rows="3" v-model="comps.content"></textarea>
      </weui-cell>
    </weui-cells>
    <weui-cells-title v-if="comps.refuseContent">拒绝理由</weui-cells-title>
    <weui-cells v-if="comps.refuseContent">
      <weui-cell>
        <textarea readonly="readonly" class="weui-textarea" rows="3" v-model="comps.refuseContent"></textarea>
      </weui-cell>
    </weui-cells>
    <weui-cells-title>证据照片</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <div class="weui-uploader">
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
              <li v-for="(image,i) in comps.imgs" :key="i" class="weui-uploader__file" :style="`background-image:url('${image}')`"></li>
            </ul>
          </div>
        </div>
      </weui-cell>
    </weui-cells>
    <weui-cells-title v-if="comps.handleContent">客服处理意见</weui-cells-title>
    <weui-cells v-if="comps.handleContent">
      <weui-cell>
        <textarea readonly="readonly" class="weui-textarea" rows="3" v-model="comps.handleContent"></textarea>
      </weui-cell>
    </weui-cells>
    <div class="weui-btn-area">
      <a v-if="comps.status==='REPORTED' && userId === comps.toId" class="weui-btn weui-btn_primary" :href="`/complaint/solve.html?compsId=${compsId}`">处理</a>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import format from 'date-fns/format';
import { auth } from '../../common/js/auth';
import { openAlert, tryFunc, getQueryString } from '../../common/js/common';
import { WeuiCellsTitle, WeuiCells, WeuiCell } from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    WeuiCellsTitle,
    WeuiCells,
    WeuiCell
  },
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
        openAlert('投诉编号无效');
        return;
      }
      let { data } = await axios.get(`/user/report/${this.compsId}`);
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
