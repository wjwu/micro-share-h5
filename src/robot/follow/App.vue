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
            <div class="weui-cell__ft">设置关注成员</div>
          </a>
        </div>
      </div>
      <div v-else class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
      <div class="weui-cells__title">商伴的群列表</div>
      <div v-if="orderGroups.length > 0">
        <div class="weui-cells" v-for="item in orderGroups" :key="item.id">
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="handleClick(item.wechatId)">
            <div class="weui-cell__bd">
              <p>{{item.name}}</p>
            </div>
            <div class="weui-cell__ft">设置关注成员</div>
          </a>
        </div>
      </div>
      <div v-else class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
    <div v-else>
      <div class="weui-cells__title">每个群限关注3人</div>
      <div class="weui-cells weui-cells_checkbox" v-if="members.length > 0">
        <label class="weui-cell weui-check__label" :for="member.wechatId" v-for="member in members" :key="member.id">
          <div class="weui-cell__hd">
            <input type="checkbox" class="weui-check" @click="handleMemberClick($event)" :id="member.wechatId" v-model="member.checked">
            <i class="weui-icon-checked"></i>
          </div>
          <div class="weui-cell__bd">
            <p>{{member.name}}</p>
          </div>
        </label>
      </div>
      <div class="weui-panel__bd" v-else>
        <div class="weui-loadmore weui-loadmore_line">
          <span class="weui-loadmore__tips">暂无数据</span>
        </div>
      </div>
      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleSave">保存</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { tryFunc, openToast } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      showApp: false,
      myGroups: [],
      orderGroups: [],
      members: [],
      selectedRoomId: ''
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/user/myAllRoom`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
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
    handleClick(id) {
      tryFunc(async () => {
        let { data: members } = await axios.get(
          `${config.apiHost}/user/myAllRoom/member`,
          {
            params: {
              roomId: id
            },
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
        if (members && members.length > 0) {
          members.forEach(member => {
            member.checked = false;
          });
          let { data: follows } = await axios.get(
            `${config.apiHost}/user/myFollows`,
            {
              params: {
                roomId: id
              },
              headers: {
                userId: localStorage.getItem('userId')
              }
            }
          );
          if (follows && follows.length > 0) {
            for (let follow of follows) {
              for (let member of members) {
                if (follow.wechatId === member.wechatId) {
                  member.checked = true;
                }
              }
            }
          }
          this.members = members;
        }
        this.selectedRoomId = id;
      });
    },
    handleMemberClick(e) {
      let count = this.members.filter(member => member.checked).length;
      if (count >= 3 && e.target.checked) {
        e.preventDefault();
      }
    },
    handleSave() {
      const checkedMembers = this.members.filter(member => member.checked);
      // if (checkedMembers.length === 0) {
      //   openToast('请选择需要关注的成员');
      //   return;
      // }
      tryFunc(async () => {
        await axios.post(
          `${config.apiHost}/user/myFollows`,
          {
            follows: checkedMembers.map(m => m.wechatId),
            roomId: this.selectedRoomId
          },
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
        openToast('操作成功', () => {
          window.location.reload();
        });
      });
    }
  }
};
</script>

<style lang="scss">
.group {
  .weui-cells{
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

