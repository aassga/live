<template>
  <div class="consume-income-detail">
    <div class="tab-bar w-100 flex-row">
      <div
        class="tab"
        @click="changeTab('consume')"
        :class="{ active: currentTab === 'consume' }"
      >
        <div class="relative tab-text">消费明细</div>
        <span class="underline" v-show="currentTab === 'consume'"></span>
      </div>
      <div
        class="tab"
        @click="changeTab('income')"
        :class="{ active: currentTab === 'income' }"
      >
        <div class="relative tab-text">收入明细</div>
        <span class="underline" v-show="currentTab === 'income'"></span>
      </div>
    </div>

    <div class="container" v-show="currentTab === 'consume'">
      <div class="top w-100 flex-row relative">
        <!-- <div class="text">今日支出0金币</div> -->
        <div class="date-container flex-row">
          <el-date-picker
            class="date-picker-consume"
            v-model="params.start_time"
            type="date"
            :clearable="false"
            size="mini"
            format="M月dd日"
            placeholder="选择日期"
            @change="changeStartTime($event)"
          >
          </el-date-picker>
          <div class="arrow-icon"></div>
        </div>
      </div>
      <el-table
        v-if="tableData.length !== 0"
        v-loading="loading"
        :data="tableData"
        header-align="center"
      >
        <!-- <el-table-column
          align="center"
          min-width="15%"
          prop="action"
          label="ID"
        >
        </el-table-column> -->
        <el-table-column
          align="center"
          min-width="25%"
          prop="action_name"
          label="动作"
        >
        </el-table-column>
        <el-table-column
          align="center"
          min-width="30%"
          prop="addtime"
          label="购买时间"
        >
        </el-table-column>
        <el-table-column
          align="center"
          min-width="15%"
          prop="totalcoin"
          label="总金额"
        >
        </el-table-column>
      </el-table>
      <!-- 如果無數據 -->
      <div class="data-list" v-else>
        <div class="no-data flex-column w-100">
          <img src="../../assets/images/no_content.png" />
          暂无数据
        </div>
      </div>
    </div>

    <div class="container" v-show="currentTab === 'income'">
      <div class="top w-100 flex-row relative">
        <!-- <div class="text">今日收入0金币</div> -->
        <div class="date-container flex-row">
          <el-date-picker
            class="date-picker-consume"
            v-model="params.start_time"
            type="date"
            :clearable="false"
            size="mini"
            format="M月dd日"
            placeholder="选择日期"
            @change="changeStartTime($event)"
          >
          </el-date-picker>
          <div class="arrow-icon"></div>
        </div>
      </div>
      <div class="data-list w-100">
        <div class="no-data flex-column w-100">
          <img src="../../assets/images/no_content.png" />
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { getLive } from "@/api";
export default {
  name: "consumeIncomeDetail",
  data() {
    return {
      currentTab: "consume",
      loading: false,
      tableData: [],
      params: {
        service: "User.GetConsumeCoinRecordList",
        uid: this.$route.query.uid,
        token: this.$route.query.token,
        start_time: moment()
          .startOf("day")
          .format("YYYY/MM/DD HH:mm:ss"),
        end_time: moment()
          .endOf("day")
          .format("YYYY/MM/DD HH:mm:ss"),
        p: 1,
        perPage: 10,
      },
    };
  },
  mounted() {
    this.getConsumeData();
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    },
    getConsumeData() {
      if (
        moment(this.params.start_time).isAfter(moment(this.params.end_time))
      ) {
        this.$message({
          message: "开始时间不能比结束时间晚",
          type: "warning",
        });
        return;
      }

      this.loading = true;
      getLive(this.params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            let dataList = res.data.info.data;
            dataList.forEach((item) => {
              item.addtime = moment(new Date(item.addtime * 1000)).format(
                "YYYY/MM/DD"
              );
            });
            this.tableData = [...dataList];
          } else {
            this.$message({
              message: res.message,
              type: "warning",
            });
          }

          this.loading = false;
        })
        .catch((err) => {
          this.$message({
            message: err.message,
            type: "warning",
          });
          this.loading = false;
        });
    },
    changeStartTime(event) {
      this.params.start_time = moment(new Date(event))
        .startOf("day")
        .format("YYYY/MM/DD HH:mm:ss");
      this.getConsumeData();
    },
  },
};
</script>

<style lang="scss" scope>
.consume-income-detail {
  .tab-bar {
    background: #fff;
    height: 2rem;
    font-size: 16px;
    border-top: 1px solid #e4e4e4;

    .tab {
      width: 50%;
      line-height: 2rem;
      color: #858b9b;
      text-align: center;
      transition: all 0.1s;
      position: relative;

      &.active {
        color: #393e4a;
        font-size: 20px;
        font-weight: bold;
      }

      .tab-text {
        z-index: 2;
      }

      .underline {
        width: 1.2rem;
        height: 0.4rem;
        border-radius: 0.1rem 0.1rem 0 0;
        background: linear-gradient(to right, #ea5082, #f9bcd7);
        position: absolute;
        left: 40%;
        bottom: 0.35rem;
        z-index: 1;
      }
    }
  }

  .container {
    background: #f6f6f6;
    height: calc(100vh - 2rem);

    .top {
      background: #fff;
      height: 3rem;

      .date-container {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);

        .arrow-icon {
          width: 30px;
          height: 1rem;
          background: url("../../assets/images/arrow_gray_down.png") no-repeat
            center;
          background-size: contain;
        }
      }
    }

    .data-list {
      height: calc(100vh - 5rem);
      .no-data {
        position: absolute;
        top: 30%;

        img {
          width: 10rem;
          margin-bottom: 1rem;
        }
      }
    }
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 6rem;
    font-size: 16px !important;
  }
  .el-input--mini .el-input__inner {
    padding: 0 !important;
    text-align: right;
    border: 0;
  }
  .el-input--mini .el-input__icon {
    display: none;
  }
}
</style>
