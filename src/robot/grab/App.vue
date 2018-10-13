<template>
  <div v-if="showApp">
    <div v-if="!selectedRoomId">
      <weui-cells-title>我的群列表</weui-cells-title>
      <weui-cells v-if="myGroups.length > 0">
        <weui-cell-access foot="设置抓取关键字" v-for="item in myGroups" :key="item.id" @click="handleClick(item.wechatId)">
          {{item.name}}
        </weui-cell-access>
      </weui-cells>
      <weui-load-more-line v-else></weui-load-more-line>
      <weui-cells-title>商伴的群列表</weui-cells-title>
      <weui-cells v-if="orderGroups.length > 0">
        <weui-cell-access foot="设置抓取关键字" v-for="item in orderGroups" :key="item.id" @click="handleClick(item.wechatId)">
          {{item.name}}
        </weui-cell-access>
      </weui-cells>
      <weui-load-more-line v-else></weui-load-more-line>
    </div>
    <div v-else>
      <weui-cells-title>请设置订单抓取关键词(最多15个)</weui-cells-title>
      <weui-cells v-if="keywords.length > 0">
        <weui-cell v-for="(item,i) in keywords" :key="i">
          {{item}}
          <template slot="foot">
            <weui-btn type="default" mini @click="handleEdit(i)">修改</weui-btn>
            <weui-btn type="warn" mini @click="handleRemove(i)">删除</weui-btn>
          </template>
        </weui-cell>
      </weui-cells>
      <weui-load-more-line v-else></weui-load-more-line>
      <weui-cells-title>添加/修改</weui-cells-title>
      <weui-cells>
        <weui-cell>
          <template slot="headLabel">关键词</template>
          <input v-model="keyword" class="weui-input" type="text" placeholder="请输入关键词" maxlength="20">
        </weui-cell>
      </weui-cells>
      <weui-btn-area>
        <weui-btn type="primary" @click="handleAdd">{{btnText}}</weui-btn>
        <weui-btn type="primary" @click="handleSave">保存</weui-btn>
      </weui-btn-area>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc, openAlert } from '../../common/js/common';
import {
  WeuiCellsTitle,
  WeuiCells,
  WeuiCellAccess,
  WeuiLoadMoreLine,
  WeuiCell,
  WeuiBtn,
  WeuiBtnArea
} from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    WeuiCellsTitle,
    WeuiCells,
    WeuiCellAccess,
    WeuiLoadMoreLine,
    WeuiCell,
    WeuiBtn,
    WeuiBtnArea
  },
  data() {
    return {
      showApp: false,
      keywords: [],
      keyword: '',
      selectedIdx: null,
      selectedRoomId: 'sss',
      btnText: '添加'
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/user/myAllRoom');
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
        const idx = this.keywords.findIndex(
          item => item === this.keyword.trim()
        );
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
.weui-loadmore__tips {
  background-color: #f8f8f8 !important;
}

.weui-cell__ft {
  line-height: 0;

  .weui-btn + .weui-btn {
    margin-top: 0;
  }
}
</style>

