<template>
  <div v-if="showApp">
    <a href="../self/center.html">
      <span class="user_center">
        <img height="100%" width="100%" :src="headPhoto" alt=""></span>
    </a>
    <a href="../qa.html">
      <span class="help"><img height="100%" width="100%" src="./assets/images/help.png" alt=""></span>
    </a>
    <div class="page__hd top">
      <h1 class="page__title">我的商伴</h1>
      <p class="page__desc">请允许获取地理位置以便更好的匹配到附近的商伴<br />建议您关注并置顶公众号，以方便您即时收取与处理相关进展</p>
    </div>
    <div class="weui-grids content">
      <a href="./submit.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/circle.png" alt="">
        </div>
        <p class="weui-grid__label">提交群</p>
      </a>
      <a href="./audits.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/list.png" alt="">
        </div>
        <p class="weui-grid__label">群组列表</p>
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
      <a href="javascript:;" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/more.png" alt="">
        </div>
        <p class="weui-grid__label">更多功能</p>
      </a>
    </div>
    <back></back>
  </div>
</template>

<script>
import Back from '../../common/components/Back';
import defaultHeadPhone from './assets/images/user.png';
import '../../common/js/share';

export default {
  components: {
    Back
  },
  data() {
    return {
      showApp: true,
      headPhoto: localStorage.getItem('headPhoto') || defaultHeadPhone
    };
  },
  mounted() {},
  methods: {}
};
</script>


<style lang="scss">
.top {
  padding: 2rem;
  background-color: #06b04f;
  color: white;
}

.content {
  background-color: white;
}

.user_center {
  float: left;
  margin-left: 0.7rem;
  width: 1.2rem;
  height: 1.2rem;

  img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
}

.user_center > img {
  margin-top: 0.5rem;
}


.help {
  float: right;
  margin-right: 0.7rem;
  width: 1.2rem;
  height: 1.2rem;
}

.help > img {
  padding-top: 0.5rem;
}
</style>
