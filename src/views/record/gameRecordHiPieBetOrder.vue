<template>
  <div class="game-record-hi-pie-bet-order">
    <div class="tab-container">
      <div class="tab-bar w-100 flex-row js-flex-start">
        {{ dayTab[this.$route.query.dayType] }}
      </div>
      <div class="total-container flex-row js-flex-start">
        <div class="item">下注总金额： {{ allBetAmount }}</div>
        <div class="item">中奖总金额：{{ allWinAmount }}</div>
      </div>
    </div>
    <div class="list-container">
      <div
        class="list flex-column"
        v-for="(record, index) in tableData.length ? tableData : 0"
        @click="more(record)"
        :key="index"
      >
        <div class="list-top flex-row js-space-between w-100">
          <div class="game-name">
            {{ record.platform }}-{{ record.gameName }}
          </div>
        </div>
        <div class="game-info flex-row js-flex-start w-100">
          <div class="info flex-column al-flex-start">
            <span class="order-bet-text">下单金額</span>
            <span class="mt-05 order-bet-num">¥{{ record.betAmount }}</span>
          </div>
          <div class="info flex-column al-flex-start">
            <span class="winning-text">中奖金额</span>
            <span class="mt-05" :class="profitOrLoss(record.netAmount)"
              >¥{{ record.netAmount }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBetRecordList } from "@/api";
import moment from "moment";
export default {
  name: "gameRecordHiPieBetOrder",
  data() {
    return {
      allWinAmount: 0,
      allBetAmount: 0,
      tableData: [],
      dayTab: {
        today: "今天",
        yesterday: "昨天",
      },
    };
  },
  mounted() {},
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    },
    more(record) {
      this.$router.push({
        path: "/gameRecordHiPieBetDetail",
        query: record,
      });
    },
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
  },
  watch: {
    "$route.query": {
      handler: function (val, oldVal) {
        const date =
          val.dayType === "today"
            ? moment().format("YYYY-MM-DD")
            : moment().subtract(1, "days").format("YYYY-MM-DD");
        const params = {
          game_class: val.gameclass,
          game_platform: val.gameplatform === "null" ? "" : val.gameplatform,
          date,
        };
        getBetRecordList(params)
          .then((res) => {
            this.allWinAmount = res.data.data.amount.total_win || 0;
            this.allBetAmount = res.data.data.amount.total_bet || 0;
            this.tableData = res.data.data.list;
          })
          .catch((e) => {
            this.$message({
              message: e.message,
              type: "warning",
            });
          });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scope>
.game-record-hi-pie-bet-order {
  background: #f7f6fc;
}
.tab-container {
  background: #f7f6fc;
}
.tab-bar {
  margin: 0 1rem;
  padding: 0.5rem 0;
  font-size: 18px;
}
.total-container {
  font-size: 12px;
  color: #b4b7c1;
  .item {
    margin: 0.2rem 1rem;
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
    margin-bottom: 0.1rem;

    .list-top {
      height: 2rem;
      .game-name {
        font-size: 14px;
        font-weight: 400;
        color: #4b5059 !important;
      }
    }
    .game-info {
      margin: 1rem 0;

      .info {
        width: 33%;

        .winning-num {
          color: #75be04;
        }
      }
    }
  }
}
</style>
