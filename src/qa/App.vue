<template>
  <div class="main" v-if="showApp">
    <ul>
      <li :class="record.type" v-for="record in records" :key="record.id">
        <div v-if="record.type === 'service'" class="name">智能客服</div>
        <div v-else class="name">{{userName}}</div>
        <div class="content">
          <div v-if="record.type === 'customer'" class="head-mask"></div>
          <i class="arrow out"></i>
          <i class="arrow in"></i>
          <div class="text" v-if="record.type==='service'">
            <div v-if="record.data.length !== 1">
              <p v-for="(item,i) in record.data" :key="item.id">
                <a href="javascript:;" @click="handleClick(item)">{{`${i+1}. ${item.title}`}}</a>
              </p>
            </div>
            <div v-else>
              <p v-for="(item,i) in record.data" :key="i">
                <span v-if="item.title" v-html="item.title"></span>
                <img v-if="item.imgUrl" :src="item.imgUrl" @click="handleImgClick(item.imgUrl)" />
              </p>
            </div>
          </div>
          <div class="text" v-else>
            <p v-for="(item,i) in record.data" :key="i">{{item.title}}</p>
          </div>
        </div>
        <div class="time">{{record.time}}</div>
      </li>
    </ul>
    <div class="footer">
      <button @click="handleCustClick">联系人工客服</button>
    </div>
  </div>
</template>

<script>
import axios from '../common/js/axios';
import weui from 'weui.js';
import { auth } from '../common/js/auth';
import format from 'date-fns/format';
import { tryFunc } from '../common/js/common';
import '../common/js/share';

export default {
  data() {
    return {
      showApp: false,
      userName: localStorage.getItem('userName'),
      headPhoto: localStorage.getItem('headPhoto'),
      // userName: '佳哇儿',
      // headPhoto:
      //   'http://thirdwx.qlogo.cn/mmopen/OU2rqvx645tApw6HTRnxM4I1wBWZEmypWP8FkWykrPdWv9TQozeic8BiasEtvlRRdqSN1DqJaXQ9yx4nRkiaQSWsVBlRJUoeKyR/132',
      records: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      await this.getQuestions(0);
    });
  },
  methods: {
    async getQuestions(parentId) {
      const { data } = await axios.get('/help', {
        params: {
          parentId
        }
      });
      this.records.push({
        type: 'service',
        time: format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        data
      });
    },
    async getAnswers(item) {
      if (item.type === 'PARENT') {
        this.getQuestions(item.id);
      } else {
        const { data } = await axios.get(`/help/${item.id}`);
        const dataItem = {};
        if (data.content) {
          dataItem.title = data.content;
        }
        if (data.imgUrl) {
          dataItem.imgUrl = data.imgUrl;
        }
        this.records.push({
          type: 'service',
          time: format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
          data: [dataItem]
        });
      }
    },
    handleClick(item) {
      this.records.push({
        type: 'customer',
        time: format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        data: [
          {
            title: item.title
          }
        ]
      });
      tryFunc(async () => {
        await this.getAnswers(item);
        this.$nextTick(() => {
          const heads = document.querySelectorAll('.customer .content');
          for (let head of heads) {
            head.style.background = `url("${
              this.headPhoto
            }") no-repeat right 0/3.125rem`;
          }
        });
        setTimeout(() => {
          window.scrollTo(0, document.documentElement.offsetHeight);
        }, 50);
      });
    },
    handleImgClick(url) {
      weui.gallery(url, {});
    },
    handleCustClick() {
      weui.gallery('', {});
    }
  }
};
</script>


<style lang="scss">
.weui-gallery__opr {
  display: none;
}

body {
  background-color: #f6f6f6;
}
.main {
  font-size: 0.875rem;

  ul {
    padding: 1rem;

    li {
      margin-bottom: 1rem;
    }
  }

  .service {
    .name {
      padding-left: 0rem;
      color: #ccc;
    }

    .content {
      position: relative;
      min-height: 3.125rem;
      padding-left: 4.25rem;
      background: url('./assets/images/head.png') no-repeat 0 0/3.125rem;

      .arrow {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
      }
      .out {
        border-top: 5px solid transparent;
        border-right: 10px solid #e6e6e6;
        border-bottom: 5px solid transparent;
        left: 58px;
        top: 10px;
      }

      .in {
        border-top: 5px solid transparent;
        border-right: 10px solid #fff;
        border-bottom: 5px solid transparent;
        left: 61px;
        top: 10px;
      }

      .text {
        display: inline-block;
        background-color: #fff;
        padding: 0.3rem 0.5rem;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        a {
          color: #295af3;
        }
        p {
          color: #444;
          line-height: 1.4rem;
        }

        img {
          width: 100%;
        }
      }
    }
  }

  .time {
    margin-top: 1rem;
    font-size: 0.75rem;
    color: #ccc;
    text-align: center;
  }

  .customer {
    .name {
      padding-right: 0.3rem;
      text-align: right;
      color: #ccc;
    }

    .content {
      position: relative;
      min-height: 3.125rem;
      padding-right: 4.25rem;
      // background: url('./assets/images/user@2x.png') no-repeat right 0/3.125rem;
      text-align: right;

      .head-mask {
        position: absolute;
        top: 0;
        right: 0;
        width: 3.125rem;
        height: 3.125rem;
        background: url('./assets/images/head-mask.png') no-repeat right 0/3.125rem;
      }

      .arrow {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
      }
      .out {
        border-top: 5px solid transparent;
        border-left: 10px solid #afe56e;
        border-bottom: 5px solid transparent;
        right: 58px;
        top: 17px;
      }

      .in {
        border-top: 5px solid transparent;
        border-left: 10px solid #afe56e;
        border-bottom: 5px solid transparent;
        right: 61px;
        top: 17px;
      }

      .text {
        display: inline-block;
        margin: 0.5rem 0;
        background-color: #afe56e;
        padding: 0.3rem 0.5rem;
        border: 1px solid #afe56e;
        border-radius: 5px;
        a {
          color: #295af3;
        }
        p {
          color: #444;
          line-height: 1.4rem;
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3.125rem;

    button {
      color: #fff;
      font-size: 1rem;
      width: 100%;
      height: 100%;
      background-color: #3e88ee;
    }
  }
}
</style>
