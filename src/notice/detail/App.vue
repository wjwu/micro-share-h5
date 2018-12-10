<template>
  <div class="main">
    <div class="banner">
      <div class="menu" @click="handleMenuClick"></div>
    </div>
    <div class="content" v-if="notice">
      <h2>{{notice.title}}</h2>
      <p>{{notice.context}}</p>
    </div>
    <div class="footer">
      <p>成都鹅卵石信息技术有限公司</p>
      <p> Copyright © 2019 蜀ICP备18026087号</p>
    </div>
  </div>
</template>

<script>
import weui from 'weui.js';
import axios from '../../common/js/axios.js';
import { tryFunc, getQueryString } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      noticeId: getQueryString('id'),
      notice: null
    };
  },
  mounted() {
    tryFunc(async () => {
      const { data } = await axios.get(`/news/${this.noticeId}`);
      if (data) {
        this.notice = data;
        document.title = '商伴部落 - ' + data.title;
      }
    });
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
              window.location.href = '/';
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
  flex-shrink: 0;
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
    padding: 2rem 1rem;
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
  flex-shrink: 0;
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


