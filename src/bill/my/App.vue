<template>
  <div v-if="showApp">
    <div class="weui-cells__title">查询条件</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">开始日期</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" v-model="from">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">结束日期</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" v-model="to">
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSearch">查询</a>
    </div>
    <div class="weui-cells__title">图表</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cells__title">总收入支出</div>
      <canvas id="all"></canvas>
      <div class="weui-cells__title">总收入</div>
      <canvas id="income"></canvas>
      <div class="weui-cells__title">总支出</div>
      <canvas id="spending"></canvas>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import moment from 'moment';
// import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc } from '../../common/js/common';

export default {
  data() {
    return {
      showApp: false,
      to: moment(new Date()).format('YYYY-MM-DD'),
      from: moment(new Date().getTime() - 30 * 24 * 3600 * 1000).format(
        'YYYY-MM-DD'
      )
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      this.$nextTick(() => {
        this.handleSearch();
      });
    });
  },
  methods: {
    handleSearch() {
      tryFunc(async () => {
        const { data } = await axios.get(`${config.apiHost}/account`, {
          params: {
            endDate: this.to,
            startDate: this.from
          },
          headers: {
            userId: localStorage.getItem('userId')
          }
        });
        this.data = data;
        this.loadAll();
        this.loadIncome();
        this.loadSpending();
      });
    },
    loadAll() {
      var map = {
        总收入: `￥${this.data.base.IN}`,
        总支出: `￥${this.data.base.OUT}`
      };
      var data = [
        {
          name: '总收入',
          percent: (this.data.base.IN / (this.data.base.IN + this.data.base.OUT)).toFixed(2) * 100
        },
        {
          name: '总支出',
          percent: (this.data.base.OUT / (this.data.base.IN + this.data.base.OUT)).toFixed(2) * 100
        }
      ];
      var chart = new window.F2.Chart({
        id: 'all',
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            return val * 100 + '%';
          }
        }
      });
      chart.legend({
        position: 'right',
        itemFormatter: function itemFormatter(val) {
          return val + '  ' + map[val];
        }
      });
      chart.tooltip(false);
      chart.coord('polar', {
        transposed: true,
        radius: 0.85,
        innerRadius: 0.618
      });
      chart.axis(false);
      chart
        .interval()
        .position('a*percent')
        .color('name', [
          '#1890FF',
          '#13C2C2',
          '#2FC25B',
          '#FACC14',
          '#F04864',
          '#8543E0'
        ])
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        });
      chart.guide().html({
        position: ['50%', '50%'],
        html:
          '<div style="text-align: center;width: 100px;height: 72px;vertical-align: middle;">' +
          '<p id="number" style="font-size: 28px;margin: 10px 10px 5px;font-weight: bold;"></p>' +
          '<p id="name" style="font-size: 12px;margin: 0;"></p>' +
          '</div>'
      });
      chart.render();
    },
    loadIncome() {
      var data = this.data.inList;

      var chart = new window.F2.Chart({
        id: 'income',
        pixelRatio: window.devicePixelRatio
      });

      var defs = {
        time: {
          type: 'timeCat',
          mask: 'MM/DD',
          tickCount: 3,
          range: [0, 1]
        },
        tem: {
          tickCount: 5,
          min: 0,
          alias: '收入'
        }
      };
      chart.source(data, defs);
      chart.axis('time', {
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.tooltip({
        showCrosshairs: true
      });
      chart
        .line()
        .position('time*tem')
        .shape('smooth');
      chart
        .point()
        .position('time*tem')
        .shape('smooth')
        .style({
          stroke: '#fff',
          lineWidth: 1
        });
      chart.render();
    },
    loadSpending() {
      var data = this.data.outList;

      var chart = new window.F2.Chart({
        id: 'spending',
        pixelRatio: window.devicePixelRatio
      });

      var defs = {
        time: {
          type: 'timeCat',
          mask: 'MM/DD',
          tickCount: 3,
          range: [0, 1]
        },
        tem: {
          tickCount: 5,
          min: 0,
          alias: '支出'
        }
      };
      chart.source(data, defs);
      chart.axis('time', {
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.tooltip({
        showCrosshairs: true
      });
      chart
        .line()
        .position('time*tem')
        .shape('smooth');
      chart
        .point()
        .position('time*tem')
        .shape('smooth')
        .style({
          stroke: '#fff',
          lineWidth: 1
        });
      chart.render();
    }
  }
};
</script>

<style lang="scss">
canvas {
  width: 100%;
  height: 15rem;
}
</style>



