<template>
  <div v-if="showApp">
    <div v-if="!selectedRoomId" class="group">
      <div class="weui-cells__title">我的群列表</div>
      <div v-if="myGroups.length > 0">
        <div class="weui-cells" v-for="item in myGroups" :key="item.id">
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="handleClick(item.wechatId)">
            <div class="weui-cell__bd">
              <p>{{item.name}}</p>
            </div>
            <div class="weui-cell__ft">设置抓取关键字</div>
          </a>
        </div>
      </div>
      <div v-else class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
      <div class="weui-cells__title">商伴的群列表</div>
      <div v-if="orderGroups.length > 0">
        <div class="weui-cells" v-for="item in orderGroups" :key="item.id">
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="handleClick(item.wechatId)">
            <div class="weui-cell__bd">
              <p>{{item.name}}</p>
            </div>
            <div class="weui-cell__ft">设置抓取关键字</div>
          </a>
        </div>
      </div>
      <div v-else class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
    <div v-else>
      <div class="weui-cells__title">请设置订单抓取关键词(最多15个)</div>
      <div class="weui-cells" v-if="keywords.length > 0">
        <div class="weui-cell" v-for="(item,i) in keywords" :key="i">
          <div class="weui-cell__bd">{{item}}</div>
          <div class="weui-cell__fd">
            <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default" @click="handleEdit(i)">修改</a>
            <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" @click="handleRemove(i)">删除</a>
          </div>
        </div>
      </div>
      <div v-else class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
      <div class="weui-cells__title">添加/修改</div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">关键词</label>
          </div>
          <div class="weui-cell__bd">
            <input v-model="keyword" class="weui-input" type="text" placeholder="请输入关键词" maxlength="20">
          </div>
        </div>
      </div>
      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleAdd">{{btnText}}</a>
        <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSave">保存</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc, openAlert } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      showApp: false,
      myGroups: [],
      orderGroups: [],
      keywords: [],
      keyword: '',
      selectedIdx: null,
      selectedRoomId: '',
      btnText: '添加'
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/user/myAllRoom');
      this.myGroups = [{}, {}];
      for (let item of data) {
        if (item.type === 'NORMAL') {
          this.myGroups.push(item);
        } else {
          this.orderGroups.push(item);
        }
      }
    });
  },
  methods: {
    handleClick(id) {
      tryFunc(async () => {
        const { data } = await axios.get('/user/keyword', {
          params: {
            roomId: id
          }
        });
        var keyword = data.keyword;
        if (keyword) {
          this.keywords = keyword.split(',');
        }
        this.selectedRoomId = id;
      });
    },
    handleAdd() {
      if (!this.keyword) {
        openAlert('请输入关键词');
        return;
      }
      if (this.btnText === '修改') {
        const idx = this.keywords.findIndex(this.keyword.trim());
        if (idx !== this.selectedIdx && idx >= 0) {
          openAlert('关键词已存在');
          return;
        } else {
          this.keywords[this.selectedIdx] = this.keyword.trim();
          if (this.keywords.length < 15) {
            this.btnText = '添加';
          }
        }
      } else {
        if (this.keywords.indexOf(this.keyword.trim()) >= 0) {
          openAlert('关键词已存在，请勿重复添加');
          return;
        } else {
          this.keywords.push(this.keyword.trim());
          if (this.keywords.length >= 15) {
            this.btnText = '修改';
          }
        }
      }
      this.keyword = '';
    },
    handleRemove(idx) {
      this.keywords.splice(idx, 1);
    },
    handleEdit(idx) {
      this.selectedIdx = idx;
      this.keyword = this.keywords[idx];
      this.btnText = '修改';
    },
    handleSave() {
      tryFunc(async () => {
        await axios.put('/user/keyword', {
          keyword: this.keywords.join(','),
          roomId: this.selectedRoomId
        });
        openAlert('操作成功');
      });
    }
  }
};
</script>

<style lang="scss">
.group {
  .weui-cells {
    margin-top: 0;
  }
}
.weui-loadmore_line {
  margin-top: 1.5rem;

  .weui-loadmore__tips {
    background-color: #f8f8f8 !important;
  }
}

.weui-cell__fd {
  line-height: 0;

  .weui-btn + .weui-btn {
    margin-top: 0;
  }
}
</style>

