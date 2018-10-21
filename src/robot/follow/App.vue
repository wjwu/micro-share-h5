<template>
  <div v-if="showApp">
    <div v-if="!selectedRoomId">
      <weui-cells-title>我的群列表</weui-cells-title>
      <weui-cells v-if="myGroups.length > 0">
        <weui-cell-access v-for="item in myGroups" :key="item.id" @click="handleClick(item.wechatId)" foot="设置关注成员">
          {{item.name}}
        </weui-cell-access>
      </weui-cells>
      <weui-load-more-line v-else></weui-load-more-line>
      <weui-cells-title>商伴的群列表</weui-cells-title>
      <weui-cells v-if="orderGroups.length > 0">
        <weui-cell-access v-for="item in orderGroups" :key="item.id" @click="handleClick(item.wechatId)" foot="设置关注成员">
          {{item.name}}
        </weui-cell-access>
      </weui-cells>
      <weui-load-more-line v-else></weui-load-more-line>
    </div>
    <div v-else>
      <weui-cells-title>每个群限关注3人</weui-cells-title>
      <weui-cells-title>为减少对您信息干扰，相同关注人信息10分钟内不重复上报</weui-cells-title>
      <weui-cells-checkbox v-if="members.length > 0">
        <weui-check-label v-for="member in members" :key="member.id" :id="member.id" @click="handleMemberClick" v-model="member.checked">
          {{member.name}}
        </weui-check-label>
      </weui-cells-checkbox>
      <weui-load-more-line v-else></weui-load-more-line>
      <weui-btn-area>
        <weui-btn type="primary" @click="handleSave">保存</weui-btn>
      </weui-btn-area>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc, openAlert } from '../../common/js/common';
import {
  WeuiCells,
  WeuiCellAccess,
  WeuiCellsTitle,
  WeuiLoadMoreLine,
  WeuiBtnArea,
  WeuiBtn,
  WeuiCellsCheckbox,
  WeuiCheckLabel
} from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    WeuiCells,
    WeuiCellAccess,
    WeuiCellsTitle,
    WeuiLoadMoreLine,
    WeuiBtnArea,
    WeuiBtn,
    WeuiCellsCheckbox,
    WeuiCheckLabel
  },
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
    handleClick(id) {
      tryFunc(async () => {
        let { data: members } = await axios.get('/user/myAllRoom/member', {
          params: {
            roomId: id
          }
        });
        if (members && members.length > 0) {
          members.forEach(member => {
            member.checked = false;
          });
          let { data: follows } = await axios.get('/user/myFollows', {
            params: {
              roomId: id
            }
          });
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
    handleMemberClick(id, checked) {
      let count = this.members.filter(member => member.checked).length;
      if (count > 3) {
        for (let member of this.members) {
          if (member.id === id) {
            member.checked = false;
          }
        }
      }
    },
    handleSave() {
      const checkedMembers = this.members.filter(member => member.checked);
      // if (checkedMembers.length === 0) {
      //   openAlert('请选择需要关注的成员');
      //   return;
      // }
      tryFunc(async () => {
        await axios.post('/user/myFollows', {
          follows: checkedMembers.map(m => m.wechatId),
          roomId: this.selectedRoomId
        });
        openAlert('操作成功', () => {
          window.location.reload();
        });
      });
    }
  }
};
</script>

<style lang="scss">
.weui-loadmore__tips {
  background-color: #f8f8f8 !important;
}
</style>

