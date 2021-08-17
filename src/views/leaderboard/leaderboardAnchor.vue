<template>
  <div class="leaderboard-anchor" v-loading="loading">
    <div class="tab-bar flex-row js-space-between">
      <div class="tab-container flex-row">
        <div
          class="tab"
          @click="changeTab('day')"
          :class="{ active: currentTab === 'day' }"
        >
          日榜
        </div>
        <div
          class="tab"
          @click="changeTab('week')"
          :class="{ active: currentTab === 'week' }"
        >
          周榜 
        </div>
        <div
          class="tab"
          @click="changeTab('month')"
          :class="{ active: currentTab === 'month' }"
        >
          月榜
        </div>
      </div>
      <div
        class="lastData flex-row"
        @click="dialogLastDataVisible = !dialogLastDataVisible"
      >
        <div class="last-img">
          <img src="../../assets/images/checkIcon.png" />
        </div>
        {{ lastData[currentTab].text }}榜单
      </div>
    </div>

    <BoardAnchor
      :currentData="tabData[currentTab]"
      :showFollow="true"
      :defaultImg="defaultImg"
      @enterLiveRoom="enterLiveRoom"
      @goToAnchorInfo="goToAnchorInfo"
      @followAnchor="followAnchor"
    ></BoardAnchor>

    <BoardLast
      :lastData="lastData[currentTab]"
      :showFollow="true"
      :defaultImg="defaultImg"
      @followAnchor="followAnchor"
      :dialog-last-data-visible.sync="dialogLastDataVisible"
      :loading="loading"
    ></BoardLast>
  </div>
