<template>
  <div v-if="showApp">
    <div class="title">
      <h1>意见反馈</h1>
    </div>
    <weui-cells-title>反馈内容</weui-cells-title>
    <weui-cells-form>
      <weui-cell>
        <weui-textarea v-model="content" placeholder="请输入反馈内容" rows="3" maxlength="200"></weui-textarea>
      </weui-cell>
    </weui-cells-form>
    <weui-cells-form>
      <weui-cell-select label="反馈类型">
        <select class="weui-select" v-model="type">
          <option value="OPTIMIZATION">部落运营优化建议</option>
          <option value="REQUIREMENT">部落新增需求建议</option>
          <option value="PROBLEM">部落存在问题反馈</option>
        </select>
      </weui-cell-select>
    </weui-cells-form>
    <weui-cells-form>
      <image-upload title="图片" :token="token" :max="4" v-model="images" multiple></image-upload>
    </weui-cells-form>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleSubmit">提交</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../common/js/axios';
import { auth } from '../common/js/auth';
import config from '../common/js/config';
import { tryFunc, openAlert } from '../common/js/common';
import {
  ImageUpload,
  WeuiCell,
  WeuiCellsForm,
  WeuiCellsTitle,
  WeuiCellSelect,
  WeuiBtnArea,
  WeuiBtn,
  WeuiTextarea
} from '../common/components';
import '../common/js/share';

export default {
  components: {
    ImageUpload,
    WeuiCell,
    WeuiCellsForm,
    WeuiCellsTitle,
    WeuiCellSelect,
    WeuiBtnArea,
    WeuiBtn,
    WeuiTextarea
  },
  data() {
    return {
      showApp: false,
      content: '',
      type: 'OPTIMIZATION',
      images: [],
      token: '',
      imageHost: config.imageHost
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      let response = await axios.get('/token');
      this.token = response.data.uptoken;
    });
  },
  methods: {
    handleSubmit() {
      if (!this.content) {
        openAlert('请输入反馈内容');
        return;
      }

      tryFunc(async () => {
        await axios.post('/feedback', {
          type: this.type,
          content: this.content,
          imgUrl: this.images
            .map(item => `${config.imageHost}/${item}`)
            .join(',')
        });
        openAlert('我们已经收到您的建议，谢谢您！', () => {
          this.content = '';
          this.type = 'OPTIMIZATION';
          this.images = [];
        });
      });
    }
  }
};
</script>

