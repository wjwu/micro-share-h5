<template>
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <div class="weui-uploader">
        <div class="weui-uploader__hd">
          <p class="weui-uploader__title">{{title}}{{tip}}</p>
          <div class="weui-uploader__info">{{images.length}}/{{this.max}}</div>
        </div>
        <div class="weui-uploader__bd">
          <ul class="weui-uploader__files" id="uploaderFiles">
            <li v-for="(image,i) in images" :key="i" class="weui-uploader__file" @click="handleImgClick(image,i)" :style="`background-image:url('${imageHost}/${image}')`"></li>
            <li v-if="uploading" class="weui-uploader__file weui-uploader__file_status">
              <div class="weui-uploader__file-content">{{percent}}%</div>
            </li>
          </ul>
          <div v-if="images.length !== this.max" class="weui-uploader__input-box">
            <input v-if="multiple" multiple="multiple" id="uploaderInput" @change="handleImgChange($event)" class="weui-uploader__input" type="file" accept="image/*">
            <input v-else id="uploaderInput" @change="handleImgChange($event)" class="weui-uploader__input" type="file" accept="image/*">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js';
import weui from 'weui.js';
import config from '../js/config';
import { openAlert } from '../js/common';

export default {
  props: {
    title: {
      type: String
    },
    tip: {
      type: String,
      default: '（单张图片最大4MB）'
    },
    token: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      default: []
    },
    max: {
      type: Number,
      default: 1
    }
  },
  model: {
    prop: 'images'
  },
  data() {
    return {
      uploading: false,
      percent: 0,
      imageHost: config.imageHost
    };
  },
  methods: {
    async handleImgChange(e) {
      if (!this.token) {
        openAlert('上传图片Token无效');
        return;
      }
      let files = Array.prototype.slice.call(
        e.target.files,
        0,
        this.max - this.images.length
      );
      for (let file of files) {
        if (!file) {
          continue;
        }
        if (file.size > 1024 * 1024 * 4) {
          openAlert(`图片${file.name}大小超过4MB，无法上传`);
        } else {
          this.upload(file);
        }
      }
    },
    upload(file) {
      const observable = qiniu.upload(
        file,
        null,
        this.token,
        {
          mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
        },
        {
          useCdnDomain: false,
          disableStatisticsReport: false,
          retryCount: 3,
          region: null
        }
      );
      const _this = this;
      this.uploading = true;
      observable.subscribe({
        next(res) {
          _this.percent = res.total.percent.toFixed(0);
        },
        error() {
          _this.uploading = false;
          _this.percent = 0;
          openAlert('图片上传失败请重试!');
        },
        complete(res) {
          _this.uploading = false;
          _this.percent = 0;
          _this.$emit('input', [..._this.images, res.hash]);
        }
      });
    },
    handleImgClick(hash, idx) {
      const _this = this;
      const gallery = weui.gallery(`${this.imageHost}/${hash}`, {
        onDelete: function() {
          if (confirm('确定删除该图片？')) {
            let tmp = [..._this.images];
            tmp.splice(idx, 1);
            _this.$emit('input', tmp);
          }
          gallery.hide(function() {});
        }
      });
    }
  }
};
</script>

