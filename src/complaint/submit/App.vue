<template>
  <div v-if="showApp">
    <div class="title">
      <h1>举报与投诉</h1>
      <div class="sub-content">
        <div class="sub">提醒：</div>
        <div class="subs">
          <div class="sub">该投诉为实名投诉，整个处理流程双方皆可见。</div>
          <div class="sub">请您务必提交直观、充足证据材料，避免造成部落处理人员误判而导致无效、恶意投诉误判，影响您的信用记录。</div>
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            商伴昵称
          </label>
        </div>
        <div class="weui-cell__bd">
          {{userName}}
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            订单编号
          </label>
        </div>
        <div class="weui-cell__bd">
          {{orderNo}}
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">投诉类型</label>
        </div>
        <div class="weui-cell__bd">
          <select v-model="type" class="weui-select">
            <option value="">请选择投诉类型</option>
            <option value="RESOURCE_ILLEGAL">对方源群涉嫌非法</option>
            <option value="ACT_ILLEGAL">对方行为涉嫌非法</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form">
      <image-upload title="证据照片" :token="token" :max="4" v-model="images" multiple></image-upload>
    </div>
    <div class="weui-cells__title">投诉描述</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="content" class="weui-textarea" placeholder="请输入内容" rows="3" maxlength="200"></textarea>
          <div class="weui-textarea-counter">
            <span>{{content.length}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled':disableSubmit}" href="javascript:;" @click="handleSubmit">提交</a>
    </div>
  </div>
</template>

<script>
import weui from 'weui.js';
import axios from '../../common/js/axios';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { openToast, tryFunc, getQueryString } from '../../common/js/common';
import ImageUpload from '../../common/components/ImageUpload';
import '../../common/js/share';

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      userName: '',
      orderNo: '',
      type: '',
      content: '',
      showApp: false,
      orderId: getQueryString('orderId'),
      token: '',
      images: [],
      imageHost: config.imageHost,
      disableSubmit: true
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      if (!this.orderId) {
        openToast('订单Id无效');
      } else {
        let response = await axios.get('/token');
        this.token = response.data.uptoken;
        response = await axios.get(`/order/${this.orderId}/report`);
        if (!response.data) {
          openToast('订单Id无效');
        } else {
          this.disableSubmit = false;
          this.userName = response.data.userName;
          this.orderNo = response.data.orderNo;
        }
      }
    });
  },
  methods: {
    handleSubmit() {
      if (this.disableSubmit) {
        return;
      }
      if (!this.type) {
        openToast('请选择投诉类型');
        return;
      }
      if (this.images.length === 0) {
        openToast('请上传至少一张证据照片');
        return;
      }
      if (!this.content) {
        openToast('请输入投诉内容');
        return;
      }
      tryFunc(async () => {
        const request = {
          reason: this.content,
          imgs: this.images.map(item => `${this.imageHost}/${item}`).join(','),
          type: this.type
        };
        await axios.post(`/order/${this.orderId}/report`, request);
        weui.dialog({
          content: '投诉成功，点击确定返回',
          buttons: [
            {
              label: '确定',
              type: 'primary',
              onClick: function() {
                window.location.href = '/order/list/complaint.html';
              }
            }
          ]
        });
      });
    }
  }
};
</script>

</<style lang="scss">
.sub-content {
  display: flex;
  .sub {
    font-size: 0.75rem !important;
    margin-top: 0 !important;
  }
  .subs {
    flex: 1;
  }
}
</style>

