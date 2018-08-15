<template>
  <div>
    <div class="title">
      <h1>群信息填写</h1>
    </div>
    <div class="weui-cells__title">基本信息</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入名称">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">行业</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入行业">
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">人数</label>
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
    <div class="weui-cells__title">描述</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="请输入描述" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>0</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">确定</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSave() {}
  }
};
</script>
