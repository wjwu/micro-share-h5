<template>
  <div class="main">
    <div class="banner">
      <div class="menu" @click="handleMenuClick"></div>
    </div>
    <div class="content">
      <h2>招揽英才</h2>
      <p>
        <b>一、助理文员实习生：（实习期3个月）</b>
      </p>
      <p>工作地点：成都郫都区绿地.国际花都写字楼2栋604室。</p>
      <p>年龄：20-25</p>
      <p>性别：女</p>
      <p>学历：大专以上</p>
      <p>工作经验：1年以上同类岗位工作经验</p>
      <p>招聘人数：1-2人</p>
      <p>岗位要求：</p>
      <p>1、 诚实、踏实、细心、工作积极、追求进步。</p>
      <p>2、 积极乐观、性格开朗外向，熟练使用办公软件；有较强文字撰写功底、图片处理技能优先，待遇从优。</p>
      <p>工作内容：</p>
      <p>1、会议文档撰写、整理；</p>
      <p>2、相关工作文档撰写；</p>
      <p>3、公司日常事务处理；</p>
      <p>4、其他一些临时交办事项处理。</p>
      <p>待遇：</p>
      <p>实习期：2500-3500元/月。转正后社保购买，发放通信&交通&就餐补助，生日/法定节日礼品，年终奖，节假日如未遇特殊紧急情况正常休假。</p>
      <br/>
      <p>
        <b>二、客服人员实习生：（实习期3个月）</b>
      </p>
      <p>工作地点：成都郫都区绿地.国际花都写字楼2栋604室。</p>
      <p>年龄：20-25</p>
      <p>性别：女</p>
      <p>学历：大专以上</p>
      <p>工作经验：1年以上同类岗位工作经验</p>
      <p>招聘人数：若干人</p>
      <p>岗位要求：</p>
      <p>1、 诚实、踏实、细心、工作积极、追求进步。</p>
      <p>2、 积极乐观、性格开朗外向、计算机&手机操作熟练。</p>
      <p>工作内容：</p>
      <p>1、耐心解答客户疑惑，帮助客户正确使用公司产品；</p>
      <p>2、处理公司相关业务流程电子申请单；</p>
      <p>3、其他一些灵活调配工作事项。</p>
      <p>待遇：</p>
      <p>实习期：3000-4000元/月。转正后社保购买，发放通信&交通&就餐补助，生日/法定节日礼品，季度绩效奖金，年底双薪，会有灵活加班安排。</p>
      <br/>
      <p>招聘简历发送邮箱地址：
        <a href="javascript:;">COM.NET@SOHU.COM</a>，请标题备注：应聘+岗位名称。</p>
    </div>
    <div class="footer">
      <p>成都鹅卵石信息技术有限公司</p>
      <p> Copyright © 2019 蜀ICP备18026087号</p>
    </div>
  </div>
</template>

<script>
import weui from 'weui.js';
import '../common/js/share';

export default {
  methods: {
    handleJump(url) {
      window.location.href = url;
    },
    handleMenuClick() {
      weui.actionSheet(
        [
          {
            label: '首页',
            onClick: function() {
              window.location.href = '/';
            }
          },
          {
            label: '关于我们',
            onClick: function() {
              window.location.href = '/about.html';
            }
          },
          {
            label: '联系我们',
            onClick: function() {
              window.location.href = '/contact.html';
            }
          },
          {
            label: '招揽英才',
            onClick: function() {
              window.location.href = '/job.html';
            }
          }
        ],
        [
          {
            label: '取消',
            onClick: function() {}
          }
        ]
      );
    }
  }
};
</script>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
}

.banner {
  height: 10rem;
  background: url('./assets/images/product.jpg') no-repeat center 0 / cover;

  .menu {
    width: 2.125rem;
    height: 1.625rem;
    position: absolute;
    right: 1.375rem;
    top: 1.3125rem;
    background: url('./assets/images/menu@2x.png') no-repeat 50% / cover;
  }
}

.content {
  flex: 1;
  padding-bottom: 2rem;
  h2 {
    padding: 2rem 0;
    color: #333;
    text-align: center;
  }
  p {
    padding: 0 1rem;
    line-height: 1.5rem;
    font-size: 0.875rem;
    color: #999;
  }
}

.footer {
  width: 100%;
  height: 4.375rem;
  text-align: center;
  font-size: 0.5625rem;
  color: #555;
  background-color: #ebebeb;
  line-height: 0.9375rem;
  p:first-of-type {
    padding-top: 1.4375rem;
  }
}
</style>


