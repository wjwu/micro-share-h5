<template>
  <div v-if="showApp">
    <div class="title">
      <h1>申请圈主</h1>
      <div class="sub-content">
        <div class="sub">温馨提示：</div>
        <div class="subs">
          <div class="sub">您的申请将在5个工作日内被受理完毕；</div>
        </div>
      </div>
    </div>
    <weui-cells>
      <weui-cell label="申请人昵称："></weui-cell>
      <weui-cell label="所在城市："></weui-cell>
      <weui-cell label="圈名：">
        <input class="weui-input" type="text" placeholder="请输入圈名(不超过10个字)" maxlength="10">
      </weui-cell>
      <weui-cell label="圈主题：">
        <input class="weui-input" type="text" placeholder="请输入圈名(不超过20个字)" maxlength="20">
      </weui-cell>
      <weui-cell-select label="申请人行业：">
        <select class="weui-select">
          <option value="OPTIMIZATION">部落运营优化建议</option>
          <option value="REQUIREMENT">部落新增需求建议</option>
          <option value="PROBLEM">部落存在问题反馈</option>
        </select>
      </weui-cell-select>
    </weui-cells>
    <weui-cells-title>您是否具备社群运营经验？</weui-cells-title>
    <weui-cells-radio>
      <weui-check-label type="radio" @change="handleDayChange(7)" name="radioSend" id="sun">是</weui-check-label>
      <weui-check-label type="radio" @change="handleDayChange(7)" name="radioSend" id="sun">否</weui-check-label>
    </weui-cells-radio>
    <weui-cells>
      <weui-cell>
        <weui-textarea maxlength="100" placeholder="请您简述对社群运营体会或看法：100字内" rows="3"></weui-textarea>
      </weui-cell>
    </weui-cells>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleSubmit">提交申请</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import {
  WeuiCellsTitle,
  WeuiCells,
  WeuiCell,
  WeuiCellSelect,
  WeuiTextarea,
  WeuiCellsRadio,
  WeuiCheckLabel,
  WeuiBtnArea,
  WeuiBtn
} from '../../common/components';
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import '../../common/js/share';

export default {
  components: {
    WeuiCellsTitle,
    WeuiCells,
    WeuiCell,
    WeuiCellSelect,
    WeuiTextarea,
    WeuiCellsRadio,
    WeuiCheckLabel,
    WeuiBtnArea,
    WeuiBtn
  },
  data() {
    return {
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
  },
  methods: {
    handleSubmit() {
      tryFunc(async () => {
        await axios.post('');
      });
    }
  }
};
</script>

<style lang="scss">
.sub-content {
  display: flex;
  .sub {
    font-size: 0.75rem !important;
    margin-top: 0 !important;
  }
  .subs {
    flex: 1;
  }
}
</style>


