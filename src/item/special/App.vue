<template>
  <div v-if="showApp">
    <div class="title" style="padding:1rem;">
      <h1>本周特价</h1>
    </div>
    <weui-cells>
      <weui-cell label="对外展示名">
        <b>本周特价（抢购）</b>
      </weui-cell>
      <weui-cell label="已设置商品">
        {{itemName ? itemName : '未添加商品'}}
      </weui-cell>
    </weui-cells>
    <weui-cells-title>特价商品描述</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <weui-textarea v-model="description" maxlength="30" placeholder="请输入特价描述信息（必填）,不超过30字" rows="3"></weui-textarea>
      </weui-cell>
    </weui-cells>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleSave">保存商品描述</weui-btn>
      <weui-btn type="primary" :href="`/item/submit.html?t=${SPECIAL}`">设置特价商品</weui-btn>
      <weui-btn v-if="itemId != 0 && itemId != null" type="primary" :href="`/item/detail.html?pId=${itemId}`">去分享</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import '../../common/js/share';
import { tryFunc, openAlert } from '../../common/js/common';
import {
  WeuiCells,
  WeuiCell,
  WeuiBtnArea,
  WeuiBtn,
  WeuiCellsTitle,
  WeuiTextarea
} from '../../common/components';

const SPECIAL = 'SPECIAL';

export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiBtnArea,
    WeuiBtn,
    WeuiCellsTitle,
    WeuiTextarea
  },
  data() {
    return {
      SPECIAL,
      showApp: false,
      itemName: '',
      description: '',
      itemId: 0
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/shop/special');
      this.itemName = data.itemName;
      this.description = data.description;
      this.itemId = data.itemId;
    });
  },
  methods: {
    handleSave() {
      if (!this.description) {
        openAlert('请输入特价描述信息');
        return;
      }
      tryFunc(async () => {
        await axios.post('/shop/special', {
          description: this.description
        });
        openAlert('操作成功');
      });
    }
  }
};
</script>

