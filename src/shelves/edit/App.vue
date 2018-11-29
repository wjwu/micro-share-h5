<template>
  <div v-if="product && showApp">
    <weui-cells-title>修改商品信息</weui-cells-title>
    <weui-cells>
      <weui-cell label="名称">
        <input class="weui-input" type="text" placeholder="请输入商品名" maxlength="100" v-model="product.name">
      </weui-cell>
      <image-upload title="商品图片" :token="token" :max="5" v-model="images" multiple></image-upload>
      <weui-cell label="价格">
        <input class="weui-input" v-model="product.sellPrice" type="text" pattern="[0-9]*" @textInput="handlKeyDownPrice($event)" placeholder="请输入商品价格">
      </weui-cell>
    </weui-cells>
    <weui-cells-title>描述</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <weui-textarea v-model="product.description" maxlength="200" placeholder="请输入商品描述信息（可选）" rows="3">
        </weui-textarea>
      </weui-cell>
    </weui-cells>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleSave">提交</weui-btn>
      <weui-btn type="warn" @click="handleDelete">删除</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import weui from 'weui.js';
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import {
  tryFunc,
  openAlert,
  getQueryString,
  openConfirm
} from '../../common/js/common';
import {
  ImageUpload,
  WeuiCellsTitle,
  WeuiCells,
  WeuiCell,
  WeuiBtnArea,
  WeuiBtn,
  WeuiTextarea
} from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    ImageUpload,
    WeuiCellsTitle,
    WeuiCells,
    WeuiCell,
    WeuiBtnArea,
    WeuiBtn,
    WeuiTextarea
  },
  data() {
    return {
      productId: getQueryString('id'),
      product: null,
      token: '',
      images: [],
      imageHost: config.imageHost,
      regPrice: new RegExp('[0-9\\.]'),
      showApp: false
    };
  },
  created() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/token');
      this.token = data.uptoken;
    });
  },
  mounted() {
    tryFunc(async () => {
      if (!this.productId) {
        openAlert('商品编号无效');
        return;
      }
      const { data } = await axios.get(`/item/${this.productId}`);
      this.product = data;
      this.images = data.imgUrl
        .split(',')
        .map(item => item.substr(item.lastIndexOf('/') + 1));
    });
  },
  methods: {
    handlKeyDownStock(e) {
      if (!/^[0-9]$/.test(e.data)) {
        e.preventDefault();
      }
    },
    handlKeyDownPrice(e) {
      if (!this.regPrice.test(e.data)) {
        e.preventDefault();
      }
    },
    handleSave() {
      if (!this.product.name) {
        openAlert('请输入商品名称');
        return;
      }
      if (this.images.length === 0) {
        openAlert('请至少上传一张商品图片');
        return;
      }
      const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      if (!reg.test(this.product.sellPrice)) {
        openAlert('商品价格不能为空，最多保留两位小数');
        return;
      }
      tryFunc(async () => {
        await axios.put(`${config.apiHost}/item/${this.productId}`, {
          ...this.product,
          imgUrl: this.images.map(item => `${this.imageHost}/${item}`).join(',')
        });
        let label;
        if (this.product.type === 'NEWER') {
          label = '返回推荐';
        } else if (this.product.type === 'SPECIAL') {
          label = '返回特价';
        } else {
          label = '返回货架';
        }
        const dialog = weui.dialog({
          content: '操作成功',
          buttons: [
            {
              label,
              type: 'default',
              onClick: () => {
                window.history.back();
              }
            },
            {
              label: '留在本页',
              type: 'primary',
              onClick: () => {
                dialog.hide();
              }
            }
          ]
        });
      });
    },
    handleDelete() {
      openConfirm('您确实要删除该商品？', () => {
        tryFunc(async () => {
          await axios.delete(`/item/${this.productId}`);
          setTimeout(() => {
            openAlert('操作成功', () => {
              window.history.back();
            });
          }, 400);
        });
      });
    }
  }
};
</script>

