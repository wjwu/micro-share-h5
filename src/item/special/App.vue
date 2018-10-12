<template>
  <div v-if="showApp">
    <div class="title">
      <h1>本周特价</h1>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">对外展示名</label>
        </div>
        <div class="weui-cell__bd">
          <b>本周特价（抢购）</b>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">商品名称</label>
        </div>
        <div class="weui-cell__bd">
          {{itemName ? itemName : '未添加商品'}}
        </div>
      </div>
    </div>
    <div class="weui-cells__title">特价商品描述</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" v-model="description" maxlength="30" placeholder="请输入特价描述信息（必填）,不超过30字" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>{{description ? description.length : 0}}</span>/30</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSave">保存商品描述</a>
      <a class="weui-btn weui-btn_primary" :href="`/item/submit.html?t=${SPECIAL}`">设置特价商品</a>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc, openToast } from '../../common/js/common';

const SPECIAL = 'SPECIAL';

export default {
  data() {
    return {
      SPECIAL,
      showApp: false,
      itemName: '',
      description: ''
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/shop/special');
      this.itemName = data.itemName;
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
        await axios.post('/shop/special', {
          description: this.description
        });
        openToast('操作成功');
      });
    }
  }
};
</script>

