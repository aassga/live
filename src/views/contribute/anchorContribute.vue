<template>
  <div class="anchor-contribute" v-loading="loading">
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
        <div
          class="tab"
          @click="changeTab('total')"
          :class="{ active: currentTab === 'total' }"
        >
          总榜
        </div>
      </div>
      <router-link class="leaderboard hide" :to="{ name: 'leaderboard' }">
        排行榜
      </router-link>
    </div>
    <anchorContributeRank
      :data="tabData[currentTab]"
      :defaultImg="defaultImg"
    ></anchorContributeRank>
  </div>
</template>
<script>
import anchorContributeRank from "./anchorContributeRank";
import { getLive } from "@/api";
export default {
  name: "anchorContribute",
  components: {
    anchorContributeRank,
  },
  data() {
    return {
      show: true,
      currentTab: "day",
      loading: false,
      formData: {
        service: "Contribute.GetRankList",
        uid: this.$route.query.uid,
        token: this.$route.query.token,
      },
      tabData: {
        day: {
          dataTotal: [],
          dataTop3: [],
          dataFire: 0,
        },
        week: {
          dataTotal: [],
          dataTop3: [],
          dataFire: 0,
        },
        month: {
          dataTotal: [],
          dataTop3: [],
          dataFire: 0,
        },
        total: {
          dataTotal: [],
          dataTop3: [],
          dataFire: 0,
        },
      },
      // 假資料
      emptyData: {
        userinfo: {
          user_nicename: "虚位以待",
          avatar_thumb: "../../assets/images/zw_head.png",
        },
      },
      defaultImg:
        'this.src="' + require("../../assets/images/zw_head.png") + '"', //默认图地址
    };
  },
  mounted() {
    this.getData(this.formData);
  },
  methods: {
    getData(params) {
      this.loading = true;
      getLive(params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.tabData.day.dataTotal = this.checkData(res.data.info.list_day);
            this.tabData.week.dataTotal = this.checkData(
              res.data.info.list_week
            );
            this.tabData.month.dataTotal = this.checkData(
              res.data.info.list_month
            );
            this.tabData.total.dataTotal = this.checkData(
              res.data.info.list_all
            );

            this.getDataTop3("day", this.tabData.day.dataTotal);
            this.getDataTop3("week", this.tabData.week.dataTotal);
            this.getDataTop3("month", this.tabData.month.dataTotal);
            this.getDataTop3("total", this.tabData.total.dataTotal);

            this.tabData.day.dataFire = res.data.info.list_day_total;
            this.tabData.week.dataFire = res.data.info.list_week_total;
            this.tabData.month.dataFire = res.data.info.list_month_total;
            this.tabData.total.dataFire = res.data.info.list_all_total;
            this.loading = false;
            return;
          }
          this.$alert(`${res.message}`, "温馨提示", {
            confirmButtonText: "確定",
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
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
    getDataTop3(type, data) {
      this.tabData[type].dataTop3 = data.slice(0, 3);
    },
  },
};
</script>

<style lang="scss" scope>
.anchor-contribute {
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
        background: #fbcbd9;
        margin: 0 0.3rem;

        &.active {
          background: #fff;
          color: #ea6f9f;
        }
      }
    }
    .leaderboard {
      text-decoration: none;
      color: #fff;
    }
  }

  .contribute-container {
    padding-top: 3rem;

    .contribute-container-top {
      width: 100%;
      height: 60vh;
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
          border-radius: 50%;
          object-fit: contain;
          margin-bottom: 2rem;
        }
        .level-thumb {
          width: 2.5rem;
          margin: 0.5rem 0;
        }
        .crown {
          position: absolute;
          width: 4rem;
          top: -1.3rem;
        }

        .name {
          color: #fff;
          font-size: 14px;
        }
      }
      .top-0 {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .crown {
          content: url("../../assets/images/my_bang001_ed.png");
        }
        .thumb {
          border: 2px solid #eeb819;
        }
      }
      .top-1 {
        left: 4%;
        top: 38%;
        .crown {
          content: url("../../assets/images/my_bang002_ed.png");
        }
        .thumb {
          border: 2px solid #abd5e8;
        }
      }
      .top-2 {
        right: 4%;
        top: 38%;
        .crown {
          content: url("../../assets/images/my_bang003_ed.png");
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
        }

        .thumb {
          width: 4rem;
          border-radius: 50%;
          margin: 0 1rem 0 2rem;
        }
        .level-thumb {
          width: 2.5rem;
          margin: 0 0 0.2rem 0.1rem;
        }

        .name {
          color: #606160;
          font-size: 14px;
          text-align: left;
        }
      }
    }
  }
}
</style>