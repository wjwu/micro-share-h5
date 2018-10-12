<template>
  <div v-if="showApp">
    <div class="weui-cells__title">提示：系统只保留3个月信息，请查询3个月之内信息</div>
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
      <a class="weui-btn weui-btn_primary" :href="'./list.html?from=' + from + '&to=' + to">查询</a>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      showApp: false,
      to: format(new Date(), 'YYYY-MM-DD'),
      from: format(new Date().getTime() - 30 * 24 * 3600 * 1000, 'YYYY-MM-DD')
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
  },
  methods: {}
};
</script>


