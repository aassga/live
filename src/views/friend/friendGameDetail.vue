<template>
  <div class="friend-game-detail">
    <div class="stored-search-box">
      <div class="stored-block">
        <div><span class="stored-time">开始时间</span></div>
        <div>
          <el-date-picker
            v-model="form.st"
            value-format="yyyy-MM-dd"
            size="small"
            type="date"
            align="left"
            :editable="false"
            :clearable="false"
            @change="changeStartTime($event)"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
      </div>
      <div class="stored-block">
        <div><span class="stored-time">结束时间</span></div>
        <div>
          <el-date-picker
            v-model="form.et"
            value-format="yyyy-MM-dd"
            size="small"
            type="date"
            align="left"
            :editable="false"
            :clearable="false"
            @change="changeStartTime($event)"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
      </div>
      <div class="stored-search" @click="getFriendGameDetailData">
        <img src="../../assets/images/search.png" alt="" />
      </div>
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="stored-easy">快捷</div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="today">当日</el-dropdown-item>
          <el-dropdown-item command="yesterday">昨日</el-dropdown-item>
          <el-dropdown-item command="thisWeek">本周</el-dropdown-item>
          <el-dropdown-item command="lastWeek">上周</el-dropdown-item>
          <el-dropdown-item command="thisMonth">本月</el-dropdown-item>
          <el-dropdown-item command="lastMonth">上月</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div
      class="stored-container"
      style="width: 100%; height: 39rem; overflow: auto"
    >
      <el-table
        v-if="tableData.length !== 0"
        v-loading="loading"
        :data="tableData"
      >
        <!-- 如果嫌斷行不爽, 可加 show-overflow-tooltip, 或是設 width="220" 讓 table 可以滾動 -->
        <el-table-column min-width="20%" prop="userName" label="ID">
        </el-table-column>
        <el-table-column min-width="25%" prop="created_at" label="返傭时间">
        </el-table-column>
        <el-table-column min-width="35%" prop="title" label="說明">
        </el-table-column>
        <el-table-column min-width="20%" prop="bouns" label="獎勵積分">
        </el-table-column>
      </el-table>
      <!-- 如果無數據 -->
      <div class="nodata" v-else>
        <div class="img">
          <img src="../../assets/images/nodata.png" alt="" />
          <p>暂无数据</p>
        </div>
      </div>

      <div style="width: 100%; height: 3vh">
        <el-pagination
          style="text-align: center"
          small
          :hide-on-single-page="true"
          layout="prev, pager, next"
          :total="total"
          :page-size="form.pagesize"
          @current-change="current_change"
        >
          >
        </el-pagination>
      </div>
    </div>
    <div class="stored-footer">
      <!-- <div>累计推广人数:{{ total_user_counts }}</div> -->
    </div>
  </div>
</template>
<script>
import moment from "moment";

