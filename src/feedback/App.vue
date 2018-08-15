<template>
  <div>
    <div class="title">
      <h1>意见反馈</h1>
    </div>
    <div class="weui-cells__title">反馈内容</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="请输入反馈内容" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>0</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">反馈类型</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select">
            <option selected="" value="1">0-99</option>
            <option value="2">100-199</option>
            <option value="3">200-299</option>
          </select>
        </div>
      </div>
    </div>
    <div class="page__bd">
      <div class="weui-gallery" id="gallery" style="opacity: 0; display: none;">
        <span class="weui-gallery__img" id="galleryImg" style="background-image:url(./images/pic_160.png)"></span>
        <div class="weui-gallery__opr">
          <a href="javascript:" class="weui-gallery__del">
            <i class="weui-icon-delete weui-icon_gallery-delete"></i>
          </a>
        </div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <p class="weui-uploader__title">图片上传</p>
                <div class="weui-uploader__info">0/2</div>
              </div>
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">
                  <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                  <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                  <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                  <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
                    <div class="weui-uploader__file-content">
                      <i class="weui-icon-warn"></i>
                    </div>
                  </li>
                  <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
                    <div class="weui-uploader__file-content">50%</div>
                  </li>
                  <li class="weui-uploader__file" style="background-image:url(blob:https://weui.io/ac2cdb9e-7ca7-493a-b993-e92c1952a2ee)"></li>
                </ul>
                <div class="weui-uploader__input-box">
                  <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:">提交</a>
    </div>
  </div>
</template>
