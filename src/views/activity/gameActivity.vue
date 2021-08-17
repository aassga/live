<template>
  <div class="game-activity">
    <div class="banner">
      <ul>
        <li v-for="item in gameData" :key="item.id">
          <img class="banner-img" v-lazy="item.path" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getLive } from "@/api";
import { Loading } from "element-ui";
export default {
  name: "gameActivity",
  data() {
    return {
      loadingInstance: Loading,
      params: {
        service: "Home.GetBanner",
        device_type: 0, // 装置 0:ios/1:android/2:pc/3:h5 由app傳入
        block_id: 6, // 6:我的活动直播banner/7:我的活动游戏banner
        site_id: 1, // app登入時候取得site_id，呼叫webview傳入
      },
      gameData: [],
    };
  },
  mounted() {
    this.getGameData();
  },
  methods: {
    getGameData() {
      this.params.block_id = 7;
      this.loadingInstance.service({
        fullscreen: true,
        spinner: "loading-spinner",
      });
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
  },
};
</script>

<style lang="scss" scope>
.max-heigh{
  max-height: 146px;
}
.game-activity {
  .banner {
    padding: 5px 0;
    ul {
      li {
        padding: 0 7px;
        .banner-img[lazy=loading] {
          border-radius: 16px;
          animation: fadeOut 1.4s;
          width: 10vw !important;
          height: 10vw !important;
          
        }
        .banner-img[lazy=error] {
          border-radius: 16px;
          width: 10vw  !important;
          height: 10vw  !important;
        }
        .banner-img[lazy=loaded]  {
          border-radius: 16px;
          width: 97vw;
          animation: fadeIn 1.4s;
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