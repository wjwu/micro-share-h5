<template>
  <div v-if="showApp && comps">
    <div class="weui-cells__title">投诉详情</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            订单号：
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.orderId}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            投诉时间
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.createTime | time}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            投诉状态
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.status | status}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            投诉人
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.fromUserName}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            被投诉人
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>{{comps.toUserName}}</span>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">投诉理由</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea readonly="readonly" class="weui-textarea" rows="3" v-model="comps.content"></textarea>
        </div>
      </div>
    </div>
    <div class="weui-cells__title" v-if="comps.refuseContent">拒绝理由</div>
    <div class="weui-cells weui-cells_form" v-if="comps.refuseContent">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea readonly="readonly" class="weui-textarea" rows="3" v-model="comps.refuseContent"></textarea>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a v-if="userId === comps.toId" class="weui-btn weui-btn_primary" href="javascript:;" @click="handleClick('confirm')">承认投诉</a>
      <a v-if="userId === comps.toId" class="weui-btn weui-btn_warn" href="javascript:;" @click="handleClick('refuse')">拒绝投诉</a>
    </div>
    <back></back>
  </div>
</template>

<script>
import axios from 'axios';
import format from 'date-fns/format';
import weui from 'weui.js';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { openToast, tryFunc, getQueryString } from '../../common/js/common';
import Back from '../../common/components/Back';
import '../../common/js/share';

export default {
  components: {
    Back
  },
  data() {
    return {
      compsId: getQueryString('compsId'),
      comps: null,
      showApp: false,
      userId: localStorage.getItem('userId')
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      await this.getComps();
    });
  },
  methods: {
    async getComps() {
      if (!this.compsId) {
        openToast('投诉编号无效');
        return;
      }
      const { data } = await axios.get(
        `${config.apiHost}/user/report/${this.compsId}`,
        {
          headers: {
            userId: this.userId
          }
        }
      );
      this.comps = data;
    },
    handleClick(action) {
      const _this = this;
      if (action === 'confirm') {
        weui.confirm('确定承认投诉', () => {
          tryFunc(async () => {
            const request = {
              flag: true,
              reason: ''
            };
            await axios.post(
              `${config.apiHost}/order/report/${this.compsId}/confirm`,
              request,
              {
                headers: {
                  userId: localStorage.getItem('userId')
                }
              }
            );
            weui.toast('操作成功', {
              duration: 1000,
              callback: async () => {
                await _this.getComps();
              }
            });
          });
        });
      } else {
        window.location.href = `./refuse.html?compsId=${this.compsId}`;
      }
    }
  },
  filters: {
    status: val => {
      if (val === 'REPORTED') {
        return '投诉';
      } else if (val === 'REPORTED_DISAVOW') {
        return '投诉不承认';
      } else if (val === 'SUCCESS') {
        return '投诉处理成功';
      } else {
        return '';
      }
    },
    time: val => {
      return format(val, 'YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>
