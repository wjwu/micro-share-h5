<template>
  <div class="main">
    <div class="hd">
      <div class="avatar"></div>
      <div class="info">
        <div class="name">时光它在沙漏里</div>
        <div class="tag">
          <span class="vip">VIP</span>
          <span class="credit">信用分</span>
        </div>
      </div>
    </div>
    <div class="bd">
      <div class="my">
        <div>我的机器人</div>
        <div>我的微信群</div>
      </div>
      <ul class="menu">
        <li class="menu-info">个人资料</li>
        <li class="menu-partner">我的商伴</li>
        <li class="menu-poster">宣传海报</li>
        <li class="menu-shelves">商品货架</li>
        <li class="menu-books">电子账簿</li>
      </ul>
      <ul class="menu">
        <li class="menu-setup">系统设置</li>
        <li class="menu-service">联系客服</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
html,
body,
.main {
  height: 100%;
}
.main {
  background: #f7f7f7;
  .hd {
    position: relative;
    height: 11.5625rem;
    background: url('./assets/images/timg.jpg') no-repeat;
    background-size: cover;

    &:after {
      content: '';
      width: 100%;
      height: 11.5625rem;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      background-size: inherit;
      filter: blur(3px);
      z-index: 2;
    }
    .avatar {
      position: absolute;
      top: 1.5625rem;
      left: calc(50% - 2.625rem);
      width: 5.25rem;
      height: 5.25rem;
      border-radius: 50%;
      border: 1px solid #fff;
      background: url('./assets/images/timg.jpg') no-repeat;
      background-size: cover;
      z-index: 3;
    }

    .info {
      position: absolute;
      width: 100%;
      top: 7.5rem;
      z-index: 3;
      .name {
        font-size: 1.125rem;
        color: #fff;
        text-align: center;
      }

      .tag {
        display: flex;
        font-size: 0.75rem;
        color: #fff;
        justify-content: center;

        .vip,
        .credit {
          display: inline-block;
          margin: 0 0.3125rem;
          padding: 0 0.5rem;
          text-align: right;
          border-radius: 10px;
        }
        .vip {
          background: url('./assets/images/VIP@3x.png') no-repeat;
          background-size: 1rem 1rem;
          background-position: 0.375rem center;
          background-color: #fc863f;
          width: 3.25rem;
        }

        .credit {
          background: url('./assets/images/credit@3x.png') no-repeat;
          background-size: 1rem 1rem;
          background-position: 0.375rem center;
          background-color: #49c7f6;
          width: 4.375rem;
        }
      }
    }
  }

  .bd {
    .my {
      background: #fff;
      height: 3.75rem;
      padding: 0.625rem;
      display: flex;
      font-size: 1rem;
      color: #222;

      div {
        flex: 1;
        text-align: center;
        padding-top: 1.3rem;
      }

      div:first-of-type {
        border-right: 1px solid #c3c3c3;
        background: url('./assets/images/Robot@3x.png') no-repeat;
        background-size: 1.5rem;
        background-position-x: center;
      }

      div:last-of-type {
        background: url('./assets/images/group@3x.png') no-repeat;
        background-size: 1.5rem;
        background-position-x: center;
      }
    }

    .menu {
      padding-left: 0.9375rem;
      background: #fff;
      margin: 0.9375rem 0;
      border-bottom: 1px solid #e6e6e6;
      border-top: 1px solid #e6e6e6;

      li {
        padding-left: 2.3125rem;
        color: #333;
        font-size: 1rem;
        height: 2.75rem;
        line-height: 2.75rem;
        border-bottom: 1px solid #e6e6e6;
        background: url('./assets/images/Go@3x.png') no-repeat;
        background-size: 1rem;
        background-position: calc(100% - 0.625rem) center;
      }

      li:last-of-type {
        border-bottom: none;
      }

      .menu-info {
        background: url('./assets/images/homepage@3x.png') no-repeat 0 center / 1.5rem;
      }

      .menu-partner {
        background: url('./assets/images/companion@3x.png') no-repeat 0 center / 1.5rem;
      }

      .menu-poster {
        background: url('./assets/images/poster@3x.png') no-repeat 0 center / 1.5rem;
      }

      .menu-shelves {
        background: url('./assets/images/classification@3x.png') no-repeat 0 center / 1.5rem;
      }

      .menu-books {
        background: url('./assets/images/Books@3x.png') no-repeat 0 center / 1.5rem;
      }

      .menu-setup {
        background: url('./assets/images/Syste-setup@3x.png') no-repeat 0 center / 1.5rem;
      }

      .menu-service {
        background: url('./assets/images/service@3x.png') no-repeat 0 center / 1.5rem;
      }
    }
  }
}
</style>


