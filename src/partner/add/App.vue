<template>
  <div v-if="showApp"></div>
</template>

<script>
import axios from "../../common/js/axios";
import { auth } from "../../common/js/auth";
import { tryFunc, getQueryString, openAlert } from "../../common/js/common";
import "../../common/js/share";

export default {
  data() {
    return {
      showApp: false,
      partnerId: getQueryString("pid"),
      sid: getQueryString("sid")
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      if (this.partnerId) {
        await axios.post(`/user/room/${this.partnerId}`);
      }
      if (this.sid) {
        await axios.post(`/shop/part/${this.sid}`);
      }
      window.location.href = "/partner/success.html";
    });
  }
};
</script>

