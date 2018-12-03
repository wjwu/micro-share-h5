<template>
  <cust-bar v-if="showApp"></cust-bar>
</template>

<script>
import { auth } from '../common/js/auth';
import { tryFunc } from '../common/js/common';
import CustBar from '../common/components/CustBar';
import '../common/js/share.js';

export default {
  components: {
    CustBar
  },
  data() {
    return {
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
  }
};
</script>

