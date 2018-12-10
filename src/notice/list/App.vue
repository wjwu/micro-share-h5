<template>
  <div class="main">
    <div class="banner">
      <div class="menu" @click="handleMenuClick"></div>
    </div>
    <ul class="content" v-if="notices">
      <li v-for="notice in notices" :key="notice.id">
        <p>{{notice.title}}</p>
        <a :href="`/notice/detail.html?id=${notice.id}`">详情</a>
      </li>
    </ul>
    <div class="footer">
      <p>成都鹅卵石信息技术有限公司</p>
      <p> Copyright © 2019 蜀ICP备18026087号</p>
    </div>
  </div>
</template>

<script>
import weui from 'weui.js';
import axios from '../../common/js/axios.js';
import { tryFunc } from '../../common/js/common';
import '../../common/js/share';
export default {
  data() {
    return {
      notices: []
    };
  },
  mounted() {
    tryFunc(async () => {
      const { data } = await axios.get('/news/');
      if (data) {
        this.notices = data;
      }
    });
  },
  methods: {
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
  padding: 0.5rem 0 0.5rem 1rem;
  li {
    display: flex;
    align-items: center;
    height: 2.875rem;
    padding-right: 0.9375rem;
    border-bottom: 1px solid #ccc;

    &::before {
      content: '';
      margin-right: 0.75rem;
      height: 100%;
      width: 0.25rem;
      height: 0.25rem;
      background-color: #333;
      border-radius: 50%;
    }

    p {
      flex: 1;
      color: #333;
      font-size: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    a {
      display: flex;
      align-items: center;
      padding-right: 1.1875rem;
      color: #1492df;
      background: url('./assets/images/details@2x.png') no-repeat right
        center/1.125rem;
    }
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


