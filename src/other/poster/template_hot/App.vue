<template>
  <div v-if="showApp" class="weui-article">
    <div class="weui-cells__title">请选择海报模板</div>
    <div class="weui-cells weui-cells_form">
      <p><img @click="handleClick" :src="`${imageHost}/banner/1.png`" :data-src="`${imageHost}/banner/black,25,451,310+white,18,455,350.png`"></p>
      <p><img @click="handleClick" :src="`${imageHost}/banner/2.png`" :data-src="`${imageHost}/banner/black,28,310,210+white,22,305,260.png`"></p>
    </div>
  </div>
</template>

<script>
import { auth } from '../../../common/js/auth';
import config from '../../../common/js/config';
import { tryFunc } from '../../../common/js/common';
import '../../../common/js/share';

export default {
  data() {
    return {
      showApp: false,
      imageHost: config.imageHost
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
  },
  methods: {
    handleClick(e) {
      window.location.href = `./make.html?s=${window.encodeURIComponent(
        e.target.attributes['src'].value
      )}&t=${window.encodeURIComponent(e.target.attributes['data-src'].value)}`;
    }
  }
};
</script>

