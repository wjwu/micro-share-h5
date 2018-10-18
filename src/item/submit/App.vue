<template>
  <div v-if="showApp">
    <weui-cells-title>上传商品</weui-cells-title>
    <weui-cells>
      <weui-cell label="名称">
        <input class="weui-input" type="text" placeholder="请输入商品名(不超过15字)" maxlength="15" v-model="product.name">
      </weui-cell>
      <image-upload title="商品图片" :token="token" :max="5" v-model="images" multiple></image-upload>
      <weui-cell label="原价" v-if="isSpecial">
        <input class="weui-input" v-model="product.originPrice" type="number" pattern="[0-9]*" @textInput="handlKeyDownPrice($event)" placeholder="请输入商品原价">
      </weui-cell>
      <weui-cell>
        <template slot="head">
          <label class="weui-label red" v-if="isSpecial">特价</label>
          <label class="weui-label" v-else>价格</label>
        </template>
        <input class="weui-input" v-model="product.sellPrice" type="number" pattern="[0-9]*" @textInput="handlKeyDownPrice($event)" :placeholder="`请输入商品${isSpecial?'特价':'价格'}`">
      </weui-cell>
      <weui-cell label="可售">
        <input class="weui-input" type="number" pattern="[0-9]*" @textInput="handlKeyDownPrice($event)" placeholder="可售数量" maxlength="5" v-model="product.stock">
      </weui-cell>
    </weui-cells>
    <weui-cells-title>描述</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <weui-textarea v-model="product.description" maxlength="100" placeholder="请输入商品描述信息（可选）,不超过100字" rows="3"></weui-textarea>
      </weui-cell>
    </weui-cells>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleSave">提交</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import { tryFunc, openAlert, getQueryString } from '../../common/js/common';
import {
  ImageUpload,
  WeuiCellsTitle,
  WeuiCells,
  WeuiCell,
  WeuiTextarea,
  WeuiBtnArea,
  WeuiBtn
} from '../../common/components';
import config from '../../common/js/config';
import '../../common/js/share';

const SPECIAL = 'SPECIAL';
const NEWER = 'NEWER';

export default {
  components: {
    ImageUpload,
    WeuiCellsTitle,
    WeuiCells,
    WeuiCell,
    WeuiTextarea,
    WeuiBtnArea,
    WeuiBtn
  },
  data() {
    return {
      SPECIAL,
      productType: getQueryString('t').toUpperCase() || 'NORMAL',
      isSpecial: (getQueryString('t').toLowerCase() || 'NORMAL') === SPECIAL.toLowerCase(),
      productNo: getQueryString('no'),
      product: {
        name: '',
        originPrice: '',
        sellPrice: '',
        description: ''
      },
      token: '',
      images: [],
      regPrice: new RegExp('[0-9\\.]'),
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/token');
      this.token = data.uptoken;
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
      if (this.isSpecial && !reg.test(this.product.originPrice)) {
        openAlert('商品原价不能为空，最多保留两位小数');
        return;
      }
      if (!reg.test(this.product.sellPrice)) {
        openAlert(
          `商品${this.isSpecial ? '特价' : '价格'}不能为空，最多保留两位小数`
        );
        return;
      }
      const _this = this;
      tryFunc(async () => {
        const { data } = await axios.post('/item', {
          ...this.product,
          type: this.productType,
          imgUrl: this.images
            .map(item => `${config.imageHost}/${item}`)
            .join(',')
        });
        if (this.productType === SPECIAL) {
          await axios.post('/shop/special', {
            itemId: data
          });
        } else if (this.productType === NEWER) {
          await axios.post('/shop/newItem', {
            [`itemId${this.productNo}`]: data
          });
        }
        if (this.productType === 'NORMAL') {
          const dialog = weui.dialog({
            content: '操作成功',
            buttons: [
              {
                label: '货架管理',
                type: 'default',
                onClick: () => {
                  window.location.href = './shelves.html';
                }
              },
              {
                label: '继续上传',
                type: 'primary',
                onClick: () => {
                  _this.product = {
                    name: '',
                    sellPrice: '',
                    description: ''
                  };
                  _this.images = [];
                  dialog.hide();
                }
              }
            ]
          });
        } else {
          openAlert('设置成功', () => {
            window.history.back(-1);
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.red {
  color: red;
}
</style>


