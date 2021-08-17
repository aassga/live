<template>
  <div class="bottom-container relative">
    <div class="list-container">
      <!--  v-show="currentTab === 'lottery'" -->
      <div class="type-tab-bar w-100 flex-row">
        <template v-if="checkDateType">
          <div
            class="type-tab flex-row"
            :class="{ active: currentLotteryTypeTab === type.status }"
            v-for="type in lotteryTypes"
            :key="type.name"
            @click="changeLotteryType(type)"
          >
            {{ type.name }}
          </div>
        </template>
      </div>
      <div v-if="checkDateType">
        <div
          v-for="(record, index) in lotteryRecordData"
          :key="index"
          class="record-container"
        >
          <div class="left">
            <div>
              {{ record.platform }}
            </div>
            <div>{{ record.lotteryName }}:{{ record.playwayName }}</div>
            <div class="issue">
              第{{
                String(record.issue).slice(String(record.issue).length - 2)
              }}期 投注: {{ record.betAmount }}
            </div>
          </div>
          <div class="right">
            <div class="time">
              {{ record.betTime | datefilter }}
            </div>
            <div
              v-if="record.netAmount"
              :class="profitOrLoss(record.netAmount)"
            >
              {{ record.netAmount }}
            </div>
            <div>
              {{ statusFormat(record.status) }}
            </div>
          </div>
        </div>
        <!-- 如果無數據  v-if="lotteryData.length === 0" -->
        <div class="data-list" v-if="lotteryRecordData.length === 0">
          <div class="no-data flex-column w-100">
            <img src="../../assets/images/sorry_no_data.png" />
            暂无数据
          </div>
        </div>
      </div>
      <div v-else>
        <el-table
          @row-click="goToDetailDate"
          v-if="lotteryRecordData.length !== 0"
          :data="lotteryRecordData"
        >
          <el-table-column min-width="20%" prop="deposit_amount" label="时间">
            <template slot-scope="scope">
              <div>
                {{ scope.row.date ? scope.row.date.date.slice(5) : "" }}
              </div>
              <div>{{ scope.row.date ? scope.row.date.week : "" }}</div>
            </template>
          </el-table-column>
          <el-table-column min-width="20%" prop="deposit_amount" label="笔数">
            <template slot-scope="scope">
              <div>{{ scope.row ? scope.row.bet_count : "" }}</div>
            </template>
          </el-table-column>
          <el-table-column min-width="25%" prop="deposit_amount" label="下注">
            <template slot-scope="scope">
              <div>{{ scope.row ? scope.row.bet_amount : "" }}</div>
            </template>
          </el-table-column>
          <el-table-column min-width="25%" prop="deposit_amount" label="输赢">
            <template slot-scope="scope">
              <div>{{ scope.row ? scope.row.bet_win_amount : "" }}</div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 如果無數據 -->
        <div class="data-list" v-if="lotteryRecordData.length === 0">
          <div class="no-data flex-column w-100">
            <img src="../../assets/images/sorry_no_data.png" />
            暂无数据
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { Loading } from "element-ui";
import { getBetRecordList, getBetRecordListAll } from "@/api";
export default {
  name: "c-record-lottery",
  props: {
    currentDate: {
      default: "",
    },
    currentTab: {
      default: "",
    },
  },
  data() {
    return {
      loadingInstance: Loading,
      lotteryRecordData: [],
      currentLotteryTypeTab: "",
      lotteryTypes: [
        {
          name: "全部",
          status: "",
        },
        {
          name: "贏",
          status: 1,
        },
        {
          name: "输",
          status: 2,
        },
      ],
    };
  },
  filters: {
    datefilter(data) {
      return moment.unix(data).format("MM-DD HH:mm:ss");
    },
  },
  watch: {
    currentTab: {
      handler: function (val, oldVal) {
        const checkType = ["today", "yesterday"];
        this.loadingInstance.service({
          fullscreen: true,
        });
        if (checkType.includes(this.currentDate.value)) {
          const params = {
            date: this.currentDate.time_start,
            game_class: val,
          };
          getBetRecordList(params)
            .then((res) => {
              this.lotteryRecordData = res.data.data.list;
              this.loadingInstance.service().close();
            })
            .catch((e) => {
              this.loadingInstance.service().close();
            });
        } else {
          const data = {
            time_start: this.currentDate.time_start,
            time_end: this.currentDate.time_end,
            type: 0,
            class: 0,
          };
          getBetRecordListAll(data).then((res) => {
            this.lotteryRecordData = res.data.list;
            this.loadingInstance.service().close();
          });
        }
      },
    },
    currentDate: {
      handler: function (val, oldVal) {
        const checkType = ["today", "yesterday"];
        this.loadingInstance.service({
          fullscreen: true,
        });
        if (checkType.includes(val.value)) {
          const params = {
            date: val.time_start,
            game_class: this.currentTab,
          };
          getBetRecordList(params)
            .then((res) => {
              this.lotteryRecordData = res.data.data.list;
              this.loadingInstance.service().close();
            })
            .catch((e) => {
              this.loadingInstance.service().close();
            });
        } else {
          const data = {
            time_start: val.time_start,
            time_end: val.time_end,
            type: 0,
            class: 0,
          };
          getBetRecordListAll(data)
            .then((res) => {
              this.lotteryRecordData = res.data.list;
              this.loadingInstance.service().close();
            })
            .catch((e) => {
              this.loadingInstance.service().close();
            });
        }
        this.loadingInstance.service().close();
      },
      immediate: true,
    },
  },
  computed: {
    checkDateType() {
      const checkType = ["today", "yesterday"];
      if (checkType.includes(this.currentDate.value)) {
        return true;
      }
      return false;
    },
  },
  methods: {
    statusFormat(status) {
      const statusMap = {
        0: "未结算",
        1: "赢",
        2: "输",
        3: "和",
        4: "测单",
        5: "取消",
      };
      return statusMap[status] || "";
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
    goToDetailDate(row, event, column) {
      this.$router.push(
        `/gamerecordOneDay?date=${row.date.date}&gameType=${this.currentTab}`
      );
    },
    changeLotteryType(type) {
      this.currentLotteryTypeTab = type.status;
      const checkType = ["today", "yesterday"];
      this.loadingInstance.service({
        fullscreen: true,
      });
      if (checkType.includes(this.currentDate.value)) {
        const params = {
          date: this.currentDate.time_start,
          game_class: "lottery",
          status: type.status,
        };
        getBetRecordList(params)
          .then((res) => {
            this.lotteryRecordData = res.data.data.list;
            this.loadingInstance.service().close();
          })
          .catch((e) => {
            this.loadingInstance.service().close();
          });
      } else {
        // 防呆 不會進來這裡
        const data = {
          time_start: this.currentDate.time_start,
          time_end: this.currentDate.time_end,
          type: 0,
          class: 1,
        };
        getBetRecordListAll(data)
          .then((res) => {
            this.lotteryRecordData = res.data.data.list;
            this.loadingInstance.service().close();
          })
          .catch((e) => {
            this.loadingInstance.service().close();
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.record-container {
  display: flex;
  flex-direction: row;
  margin: 0.1rem 0.5rem 0rem 0.5rem;
  padding: 0.8rem;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: column;
    text-align: left;
    .issue {
      color: #888888;
    }
    div {
      margin-top: 16px;
    }
  }
  .right {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    text-align: right;
    .time {
      color: #888888;
    }
    div {
      margin-top: 16px;
    }
  }
}
.bottom-container {
  width: 91vw;
  height: 82vh;
  margin: 0 auto;
  padding: 1rem;
  background: #f7f6fc;

  .list-container {
    background: #fff;
    height: calc(100vh - 7rem);
    overflow: auto;
    border-radius: 0.3rem;

    .type-tab-bar {
      border-bottom: 1px solid #eee;

      .type-tab {
        width: 25%;
        height: 2.5rem;
        color: #666666;

        &.active {
          color: #fff;
          background: #00bdd4;
        }
      }
    }

    .data-list {
      .no-data {
        // position: absolute;
        // top: 50%;
        // transform: translateY(-50%);

        img {
          width: 100%;
          margin: 4rem 0 1rem 0;
        }
      }
    }
  }

  .box-amount {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    height: 3rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    padding: 0 1rem;
  }
}
</style>