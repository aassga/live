<template>
  <div class="leaderboard-rich" v-loading="loading">
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
        <img class="last-img" src="../../assets/images/checkIcon.png" />{{
          lastData[currentTab].text
        }}榜单
      </div>
    </div>

    <BoardAnchor
      :currentData="tabData[currentTab]"
      :showFollow="false"
      :defaultImg="defaultImg"
    ></BoardAnchor>

    <BoardLast
      :lastData="lastData[currentTab]"
      :showFollow="false"
      :defaultImg="defaultImg"
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
  name: "leaderboardRich",
  data() {
    return {
      currentTab: "day",
      loading: false,
      formData: {
        service: "Contribute.GetUserRankList",
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
    this.getDataDay();
    this.getDataWeek();
    this.getDataMonth();
    this.getLastDataDay();
    this.getLastDataWeek();
    this.getLastDataMonth();

    // TODO click to info 連 js bridge
  },
  methods: {
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
        })
        .catch((err) => {});
    },
    getDataMonth() {
      this.formData.date_type = "this-month";
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
        })
        .catch((err) => {});
    },
    getLastDataDay() {
      this.formData.date_type = "yesterday";
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
        })
        .catch((err) => {});
    },
    getLastDataWeek() {
      this.formData.date_type = "last-week";
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
        })
        .catch((err) => {});
    },
    getLastDataMonth() {
      this.formData.date_type = "last-month";
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
        })
        .catch((err) => {});
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
  },
};
</script>

<style lang="scss" scope>
.leaderboard-rich {
  .tab-bar {
    background: #f66c94;
    position: fixed;
    top: 0rem;
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

      & > img {
        width: 0.7rem;
        margin-right: 0.3rem;
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
        }
        .crown {
          position: absolute;
          width: 4rem;
          top: -23px;
          transform: translateY(-1.5rem);
        }
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
          margin-bottom: 28px;
        }
        .level-thumb {
          height: 16px;
          margin: 0.5rem 0;
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
</style>