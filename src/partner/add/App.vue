<template>
  <div v-if="showApp">
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc, getQueryString, openToast } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      showApp: false,
      partnerId: getQueryString('pid')
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      if (!this.partnerId) {
        openToast('商伴Id无效');
        return;
      }
      await axios.post(`/user/room/${this.partnerId}`);
      window.location.href = '/partner/success.html';
    });
  }
};
</script>

