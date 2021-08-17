<template>
  <div class="game-record-hi-pie">
    <div class="tab-bar w-100 flex-row">
      <div
        class="tab"
        @click="changeTab('today')"
        :class="{ active: currentTab === 'today' }"
      >
        今日
      </div>
      <div
        class="tab"
        @click="changeTab('yesterday')"
        :class="{ active: currentTab === 'yesterday' }"
      >
        昨日
      </div>
    </div>
    <div class="total-container flex-row js-space-between">
      <div class="item">下注总金额： {{ allBetAmount }}</div>
      <div class="item">中奖总金额： {{ allWinAmount }}</div>
    </div>

    <div class="list-container">
      <div
        class="list flex-column"
        v-for="(list, index) in tabData"
        @click="more(list)"
        :key="index"
      >
        <div class="list-top flex-row js-space-between w-100">
          <div class="game-name">
            <img v-lazy="`${$store.state.pictureDomain}${list.imagePath}`" />
            <span>
              {{ list.platformName }}
            </span>
          </div>
          <div class="more">更多></div>
        </div>
        <div class="game-info flex-row js-flex-start w-100">
          <div class="info flex-column al-flex-start">
            <span class="order-bet-text">下单注量</span>
            <span class="mt-05 order-bet-num">{{ list.betTotal }}</span>
          </div>
          <div class="info flex-column al-flex-start">
            <span class="order-amount-text">下单金额</span>
            <span class="mt-05 order-amount-num">¥{{ list.betAmount }}</span>
          </div>
          <div class="info flex-column al-flex-start">
            <span class="winning-text">中奖金额</span>
            <span class="mt-05" :class="profitOrLoss(list.winAmount)"
              >¥{{ list.winAmount }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { getGroupBetRecordList } from "@/api";
export default {
  name: "gameRecordHiPie",
  data() {
    return {
      allWinAmount: 0,
      allBetAmount: 0,
      currentTab: "today",
      todayData: [],
      yesterdayData: [],
      tabData: {},
    };
  },
  mounted() {},
  methods: {
    profitOrLoss(payAmount) {
      if (payAmount < 0) {
        return {
          redAmount: true,
        };
      } else {
        return {
          greenAmount: true,
        };
      }
    },
    changeTab(tab) {
      this.currentTab = tab;
    },
    more(list) {
      this.$router.push(
        `/gameRecordHiPieBetOrder?gameclass=${list.game_class}&gameplatform=${list.game_platform}&dayType=${this.currentTab}`
      );
    },
  },
  watch: {
    currentTab: {
      handler: function (val, oldVal) {
        if (val === "today") {
          const params = {
            date: moment().format("YYYY-MM-DD"),
          };
          getGroupBetRecordList(params)
            .then((res) => {
              this.tabData = res.data.list || [];
              this.allBetAmount = res.data.allBetAmount;
              this.allWinAmount = res.data.allWinAmount;
            })
            .catch((e) => {
              this.$message({
                message: e.message,
                type: "warning",
              });
            });
        } else {
          const params = {
            date: moment().subtract(1, "days").format("YYYY-MM-DD"),
          };
          getGroupBetRecordList(params)
            .then((res) => {
              this.tabData = res.data.list || [];
              this.allBetAmount = res.data.allBetAmount || 0;
              this.allWinAmount = res.data.allWinAmount || 0;
            })
            .catch((e) => {
              this.$message({
                message: e.message,
                type: "warning",
              });
            });
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scope>
.game-record-hi-pie {
  .tab-bar {
    background: #fff;
    height: 55px;
    font-size: 15px;

    .tab {
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      line-height: 55px;
      color: rgba(32, 36, 47, .6);
      text-align: center;
      font-weight: bold;
      border-top: 1px solid #e4e4e4;

      &.active {
        color: rgba(32, 36, 47, 1);
        border-bottom: 2px solid #e9655e;
      }
    }
  }

  .total-container {
    font-size: 14px;
    font-weight: bold;
    padding: 0 30px;
    background: rgb(246, 245, 251);
    height: 38px;
    align-items: center;

    .item {
      color: rgb(176, 179, 188);
      line-height: 20px;
    }
  }

  .list-container {
    background: #f7f6fc;
    height: calc(100vh - 4rem);
    overflow: auto;

    .list {
      padding: 0 1rem;
      font-size: 12px;
      color: #b4b7bf;
      background: #fff;
      margin-bottom: 0.5rem;

      .list-top {
        height: 2rem;
        border-bottom: 1px solid #eee;
        margin: 10px 0;
        .game-name {
          font-size: 16px;
          font-weight: 400;
          color: #4b5059 !important;
          font-weight: 900;
          display: flex;
          align-items: center;
          img {
            width: 29px;
            height: 29px;
            margin-right: 0.5rem;
          }
        }
        .more{
          font-size: 14px;
        }
      }
      .game-info {
        font-size: 16px;
        color: black;
        margin: 1rem 0;
        .order-bet-text{
          font-size: 14px;
          color: #b4b7bf;
        }
        .order-amount-text{
          font-size: 14px;
          color: #b4b7bf;
        }
        .winning-text{
          font-size: 14px;
          color: #b4b7bf;
        }
        .info {
          width: 33%;

          .winning-num {
            color: #75be04;
          }
        }
      }
    }
  }
}
</style>
