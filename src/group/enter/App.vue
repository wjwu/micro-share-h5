<template>
  <bar v-if="showApp" :active-index="2">
    <a href="/match.html" class="help">
      <img src="./assets/images/help.png">
    </a>
    <div class="page__hd top">
      <h1 class="page__title">我的商伴</h1>
      <p class="page__desc">提交群请允许获取地理位置以便更好的匹配到附近的商伴<br />建议您关注并置顶公众号，以方便您即时收取与处理相关进展</p>
    </div>
    <weui-cells>
      <weui-cell-access empty-body empty-foot href="/group/submit.html">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/circle.png">
            <label>提交群</label>
          </div>
        </template>
      </weui-cell-access>
    </weui-cells>
    <weui-cells>
      <weui-cell-access empty-body empty-foot href="/group/audits.html">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/list.png">
            <label>审核进展</label>
          </div>
        </template>
      </weui-cell-access>
      <weui-cell-access empty-body empty-foot href="/order/list/all.html">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/match.png">
            <label>匹配进展</label>
          </div>
        </template>
      </weui-cell-access>
    </weui-cells>
    <weui-cells>
      <weui-cell-access empty-body empty-foot href="/partner/list.html">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/manage.png">
            <label>商伴管理</label>
          </div>
        </template>
      </weui-cell-access>
      <weui-cell-access empty-body empty-foot href="/order/list/evaluate.html">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/comment.png">
            <label>商伴评价</label>
          </div>
        </template>
      </weui-cell-access>
    </weui-cells>
    <weui-cells>
      <weui-cell-access label="我的圈子" empty-body empty-foot href="/circle/list.html">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/mycircle.png">
            <label>我的圈子</label>
          </div>
        </template>
      </weui-cell-access>
    </weui-cells>
  </bar>
</template>

<script>
import format from 'date-fns/format';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import { Bar, WeuiCells, WeuiCellAccess } from '../../common/components';
import defaultHeadPhone from './assets/images/user.png';
import '../../common/js/share';

export default {
  components: {
    Bar,
    WeuiCells,
    WeuiCellAccess
  },
  data() {
    return {
      showApp: false,
      headPhoto: localStorage.getItem('headPhoto') || defaultHeadPhone,
      expireTime: ''
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
  },
  filters: {
    time: val => {
      return format(val, 'YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>


<style lang="scss">
.top {
  position: relative;
  padding: .8rem 1.2rem;
  background-color: #06b04f;
  color: white;
  h1{
    font-size: 1.75rem;
    line-height: 1.2;
  }
}

.page__desc{
  font-size: 14px;
  letter-spacing: 1px;
}

.top-info {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  padding: 0.5rem 0.7rem 0 0.7rem;
  top: 0;
  left: 0;
  right: 0;
}

.content {
  background-color: white;
}

.help {
  z-index: 9;
  position: absolute;
  top:1rem;
  right: 1rem;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.head {
  display: flex;
  align-items: center;
  img {
    margin-right: 1rem;
    width: 1.75rem;
    height: 1.75rem;
  }
}
</style>
