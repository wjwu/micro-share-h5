<template>
  <div v-if="showApp">
    <div class="weui-cells__title">请设置订单抓取关键词(最多15个)</div>
    <div class="weui-cells weui-cells_form">
      <div v-if="keywords.length > 0">
        <div class="weui-cell" v-for="(item,i) in keywords" :key="i">
          <div class="weui-cell__bd">{{item}}</div>
          <div class="weui-cell__fd">
            <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default" @click="handleEdit(i)">修改</a>
            <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" @click="handleRemove(i)">删除</a>
          </div>
        </div>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-else>
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
    <div class="weui-cells__title">添加/修改</div>
    <div class="weui-cells weui-cells_form">
      <!-- <p>
          <span v-for="(item,i) in keywords" :key="i" class="weui-badge">{{item}}
            <i class="fa fa-remove" @click="handleRemove(i)"></i>
          </span>
        </p> -->
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
</template>

<script>
import axios from 'axios';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { tryFunc, openToast } from '../../common/js/common';

export default {
  data() {
    return {
      showApp: false,
      keywords: [],
      keyword: '',
      selectedIdx: null,
      btnText: '添加'
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/user`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.keyWords = data;
    });
  },
  methods: {
    handleAdd() {
      if (!this.keyword) {
        openToast('请输入关键词');
        return;
      }
      if (this.btnText === '修改') {
        this.keywords[this.selectedIdx] = this.keyword;
        this.btnText = '添加';
      } else {
        this.keywords.push(this.keyword);
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
        await axios.post(
          `${config.apiHost}`,
          {},
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
      });
    }
  }
};
</script>
