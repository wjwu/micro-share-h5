<template>
  <div v-if="showApp">
    <div class="group">
      <div class="weui-cells__title">我的群列表</div>
      <div v-if="myGroups.length>0">
        <div class="weui-cells">
          <div class="weui-cell" v-for="item in myGroups" :key="item.id">{{item.name}} | {{item.number}}人</div>
        </div>
      </div>
      <div v-else class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
      <div class="weui-cells__title">商伴的群列表</div>
      <div v-if="orderGroups.length>0">
        <div class="weui-cells">
          <div class="weui-cell" v-for="item in orderGroups" :key="item.id">
            <div class="weui-cell__bd">{{item.name}} | {{item.number}}人</div>
            <div class="weui-cell__fd">
              <a href="javascript:;" @click="handleDelete(item)" class="weui-btn weui-btn_mini weui-btn_warn">删除</a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
    <back></back>
  </div>
</template>

<script>
import axios from 'axios';
import weui from 'weui.js';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import Back from '../../common/components/Back';
import '../../common/js/share';

export default {
  components: {
    Back
  },
  data() {
    return {
      showApp: false,
      myGroups: [],
      orderGroups: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      await this.load();
    });
  },
  methods: {
    async load() {
      const { data } = await axios.get(`${config.apiHost}/user/myAllRoom`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      for (let item of data) {
        if (item.type === 'NORMAL') {
          this.myGroups.push(item);
        } else {
          this.orderGroups.push(item);
        }
      }
    },
    handleDelete(item) {
      weui.confirm(`您确定要删除商伴：${item.name}？`, () => {
        this.doDelete(item.id);
      });
    },
    doDelete(id) {
      tryFunc(async () => {
        await axios.delete(`${config.apiHost}/user/room/${id}`, {
          headers: {
            userId: localStorage.getItem('userId')
          }
        });
        window.location.reload();
      });
    }
  }
};
</script>

<style lang="scss">
.group {
  .weui-loadmore_line {
    margin-top: 1.5rem;

    .weui-loadmore__tips {
      background-color: #f8f8f8 !important;
    }
  }

  .weui-cells {
    margin-top: 0;
  }
}

.weui-cell__fd {
  line-height: 0;
}
</style>