import { getFriendGameDetail } from "@/api";
export default {
  name: "friendGameDetail",
  data() {
    return {
      loading: false,
      form: {
        st: moment().subtract(1, "months").format("YYYY-MM-DD HH:mm:ss"),
        et: moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
        pagesize: 6,
        page: 1,
        type: 4
      },
      tableData: [],
      total: 0,
    };
  },
  mounted() {
    this.getFriendGameDetailData();
  },
  methods: {
    getFriendGameDetailData() {
      if (moment(this.form.st).isAfter(moment(this.form.et))) {
        this.$message({
          message: "开始时间不能比结束时间晚",
          type: "warning",
        });
        return;
      }
      let params = {
        ...this.form,
      };
      getFriendGameDetail(params)
        .then((res) => {
          if (res.code === 200) {
            let dataList = res.data.data;
            dataList.forEach((item) => {
              item.created_at = moment(
                new Date(item.created_at * 1000)
              ).format("YYYY-MM-DD");
            });
            this.tableData = [...dataList];
            this.total = res.data.total;
          } else {
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.$message({
            message: err,
            type: "warning",
          });
        });
    },
    handleCommand(command) {
      switch (command) {
        case "today":
          this.form.st = moment()
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          this.form.et = moment()
            .endOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "yesterday":
          this.form.st = moment()
            .subtract(1, "days")
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          this.form.et = moment()
            .subtract(1, "days")
            .endOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "thisWeek":
          this.form.st = moment()
            .startOf("week")
            .format("YYYY-MM-DD HH:mm:ss");
          this.form.et = moment()
            .endOf("week")
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "lastWeek":
          this.form.st = moment()
            .subtract(1, "week")
            .startOf("week")
            .format("YYYY-MM-DD HH:mm:ss");
          this.form.et = moment()
            .subtract(1, "week")
            .endOf("week")
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "thisMonth":
          this.form.st = moment()
            .startOf("month")
            .format("YYYY-MM-DD HH:mm:ss");
          this.form.et = moment()
            .endOf("month")
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "lastMonth":
          this.form.st = moment()
            .subtract(1, "months")
            .startOf("month")
            .format("YYYY-MM-DD HH:mm:ss");
          this.form.et = moment()
            .subtract(1, "months")
            .endOf("month")
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        default:
          this.form.st = moment()
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          this.form.et = moment()
            .endOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
      }
    },
    changeStartTime(event) {
      this.form.st = moment(new Date(event))
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    current_change(val) {
      this.form.page = val;
      this.getFriendGameDetailData();
    },
  },
};
</script>

<style lang="scss" scope>
.friend-game-detail {
  .stored-search-box {
    width: 95vw;
    background-color: #f3f2f2;
    padding: 0.8em 10px;
    display: inline-flex;
    align-items: center;
    .stored-block {
      display: inline-block;
      .stored-time {
        font-size: 13px;
        float: left;
        color: #666666;
      }
    }
    .stored-search {
      background-color: #ffffff;
      border-radius: 50%;
      width: 1.5em;
      height: 1.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      img {
        height: 1em;
      }
    }
    .stored-easy {
      position: relative;
      left: 10px;
      background-color: rgb(3, 82, 253);
      color: #fff;
      font-size: 11px;
      padding: 0.6em;
      border-radius: 35px;
    }
  }
  .stored-content {
    background: #fff;
    // .stored-title {
    //   border-bottom: 1px solid #dddddd;
    //   padding: 0.7em;
    //   ul {
    //     display: flex;
    //     li {
    //       font-size: 14px;
    //       text-align: left;
    //       &:nth-child(1) {
    //         width: 4em;
    //       }
    //       &:nth-child(2) {
    //         width: 6em;
    //       }
    //       &:nth-child(3) {
    //         width: 7em;
    //       }
    //       &:nth-child(4) {
    //         width: 6.5em;
    //       }
    //       &:nth-child(5) {
    //         width: auto;
    //       }
    //     }
    //   }
    // }
    // .stored-content {
    //   padding: 1em 0.7em;
    //   ul {
    //     display: flex;
    //     // justify-content: space-between;
    //     li {
    //       font-size: 14px;
    //       text-align: left;
    //       &:nth-child(1) {
    //         width: 4em;
    //       }
    //       &:nth-child(2) {
    //         width: 6em;
    //       }
    //       &:nth-child(3) {
    //         width: 7em;
    //       }
    //       &:nth-child(4) {
    //         width: 6.5em;
    //       }
    //       &:nth-child(5) {
    //         width: auto;
    //       }
    //     }
    //   }
    //   .no-msg {
    //     width: auto;
    //     font-size: 13px;
    //     color: #666666;
    //     margin: 0 auto;
    //     padding: 3em 0;
    //   }
    // }
  }
  .stored-footer {
    width: 95vw;
    border-top: 1px solid #ececec;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 0.9em 1em;
    font-size: 12px;
  }
  .search-bg {
    width: 100vw;
    height: 42.5em;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .search-tip {
    width: 100vw;
    position: absolute;
    bottom: 0;
    background-color: #ffffff;
    padding: 0.5em 0 1em 0;
    font-size: 14px;
    border-radius: 25px 25px 0 0;
    .search-title {
      display: flex;
      width: 100vw;
      justify-content: center;
      align-items: center;
      padding: 1em 0;
      .search-close {
        position: absolute;
        right: 20px;
        color: #cccbcb;
        font-size: 17px;
      }
    }
    .search-content {
      ul {
        li {
          line-height: 3em;
        }
      }
    }
  }
}
.search_start {
  display: none;
}
.search_active {
  display: block;
}
.el-date-picker{
  font-family: sans-serif;
}
.el-date-editor.el-input {
  width: 12em;
}
.el-input__prefix {
  display: none;
}
.el-input__inner {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #dddddd;
  border-radius: 0;
  background-color: #f3f2f2;
  padding: 0;
}
.el-input--prefix .el-input__inner {
  padding-left: 0;
}
.el-input--suffix .el-input__inner {
  padding-right: 15px;
}
.nodata {
  background: #fff;
  min-height: 70vh;
  display: flex;
  text-align: center;
  .img {
    margin: auto;
  }
  img {
    width: 150px;
  }
  p {
    color: #999999;
    font-size: 1.1rem;
    font-weight:700;
  }
}
</style>