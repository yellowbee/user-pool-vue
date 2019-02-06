<template>
  <transition name="slide">
  <div class="find">
    <div class="find-wrapper" ref="wrapper">
      <div class="find-content">
        <router-link tag="div" class="friend-circle" to="/find/friendcircle">
          <img class="find-img" src="../../assets/find/朋友圈.png" />
          <span class="find-item">朋友圈</span>
        </router-link>
        <router-link tag="div" class="friend-circle" @click="warn" to="/find/scan">
          <img class="find-img" src="../../assets/find/扫一扫.png" />
          <span class="find-item">扫一扫</span>
        </router-link>
        <router-link tag="div" class="friend-circle" @click="warn" to="/find/shake">
          <img class="find-img" src="../../assets/find/摇一摇.png" />
          <span class="find-item">摇一摇</span>
        </router-link>
        <a href="https://caochangkui.github.io/game_PinTu/index.html" title="京东商城" style="text-decoration: none;color:#000;">
          <div class="friend-circle">
            <img class="find-img" src="../../assets/find/附近的人.png" />
            <span class="find-item">游戏</span>
          </div>
        </a>
        <a href="https://m.jd.com" title="京东商城" style="text-decoration: none;color:#000;">
          <div class="friend-circle">
            <img class="find-img" src="../../assets/find/购物.png" />
            <span class="find-item" style="">购物</span>
          </div>
        </a>
        
        <div class="friend-circle" @click="littleApp">
          <img class="find-img" src="../../assets/find/小程序.png" />
          <span class="find-item">小程序</span>
        </div>         
      </div>
      <router-view></router-view>
    </div>
  </div>
  </transition>
</template>

<script>
</script>

<style scoped>
  .find{
    position: fixed;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(238,233,233,0.6);
  }
  .find-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .find-content{
    overflow: hidden;
  }
  .friend-circle{
    display: flex;
    align-items: center;
    left: 0;
    height: 30px;
    padding: 8px 10px;
    margin-top: 10px;
    background-color: #fff;
  }
  .find-img{
    height: 20px;
    width: 20px;
    padding-right: 20px;
  }

  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
     
</style>
