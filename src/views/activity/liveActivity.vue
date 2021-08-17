<template>
  <div class="live-activity">
    <div class="banner">
      <ul>
        <li v-for="item in liveData" :key="item.id">
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
  name: "liveActivity",
  data() {
    return {
      loadingInstance: Loading,
      params: {
        service: "Home.GetBanner",
        device_type: 0, // 装置 0:ios/1:android/2:pc/3:h5 由app傳入
        block_id: 6, // 6:我的活动直播banner/7:我的活动游戏banner
        site_id: 1, // app登入時候取得site_id，呼叫webview傳入
      },
      liveData: [],
    };
  },
  mounted() {
    this.getLiveData();
  },
  methods: {
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
.live-activity {
  .banner {
    padding: 5px 0;
    ul {
      li {
        padding: 0 7px;
        .banner-img[lazy=loading] {
          border-radius: 16px;
          animation: fadeOut 1s;
          width: 10vw;
          height: 10vw;
        }
        .banner-img[lazy=error] {
          border-radius: 16px;
          width: 10vw;
          height: 10vw;
        }
        .banner-img[lazy=loaded]  {
          border-radius: 16px;
          animation: fadeIn 1.4s;
          width: 97vw;
          max-height: 125px;
        }
        
      }
    }
  }
}
</style>