<template>
  <div v-if="showApp">
    <div class="title">
      <h1>新品鉴赏</h1>
    </div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">对外展示名</label>
        </div>
        <div class="weui-cell__bd">
          <b>新品鉴赏（欢迎品鉴）</b>
        </div>
      </div>
      <a class="weui-cell weui-cell_access" :href="`/item/submit.html?t=${NEW}&no=1`">
        <div class="weui-cell__hd">
          <label class="weui-label">1号商品</label>
        </div>
        <div class="weui-cell__bd">
          {{itemName1}}
        </div>
        <div class="weui-cell__ft">
          设置
        </div>
      </a>
      <a class="weui-cell weui-cell_access" :href="`/item/submit.html?t=${NEW}&no=2`">
        <div class="weui-cell__hd">
          <label class="weui-label">2号商品</label>
        </div>
        <div class="weui-cell__bd">
          {{itemName2}}
        </div>
        <div class="weui-cell__ft">
          设置
        </div>
      </a>
      <a class="weui-cell weui-cell_access" :href="`/item/submit.html?t=${NEW}&no=3`">
        <div class="weui-cell__hd">
          <label class="weui-label">3号商品</label>
        </div>
        <div class="weui-cell__bd">
          {{itemName3}}
        </div>
        <div class="weui-cell__ft">
          设置
        </div>
      </a>
    </div>
    <div class="weui-cells__title">商品描述</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" v-model="description" maxlength="30" placeholder="请输入新品描述信息（必填）,不超过30字" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>{{description.length}}</span>/30</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSave">保存商品描述</a>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc, openToast } from '../../common/js/common';

const NEW = 'new';

export default {
  data() {
    return {
      NEW,
      showApp: false,
      itemName1: '',
      itemName2: '',
      itemName3: '',
      description: ''
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/shop/newItem');
      this.itemName1 = data.itemName1;
      this.itemName2 = data.itemName2;
      this.itemName3 = data.itemName3;
      this.description = data.description;
    });
  },
  methods: {
    handleSave() {
      if (!this.description) {
        openToast('请输入特价描述信息');
        return;
      }
      tryFunc(async () => {
        await axios.post('/shop/newItem', {
          description: this.description
        });
        openToast('操作成功');
      });
    }
  }
};
</script>

