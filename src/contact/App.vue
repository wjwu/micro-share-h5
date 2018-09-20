<template>
  <div class="main">
    <div class="banner">
      <div class="menu" @click="handleMenuClick"></div>
    </div>
    <div class="content">
      <h2>联系我们</h2>
      <p>邮箱地址：COM.NET@SOHU.COM</p>
      <p>公司地址：四川成都市郫都区绿地●国际花都2栋604室。</p>
    </div>
    <div class="footer">
      <p>成都鹅卵石信息技术有限公司</p>
      <p> Copyright © 2019 蜀ICP备18026087号</p>
    </div>
  </div>
</template>

<script>
import weui from 'weui.js';
export default {
  methods: {
    handleJump(url) {
      window.location.href = url;
    },
    handleMenuClick() {
      weui.actionSheet(
        [
          {
            label: '首页',
            onClick: function() {
              window.location.href = '/home.html';
            }
          },
          {
            label: '关于我们',
            onClick: function() {
              window.location.href = '/about.html';
            }
          },
          {
            label: '联系我们',
            onClick: function() {
              window.location.href = '/contact.html';
            }
          },
          {
            label: '招揽英才',
            onClick: function() {
              window.location.href = '/job.html';
            }
          }
        ],
        [
          {
            label: '取消',
            onClick: function() {}
          }
        ]
      );
    }
  }
};
</script>

<style lang="scss">
html,
body,
.main {
  height: 100%;
}

.main {
  display: flex;
  flex-direction: column;
}

.banner {
  height: 10rem;
  background: url('./assets/images/contact.jpg') no-repeat center 0 / cover;

  .menu {
    width: 2.125rem;
    height: 1.625rem;
    position: absolute;
    right: 1.375rem;
    top: 1.3125rem;
    background: url('./assets/images/menu@2x.png') no-repeat 50% / cover;
  }
}

.content {
  flex: 1;
  h2 {
    padding: 2rem 0;
    color: #333;
    text-align: center;
  }
  p {
    padding: 0 1rem;
    line-height: 1.5rem;
    font-size: 0.875rem;
    color: #999;
  }
}

.footer {
  width: 100%;
  height: 4.375rem;
  text-align: center;
  font-size: 0.5625rem;
  color: #555;
  background-color: #ebebeb;
  line-height: 0.9375rem;
  p:first-of-type {
    padding-top: 1.4375rem;
  }
}
</style>


