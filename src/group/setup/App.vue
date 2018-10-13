<template>
  <div v-if="showApp">
    <div v-if="!selectedRoomId" class="group">
      <div class="weui-cells__title">我的群列表</div>
      <div v-if="myGroups.length > 0">
        <div class="weui-cells" v-for="item in myGroups" :key="item.id">
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="handleClick(item.wechatId)">
            <div class="weui-cell__bd">
              <p>{{item.name}}</p>
            </div>
            <div class="weui-cell__ft">设置欢迎/群规</div>
          </a>
        </div>
      </div>
      <div v-else class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
    <div v-else>
      <div class="weui-cells__title">入群欢迎内容</div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea v-model="welcomeText" class="weui-textarea" placeholder="请输入内容" rows="3" maxlength="200"></textarea>
            <div class="weui-textarea-counter">
              <span>{{welcomeText.length}}</span>/200</div>
          </div>
        </div>
      </div>
      <div class="weui-cells__title">群规</div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea v-model="ruleText" class="weui-textarea" placeholder="请输入内容" rows="3" maxlength="200"></textarea>
            <div class="weui-textarea-counter">
              <span>{{ruleText.length}}</span>/200</div>
          </div>
        </div>
      </div>
      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSave">保存</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { openAlert, tryFunc } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      showApp: false,
      myGroups: [],
      orderGroups: [],
      selectedRoomId: '',
      welcomeText: '',
      ruleText: ''
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/user/myAllRoom');
      for (let item of data) {
        if (item.type === 'NORMAL') {
          this.myGroups.push(item);
        } else {
          this.orderGroups.push(item);
        }
      }
    });
  },
  methods: {
    handleClick(roomId) {
      tryFunc(async () => {
        const { data } = await axios.get('/robot/room/info', {
          params: {
            roomId: roomId
          }
        });
        if (data) {
          this.welcomeText = data.welcome;
          this.ruleText = data.rule;
        }
        this.selectedRoomId = roomId;
      });
    },
    handleSave() {
      tryFunc(async () => {
        await axios.post('/robot/room/info', {
          welcome: this.welcomeText,
          rule: this.ruleText,
          roomId: this.selectedRoomId
        });
        openAlert('操作成功');
      });
    }
  }
};
</script>

<style lang="scss">
.group {
  .weui-cells {
    margin-top: 0;
  }
  .weui-loadmore_line {
    margin-top: 1.5rem;

    .weui-loadmore__tips {
      background-color: #f8f8f8 !important;
    }
  }
}
</style>

