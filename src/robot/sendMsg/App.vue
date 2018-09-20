<template>
  <div class="main" v-if="showApp">
     <div class="weui-cells__title">今日还剩 <b style="color:red;">{{times}}</b> 次群发消息</div>
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">消息类型</label></div>
            <div class="weui-cell__bd">
                <select class="weui-select" v-model="selectType" name="select2">
                    <option selected="selected" value="TEXT">文本</option>
                    <option value="IMG">图片</option>
                </select>
            </div>
        </div>
        <div class="page__bd">
            <div class="weui-gallery" id="gallery">
                <span class="weui-gallery__img" id="galleryImg"></span>
                <div class="weui-gallery__opr">
                    <a href="javascript:" class="weui-gallery__del">
                        <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="weui-cells weui-cells_form" v-if="selectType === 'IMG'">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <div class="weui-uploader">
                    <div class="weui-uploader__hd">
                        <p class="weui-uploader__title">图片</p>
                        <div class="weui-uploader__info">0/1</div>
                    </div>
                    <div class="weui-uploader__bd">
                        <ul class="weui-uploader__files" id="uploaderFiles">
                            <!-- <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li> -->
                        </ul>
                        <div class="weui-uploader__input-box">
                            <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*"
                                multiple="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="weui-cells__title" v-if="selectType === 'TEXT'">消息内容</div>
    <div class="weui-cells weui-cells_form" v-if="selectType === 'TEXT'">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <textarea class="weui-textarea" placeholder="请输入群发消息内容" rows="3"></textarea>
                <div class="weui-textarea-counter"><span>0</span>/200</div>
            </div>
        </div>
    </div>
    <div class="weui-cells__title">请选择需要群发的群组和群</div>
    <div class="weui-cells weui-cells_form">
        <div class="weui-cells weui-cells_checkbox" v-for="room in rooms" :key="room.id">
            <label class="weui-cell weui-check__label" for="s11">
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>{{room.name}}</p>
                </div>
            </label>
        </div>
        <div class="weui-cell" v-if="!rooms || rooms.length === 0">暂无可用群</div>
    </div>
    <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" :disabled="disabled" href="javascript:;">发送</a>
    </div>
    </div>
</template>

<script>
import axios from "axios";
import { auth } from "../../common/js/auth";
import config from "../../common/js/config";
import { tryFunc } from "../../common/js/common";
import weui from "weui.js";

export default {
  data() {
    return {
      showApp: false,
      user: {},
      times: null,
      selectType: "TEXT",
      rooms: [],
      disabled: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/user/myRoom`, {
        headers: {
          userId: localStorage.getItem("userId")
        }
      });
      if (!data || data.length === 0) {
        this.disabled = true;
      }
      this.rooms = data;
      this.times = localStorage.getItem("sendMsgTimes");
      if (!this.times) {
        this.times = 5;
        localStorage.setItem("sendMsgTimes", 5);
      }
    });
  },
  methods: {
    handleJump(url) {
      window.location.href = url;
    }
  }
};
</script>


