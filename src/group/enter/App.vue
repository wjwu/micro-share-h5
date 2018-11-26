<template>
  <bar v-if="showApp" :active-index="2">
    <div class="page__hd top">
      <div class="top-info">
        <a href="/match.html" class="help">
          <img src="./assets/images/help.png">
        </a>
      </div>
      <h1 class="page__title">我的商伴</h1>
      <p class="page__desc">提交群请允许获取地理位置以便更好的匹配到附近的商伴<br />建议您关注并置顶公众号，以方便您即时收取与处理相关进展</p>
    </div>
    <!-- <div class="weui-grids content">
      <a href="/group/submit.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/circle.png" alt="">
        </div>
        <p class="weui-grid__label">提交群</p>
      </a>
      <a href="/group/audits.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/list.png" alt="">
        </div>
        <p class="weui-grid__label">审核进展</p>
      </a>
      <a href="/order/list/all.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/match.png" alt="">
        </div>
        <p class="weui-grid__label">匹配进展</p>
      </a>
      <a href="/order/list/evaluate.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/comment.png" alt="">
        </div>
        <p class="weui-grid__label">商伴评价</p>
      </a>
      <a href="/partner/list.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/manage.png" alt="">
        </div>
        <p class="weui-grid__label">商伴管理</p>
      </a>
      <a href="javascript:;" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/more.png" alt="">
        </div>
        <p class="weui-grid__label">更多功能</p>
      </a>
    </div> -->
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
import format from "date-fns/format";
import { auth } from "../../common/js/auth";
import { tryFunc } from "../../common/js/common";
import { Bar, WeuiCells, WeuiCellAccess } from "../../common/components";
import defaultHeadPhone from "./assets/images/user.png";
import "../../common/js/share";

export default {
  components: {
    Bar,
    WeuiCells,
    WeuiCellAccess
  },
  data() {
    return {
      showApp: false,
      headPhoto: localStorage.getItem("headPhoto") || defaultHeadPhone,
      expireTime: ""
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
      return format(val, "YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>


<style lang="scss">
.top {
  position: relative;
  padding: 2rem;
  background-color: #06b04f;
  color: white;
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
  img {
    width: 2rem;
    height: 2rem;
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