</template>
<script>
import { getLive } from "@/api";
import BoardLast from "@/components/board/last";
import BoardAnchor from "@/components/board/anchor";
export default {
  name: "leaderboardAnchor",
  data() {
    return {
      currentTab: "day",
      loading: false,
      formData: {
        service: "Contribute.GetHostRankList",
        uid: this.$route.query.uid,
        token: this.$route.query.token,
        date_type: "today", // today/yesterday/this-week/last-week/this-month/last-month
      },
      tabData: {
        day: {
          dataTotal: [],
          dataTop3: [],
        },
        week: {
          dataTotal: [],
          dataTop3: [],
        },
        month: {
          dataTotal: [],
          dataTop3: [],
        },
      },
      lastData: {
        day: {
          dataTotal: [],
          dataTop3: [],
          text: "昨日",
        },
        week: {
          dataTotal: [],
          dataTop3: [],
          text: "上周",
        },
        month: {
          dataTotal: [],
          dataTop3: [],
          text: "上月",
        },
      },
      // 假資料
      emptyData: {
        user_nicename: "虚位以待",
        avatar_thumb: "../../assets/images/zw_head.png",
      },
      defaultImg:
        'this.src="' + require("../../assets/images/zw_head.png") + '"', //默认图地址
      dialogLastDataVisible: false,
    };
  },
  components: {
    BoardLast,
    BoardAnchor,
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.getDataDay();
      this.getDataWeek();
      this.getDataMonth();
      this.getLastDataDay();
      this.getLastDataWeek();
      this.getLastDataMonth();
    },
    getDataDay() {
      this.formData.date_type = "today";
      this.loading = true;
      getLive(this.formData)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.tabData.day.dataTotal = this.checkData(res.data.info);
            this.getDataTop3("day", this.tabData.day.dataTotal, "now");
            this.loading = false;
            return;
          }
          this.$message({
            message: res.message,
            type: "warning",
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getDataWeek() {
      this.formData.date_type = "this-week";
      this.loading = true;
      getLive(this.formData)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.tabData.week.dataTotal = this.checkData(res.data.info);
            this.getDataTop3("week", this.tabData.week.dataTotal, "now");
            this.loading = false;
            return;
          }
          this.$message({
            message: res.message,
            type: "warning",
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getDataMonth() {
      this.formData.date_type = "this-month";
      this.loading = true;
      getLive(this.formData)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.tabData.month.dataTotal = this.checkData(res.data.info);
            this.getDataTop3("month", this.tabData.month.dataTotal, "now");
            this.loading = false;
            return;
          }
          this.$message({
            message: res.message,
            type: "warning",
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getLastDataDay() {
      this.formData.date_type = "yesterday";
      this.loading = true;
      getLive(this.formData)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.lastData.day.dataTotal = this.checkData(res.data.info);
            this.getDataTop3("day", this.lastData.day.dataTotal, "last");
            this.loading = false;
            return;
          }
          this.$message({
            message: res.message,
            type: "warning",
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getLastDataWeek() {
      this.formData.date_type = "last-week";
      this.loading = true;
      getLive(this.formData)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.lastData.week.dataTotal = this.checkData(res.data.info);
            this.getDataTop3("week", this.lastData.week.dataTotal, "last");
            this.loading = false;
            return;
          }
          this.$message({
            message: res.message,
            type: "warning",
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getLastDataMonth() {
      this.formData.date_type = "last-month";
      this.loading = true;
      getLive(this.formData)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.lastData.month.dataTotal = this.checkData(res.data.info);
            this.getDataTop3("month", this.lastData.month.dataTotal, "last");
            this.loading = false;
            return;
          }
          this.$message({
            message: res.message,
            type: "warning",
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    updateData(tab) {
      switch (tab) {
        case "day":
          this.getDataDay();
          this.getLastDataDay();
          break;
        case "week":
          this.getDataWeek();
          this.getLastDataWeek();
          break;
        case "month":
          this.getDataMonth();
          this.getLastDataMonth();
          break;

        default:
          this.getDataDay();
          this.getLastDataMonth();
          break;
      }
    },
    changeTab(tab) {
      this.currentTab = tab;
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    // 確認資料是否小於 30 筆
    checkData(data) {
      const length = data.length;
      let result = [...data];
      return length >= 30 ? result : this.pushEmptyData(result);
    },
    // 未滿 30 筆的資料要補假資料
    pushEmptyData(target) {
      const count = 30 - target.length;
      let result = [...target];
      for (let i = 0; i < count; i++) {
        result.push(this.emptyData);
      }
      return result;
    },
    // 取得前三名資料
    getDataTop3(type, data, kind) {
      let targetData = kind === "now" ? this.tabData : this.lastData;
      targetData[type].dataTop3 = data.slice(0, 3);
    },
    followAnchor(uid) {
      let params = {
        service: "User.SetAttent",
        uid: this.$route.query.uid,
        token: this.$route.query.token,
        touid: uid,
      };
      getLive(params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.$message({
              message:
                res.data.info[0].isattent === "1" ? "已关注" : "已取消关注",
              type: "success",
            });
            this.updateData(this.currentTab);
            return;
          }
          this.$message({
            message: res.message,
            type: "warning",
          });
        })
        .catch((err) => {
          this.$message({
            message: err.message,
            type: "warning",
          });
        });
    },
    goToAnchorInfo(uid) {
      // TODO click to info 連 js bridge
      console.log("goToAnchorInfo uid", uid);
      console.log("goToAnchorInfo checkMobileType", this.checkMobileType());
    },
    enterLiveRoom(is_live, uid) {
      console.log("enterLiveRoom checkMobileType", this.checkMobileType());
      // TODO 連至直播間
      if (!is_live) {
        console.log("enterLiveRoom !is_live", is_live);
        this.goToAnchorInfo(uid);
        return;
      }
    },
    checkMobileType() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        // window.webkit.messageHandlers.popUserWindowHandler.postMessage({
        //   userID: $(this).find(".user_id").text(),
        // });
        return "iOS";
      }
      if (isAndroid) {
        // window.InfoPopup.showInfoFormJs($(this).find(".user_id").text());
        return "android";
      }
    },
  },
};
</script>

<style lang="scss" scope>
.leaderboard-anchor {
  .tab-bar {
    background: #f66c94;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3rem;
    font-size: 14px;
    padding: 0 1rem;
    z-index: 999;

    .tab-container {
      .tab {
        width: 3rem;
        line-height: 1.6rem;
        color: #ea6e9e;
        text-align: center;
        border-radius: 1rem;
        // padding-top: 0.1rem;
        background: #fbcbd9;
        margin: 0 0.3rem;

        &.active {
          background: #fff;
          color: #ea6f9f;
        }
      }
    }
    .lastData {
      font-size: 12px;
      color: #fff;

      .last-img {
        width: 12px;
        height: 12px;
        margin-right: 6px;

        & > img {
          width: 100%;
        }
      }
    }
  }
  .contribute-container {
    .contribute-container-top {
      width: 100%;
      height: 50vh;
      max-height: 340px;
      background: url("../../assets/images/ranking_bg.png") no-repeat top;
      background-size: 100% 100%;

      .fire {
        color: #fff;
        img {
          width: 1.3rem;
          margin-right: 0.2rem;
        }
      }

      .top {
        width: 7rem;
        position: absolute;
        .thumb {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          object-fit: cover;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            display: table;
            background: url("../../assets/images/test_gif.gif") no-repeat top;
            width: 2rem;
            height: 2rem;
          }
        }
        .crown {
          position: absolute;
          width: 4rem;
          top: -23px;
          transform: translateY(-1.5rem);
        }
        // .live-gif {
        //   width: 68px;
        //   height: 68px;
        //   background-repeat: no-repeat;
        //   background-image: url(../../assets/images/live_mask.png);
        //   animation: frame 4000ms steps(1, end) infinite;
        //   position: absolute;
        //   border-radius: 50%;
        //   z-index: 10;
        // }
        .name {
          color: #fff;
          font-size: 14px;
        }
        .name-title {
          font-weight: bold;
        }
        .name-top3 {
          height: 3vh;
          font-size: 13px;
        }
        .level-thumb {
          height: 16px;
          margin: 6px 0 0.5rem 0;
        }
        .follow {
          // padding: .6rem 1.6rem;
          height: 28px;
          width: 68px;
          color: #fff;
          font-size: 14px;
          line-height: 28px;
          background: url("../../assets/images/btn_guanzhu_bg.png") no-repeat center;
          background-size: contain;
        }
      }
      .top-0 {
        left: 50%;
        bottom: 2vh;
        height: 68%;
        transform: translateX(-50%);

        .crown {
          content: url("../../assets/images/my_bang001_ed.png");
          left: 50%;
          transform: translateX(-50%);
        }
        .thumb {
          border: 2px solid #eeb819;
        }
      }
      .top-1 {
        left: 4%;
        bottom: 2vh;
        height: 58%;
        .crown {
          content: url("../../assets/images/my_bang002_ed.png");
          left: 50%;
          transform: translateX(-50%);
        }
        .thumb {
          border: 2px solid #abd5e8;
        }
      }
      .top-2 {
        right: 4%;
        bottom: 2vh;
        height: 58%;
        .crown {
          content: url("../../assets/images/my_bang003_ed.png");
          left: 50%;
          transform: translateX(-50%);
        }
        .thumb {
          border: 2px solid #c89d6a;
        }
      }
    }

    .contribute-container-bottom {
      .list {
        padding: 0 1rem;
        height: 6rem;
        border-bottom: 1px solid #eee;

        .sort {
          color: #c4c4c4;
          font-size: 16px;
          font-weight: bold;
          margin-right: 0.5rem;
        }

        .thumb {
          width: 64px;
          height: 64px;
          border-radius: 50%;
        }

        .level-thumb {
          height: 14px;
        }

        .name {
          color: #262626;
          font-size: 14px;
        }

        .name-behind {
          color: #9F9F9F;
          font-size: 12px;
        }

        .bottom-nickname {
          color: #262626;
          font-size: 16px;
        }

        .follow {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          height: 28px;
          width: 68px;
          color: #fff;
          font-size: 14px;
          line-height: 28px;
          background: url("../../assets/images/btn_guanzhu_bg.png") no-repeat center;
          background-size: contain;
        }

        // .live-gif {
        //   position: absolute;
        //   width: 3rem;
        //   transform: translate(-3.2rem, 0.5rem);
        //   z-index: 10;
        // }
      }
    }
  }

  .el-dialog__wrapper {
    .el-dialog {
      height: 80vh;
      overflow: auto;
      margin-top: 6vh !important;
      .el-dialog__header {
        display: none;
      }
      .el-dialog__body {
        padding: 0 !important;
        .contribute-container {
          padding-top: 0;
        }
      }
    }
  }
}
.live-gif {
  width: 68px;
  height: 68px;
  background-repeat: no-repeat;
  background-image: url(../../assets/images/live_mask.png);
  animation: frame 4000ms steps(1, end) infinite;
  position: absolute;
  border-radius: 50%;
  z-index: 10;
}
@keyframes frame {
  0% {
    background-position: -68px 0;
  }
  1.6% {
    background-position: -68px 0;
  }
  3.2% {
    background-position: -136px 0;
  }
  4.8% {
    background-position: -204px 0;
  }
  6.4% {
    background-position: -272px 0;
  }
  8% {
    background-position: -340px 0;
  }
  9.6% {
    background-position: -408px 0;
  }
  11.2% {
    background-position: -476px 0;
  }
  12.8% {
    background-position: -544px 0;
  }
  14.4% {
    background-position: -612px 0;
  }
  16% {
    background-position: -680px 0;
  }
  17.6% {
    background-position: -748px 0;
  }
  19.2% {
    background-position: -816px 0;
  }
  20.8% {
    background-position: -884px 0;
  }
  22.4% {
    background-position: -952px 0;
  }
  24% {
    background-position: -1020px 0;
  }
  25.6% {
    background-position: -1088px 0;
  }
  27.2% {
    background-position: -1156px 0;
  }
  28.8% {
    background-position: -1224px 0;
  }
  30.4% {
    background-position: -1292px 0;
  }
  32% {
    background-position: -1360px 0;
  }
  33.6% {
    background-position: -1428px 0;
  }
  35.2% {
    background-position: -1496px 0;
  }
  36.8% {
    background-position: -1564px 0;
  }
  38.4% {
    background-position: -1632px 0;
  }
  40% {
    background-position: -1700px 0;
  }
  41.6% {
    background-position: -1768px 0;
  }
  43.2% {
    background-position: -1836px 0;
  }
  44.8% {
    background-position: -1904px 0;
  }
  46.4% {
    background-position: -1972px 0;
  }
  48% {
    background-position: -2040px 0;
  }
  49.6% {
    background-position: -2108px 0;
  }
  51.2% {
    background-position: -2176px 0;
  }
  52.8% {
    background-position: -2244px 0;
  }
  54.4% {
    background-position: -2312px 0;
  }
  56% {
    background-position: -2380px 0;
  }
  57.6% {
    background-position: -2448px 0;
  }
  59.2% {
    background-position: -2516px 0;
  }
  60.8% {
    background-position: -2584px 0;
  }
  62.4% {
    background-position: -2652px 0;
  }
  65.6% {
    background-position: -2720px 0;
  }
  67.2% {
    background-position: -2788px 0;
  }
  68.8% {
    background-position: -2856px 0;
  }
  70.4% {
    background-position: -2924px 0;
  }
  72% {
    background-position: -2992px 0;
  }
  73.6% {
    background-position: -3060px 0;
  }
  75.2% {
    background-position: -3128px 0;
  }
  76.8% {
    background-position: -3196px 0;
  }
  78.4% {
    background-position: -3264px 0;
  }
  80% {
    background-position: -3332px 0;
  }
  81.6% {
    background-position: -3400px 0;
  }
  83.2% {
    background-position: -3468px 0;
  }
  84.8% {
    background-position: -3536px 0;
  }
  86.4% {
    background-position: -3604px 0;
  }
  88% {
    background-position: -3672px 0;
  }
  89.6% {
    background-position: -3740px 0;
  }
  91.2% {
    background-position: -3808px 0;
  }
  92.8% {
    background-position: -3876px 0;
  }
  94.4% {
    background-position: -3944px 0;
  }
  96% {
    background-position: -4012px 0;
  }
  97.6% {
    background-position: -4012px 0;
  }
  99.2% {
    background-position: -4012px 0;
  }
  100% {
    background-position: -4012px 0;
  }
}
</style>