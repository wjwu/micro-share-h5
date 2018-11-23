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
      <weui-cell label="申请人昵称：">{{circle.nick}}</weui-cell>
      <weui-cell label="圈名：">
        <input v-model="circle.name" class="weui-input" type="text" placeholder="请输入圈名(不超过10个字)" maxlength="10">
      </weui-cell>
      <weui-cell label="圈主题：">
        <input v-model="circle.subject" class="weui-input" type="text" placeholder="请输入圈名(不超过20个字)" maxlength="20">
      </weui-cell>
      <weui-cell-select label="申请人行业：">
        <select v-model="circle.industry" class="weui-select">
          <option value="">请选择群所属行业</option>
          <option :value="item.name" v-for="item in industries" :key="item.id">{{item.name}}</option>
        </select>
      </weui-cell-select>
    </weui-cells>
    <weui-cells-title>您是否具备社群运营经验？</weui-cells-title>
    <weui-cells-radio>
      <weui-check-label type="radio" @change="handleExpChange(true)" name="radioExp" id="expYes">是</weui-check-label>
      <weui-check-label type="radio" @change="handleExpChange(false)" name="radioExp" id="expNo">否</weui-check-label>
    </weui-cells-radio>
    <weui-cells>
      <weui-cell>
        <weui-textarea v-model="circle.description" maxlength="100" placeholder="请您简述对社群运营体会或看法：100字内" rows="3"></weui-textarea>
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
import { tryFunc, openAlert } from '../../common/js/common';
import industries from '../../common/js/industries.js';
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
      showApp: false,
      industries,
      circle: {
        nick: '',
        name: '',
        subject: '',
        industry: '',
        experience: '',
        description: ''
      }
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      this.circle.nick = localStorage.getItem('userName');
    });
  },
  methods: {
    handleExpChange(result) {
      this.circle.experience = result;
    },
    handleSubmit() {
      if (!this.circle.name) {
        openAlert('请输入圈名');
        return;
      }
      if (!this.circle.subject) {
        openAlert('请输入圈主题');
        return;
      }
      if (!this.circle.industry) {
        openAlert('请选择群所属行业');
        return;
      }
      if (this.circle.experience === '') {
        openAlert('请选择是否具备群社运营经验');
        return;
      }
      if (!this.circle.description) {
        openAlert('请输入对社群运营体会或看法');
        return;
      }
      tryFunc(async () => {
        await axios.post('/circle', this.circle);
        openAlert('添加成功，请等待审核！', () => {
          window.location.href = '/circle/list.html';
        });
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


