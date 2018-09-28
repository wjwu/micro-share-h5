<template>
  <div class="main">
    <div class="banner">
      <div class="menu" @click="handleMenuClick"></div>
    </div>
    <div class="content">
      <h2>关于我们</h2>
      <p>商伴部落致力于通过提供有效的途径和工具，为有正规合法产品或服务销售的社区实体商家、小微商家之间搭建一座资源链接桥梁，采用线下抱团联合、线上共建共拓方式，协助大家低成本盘活资源、互补资源、共享资源，实现参与各方互助、共建、共享、共赢。 “执汝之手，伴汝长成”是部落愿景，也是对原意遵循诚信经营部落成员的服务理念。
      </p>
    </div>
    <div class="footer">
      <p>成都鹅卵石信息技术有限公司</p>
      <p> Copyright © 2019 蜀ICP备18026087号</p>
    </div>
    <back></back>
  </div>
</template>

<script>
import weui from 'weui.js';
import Back from '../common/components/Back';
import '../common/js/share';

export default {
  components: {
    Back
  },
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
  background: url('./assets/images/about.jpg') no-repeat center 0 / cover;

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
    text-indent: 2rem;
    font-size: 0.875rem;
    letter-spacing: 2px;
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


