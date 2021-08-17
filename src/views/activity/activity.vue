<template>
  <div class="activity">
    <div class="header-bar">
      <ul>
        <li
          class=""
          :class="{ active: currentTab === 'live' }"
          @click="changeTab('live')"
        >
          直播活动
        </li>
        <li
          class=""
          :class="{ active: currentTab === 'game' }"
          @click="changeTab('game')"
        >
          游戏活动
        </li>
      </ul>
    </div>
    <div class="banner" v-show="currentTab === 'live'">
      <ul>
        <li v-for="item in liveData" :key="item.id">
          <img class="banner-img" v-lazy="item.path" alt="" />
        </li>
      </ul>
    </div>

    <div class="banner" v-show="currentTab === 'game'">
      <ul>
        <li v-for="item in gameData" :key="item.id">
          <div class="banner-i">
            <img class="banner-img" v-lazy="item.path" alt="" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getLive } from "@/api";
import { Loading } from "element-ui";
export default {
  name: "activity",
  data() {
    return {
      loadingInstance: Loading,
      currentTab: "live",
      params: {
        service: "Home.GetBanner",
        device_type: 0, // 装置 0:ios/1:android/2:pc/3:h5 由app傳入
        block_id: 6, // 6:我的活动直播banner/7:我的活动游戏banner
        site_id: 1, // app登入時候取得site_id，呼叫webview傳入
      },
      liveData: [],
      gameData: [],
    };
  },
  mounted() {
    this.getLiveData();
    this.$Lazyload.$on('loaded', this.onloadStatusCheck)
  },
  methods: {
    onloadStatusCheck(e){
    },
    goBack() {
      this.$router.go(-1);
    },
    getLiveData() {
      this.loadingInstance.service({
        fullscreen: true,
        customClass: "loading",
        spinner: "loading-spinner",
      });
      this.params.block_id = 6;
      getLive(this.params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.liveData = res.data.info;
            this.getGameData();
          }else{
            this.loadingInstance.service().close();
          }
          
        })
        .catch((err) => {
          this.loadingInstance.service().close();
          console.log(err);
        });
    },
    getGameData() {
      this.params.block_id = 7;
      getLive(this.params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.gameData = res.data.info;
          }
          this.loadingInstance.service().close();
        })
        .catch((err) => {
          console.log(err);
          this.loadingInstance.service().close();
        });
    },
    changeTab(tab) {
      this.currentTab = tab;
    }
  },
};
</script>

<style lang="scss" scope>
.activity {
  .header-bar {
    display: flex;
    padding: 1em;
    border-bottom: 1px solid #ececec;
    align-items: center;
    ul {
      display: flex;
      align-items: center;
      li {
        padding: 0 2em 0 2.8em;
        font-size: 17px;
        font-weight: 600;
        color: rgb(73, 73, 73);
      }
      .active {
        font-size: 20px;
        font-weight: 600;
        color: rgb(73, 73, 73);
        &:after {
          display: block;
          content: "";
          width: 1.5em;
          height: 3px;
          background-color: #ff9a8b;
          background-image: linear-gradient(
            90deg,
            #ff9a8b 0%,
            #ff6a88 55%,
            #ff99ac 100%
          );
          border-radius: 30%;
          margin: 0 auto;
          margin-top: 2px;
        }
      }
    }
  }
  .banner {
    padding: 5px 0;
    ul {
      li {
        padding: 0 7px;
        .banner-img[lazy=loading] {
          border-radius: 17px;
          animation: fadeOut 1s;
          width: 10vw ;
          height: 10vw ;
        }
        .banner-img[lazy=error] {
          border-radius: 17px;
          width: 10vw ;
          height: 10vw  ;
        }
        .banner-img[lazy=loaded]  {
          border-radius: 17px;
          animation: fadeIn 1.2s;
          width: 97vw;
          max-height: 125px;
        }
      }
    }
  }
}

.loading {
  img {
    width: 100px !important;
    height: 100px;
  }
}
</style>