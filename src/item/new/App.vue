<template>
  <div v-if="showApp">
    <div class="title">
      <h1>新品鉴赏</h1>
    </div>
    <weui-cells>
      <weui-cell label="对外展示名">
        <b>新品鉴赏（欢迎品鉴）</b>
      </weui-cell>
      <weui-cell-access label="1号商品" foot="设置" :href="`/item/submit.html?t=${NEWER}&no=1`">
        {{itemName1}}
      </weui-cell-access>
      <weui-cell-access label="2号商品" foot="设置" :href="`/item/submit.html?t=${NEWER}&no=2`">
        {{itemName2}}
      </weui-cell-access>
      <weui-cell-access label="3号商品" foot="设置" :href="`/item/submit.html?t=${NEWER}&no=3`">
        {{itemName3}}
      </weui-cell-access>
    </weui-cells>
    <weui-cells-title>商品描述</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <weui-textarea v-model="description" maxlength="30" placeholder="请输入新品描述信息（必填）,不超过30字" rows="3"></weui-textarea>
      </weui-cell>
    </weui-cells>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleSave">保存商品描述</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc, openAlert } from '../../common/js/common';
import {
  WeuiCells,
  WeuiCell,
  WeuiBtnArea,
  WeuiBtn,
  WeuiCellAccess,
  WeuiCellsTitle,
  WeuiTextarea
} from '../../common/components';

const NEWER = 'NEWER';

export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiBtnArea,
    WeuiBtn,
    WeuiCellAccess,
    WeuiCellsTitle,
    WeuiTextarea
  },
  data() {
    return {
      NEWER,
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
        openAlert('请输入特价描述信息');
        return;
      }
      tryFunc(async () => {
        await axios.post('/shop/newItem', {
          description: this.description
        });
        openAlert('操作成功');
      });
    }
  }
};
</script>

