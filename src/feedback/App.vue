<template>
  <div v-if="showApp">
    <div class="title">
      <h1>意见反馈</h1>
    </div>
    <div class="weui-cells__title">反馈内容</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" v-model="content" placeholder="请输入反馈内容" rows="3" maxlength="200"></textarea>
          <div class="weui-textarea-counter">
            <span>{{content.length}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">反馈类型</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="type">
            <option value="OPTIMIZATION">部落运营优化建议</option>
            <option value="REQUIREMENT">部落新增需求建议</option>
            <option value="PROBLEM">部落存在问题反馈</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form">
      <image-upload title="图片" :token="token" :max="4" v-model="images" multiple></image-upload>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSubmit">提交</a>
    </div>
  </div>
</template>

<script>
import axios from '../common/js/axios';
import { auth } from '../common/js/auth';
import config from '../common/js/config';
import { tryFunc, openToast } from '../common/js/common';
import ImageUpload from '../common/components/ImageUpload';
import '../common/js/share';

export default {
  components: {
    ImageUpload
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
        openToast('请输入反馈内容');
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
        openToast('我们已经收到您的建议，谢谢您！', () => {
          this.content = '';
          this.type = 'OPTIMIZATION';
          this.images = [];
        });
      });
    }
  }
};
</script>

