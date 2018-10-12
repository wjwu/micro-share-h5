<template>
  <div v-if="showApp">
  </div>
</template>

<script>
import axios from 'axios';
import config from '../../common/js/config';
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
      await axios.post(`${config.apiHost}/user/room/${this.partnerId}`, null, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      window.location.href = '/partner/success.html';
    });
  }
};
</script>

