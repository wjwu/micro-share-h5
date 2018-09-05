import { tryFunc } from './common';
import { auth } from './auth';

export const authMixin = {
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
