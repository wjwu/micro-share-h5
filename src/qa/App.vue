<template>
  <div class="main">
    <ul>
      <li class="service">
        <div class="name">xxx客服</div>
        <div class="content">
          <div class="text">
            <p>
              <a href="javascript:;">你好好啊你好好啊你好好啊你好好啊啊</a>
            </p>
            <p>
              <a href="javascript:;">你好好啊你好好啊你好好啊你好好好啊</a>
            </p>
            <p>
              <a href="javascript:;">33333你好好啊你好好啊你33333</a>
            </p>
            <p>
              <a href="javascript:;">33333你好好啊你好好啊你33333</a>
            </p>
            <p>
              <a href="javascript:;">33333你好好啊你好好啊你33333</a>
            </p>
          </div>
        </div>
        <div class="time">2018-08-08 19:56:44</div>
      </li>
      <li class="customer">
        <div class="name">王老五</div>
        <div class="content">
          <div class="text">
            <p>
              33333你好好啊你好好啊你33333
            </p>
          </div>
        </div>
        <div class="time">2018-08-08 19:56:44</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss">
body {
  background-color: #f6f6f6;
}
.main {
  font-size: 0.875rem;

  ul {
    padding: 1rem;

    li {
      margin: 1rem 0;
    }
  }

  .service {
    .name {
      padding-left: 4.25rem;
      color: #ccc;
    }

    .content {
      position: relative;
      min-height: 3.75rem;
      padding-left: 4.25rem;
      background: url('./assets/images/head.png') no-repeat 0 0/3.125rem;

      &:before {
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        border-width: .5rem;
        border-style: solid;
        border-color:transparent #fff transparent transparent;
      }

      .text {
        margin: 0.5rem 0;
        background-color: #fff;
        padding: 0.3rem 0.5rem;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        a {
          color: #295af3;
        }
        p {
          line-height: 1.2rem;
        }
      }
    }
  }

  .time {
    font-size: 0.75rem;
    color: #ccc;
    text-align: center;
  }

  .customer {
    .name {
      text-align: right;
      color: #ccc;
    }

    .content {
      min-height: 3.75rem;
      padding-right: 4.25rem;
      background: url('./assets/images/user@2x.png') no-repeat right 0/3.75rem;

      .text {
        margin: 0.5rem 0;
        background-color: #fff;
        padding: 0.3rem 0.5rem;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        a {
          color: #295af3;
        }
        p {
          line-height: 1.2rem;
        }
      }
    }
  }
}
</style>
