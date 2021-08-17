<template>
  <div class="deposit-withdrawal-records">
    <div class="tab-bar w-100 flex-row">
      <div
        class="tab"
        @click="changeTab('withdrawal')"
        :class="{ active: currentTab === 'withdrawal' }"
      >
        提现纪录
      </div>
      <div
        class="tab"
        @click="changeTab('deposit')"
        :class="{ active: currentTab === 'deposit' }"
      >
        储值纪录
      </div>
    </div>
    <el-table
      class="tables"
      v-loading="loading"
      :data="tableDataWithdrawal"
      style="width: 100%"
      v-show="currentTab === 'withdrawal'"
    >
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="amount"
        label="金额"
        min-width="15%"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="bankName"
        label="支付银行"
        min-width="18%"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="time"
        label="提现时间"
        min-width="22%"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="status"
        label="状态"
        min-width="20%"
      >
      </el-table-column>
      <!-- TODO 操作什麼？ -->
      <!-- <el-table-column
        show-overflow-tooltip
        align="center"
        prop="operate"
        label="操作"
        min-width="25%"
      >
        <template slot-scope="scope" class="flex-row">
          <span size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</span
          >
          <span
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</span
          >
        </template>
      </el-table-column> -->
    </el-table>

    <el-table
      class="tables"
      v-loading="loading"
      :data="tableDataDeposit"
      style="width: 100%"
      v-show="currentTab === 'deposit'"
    >
      <el-table-column align="center" prop="amount" label="金额">
      </el-table-column>
      <el-table-column align="center" prop="time" label="储值时间">
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
      </el-table-column>
    </el-table>

    <div style="width: 100%; height: 3vh">
      <el-pagination
        style="text-align: center"
        small
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total=" currentTab === 'withdrawal' ? dataWithdrawalTotal : dataDepositTotal"
        :page-size="formData.limit"
        @current-change="current_change"
      >
        >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { getWithdrawalRecord, getDepositRecord } from "@/api";

export default {
  name: "depositWithdrawalRecords",
  data() {
    return {
      currentTab: "withdrawal",
      tableDataWithdrawal: [],
      dataWithdrawalTotal: 0,
      tableDataDeposit: [],
      dataDepositTotal: 0,
      formData: {
        time_start: moment().subtract(1, "months").format("YYYY-MM-DD"),
        time_end: moment().endOf("day").format("YYYY-MM-DD"),
        page: 1,
        limit: 6,
      },
      loading: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      getWithdrawalRecord(this.formData)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            let dataList = res.data.data.list;
            dataList.forEach((item) => {
              item.time = moment(new Date(item.time * 1000)).format(
                "YYYY-MM-DD"
              );
              item.status = item.status === "success" ? "已领取" : "未领取";
            });
            this.tableDataWithdrawal = [...dataList];
            this.dataWithdrawalTotal = res.data.total;
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
          this.$message({
            message: err,
            type: "warning",
          });
        });

      getDepositRecord(this.formData)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            let dataList = res.data.data.list;
            dataList.forEach((item) => {
              item.time = moment(new Date(item.time * 1000)).format(
                "YYYY-MM-DD"
              );
              item.status = item.status === "success" ? "已领取" : "未领取";
            });
            this.tableDataDeposit = [...dataList];
            this.dataDepositTotal = res.data.total;
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
          this.$message({
            message: err,
            type: "warning",
          });
        });
    },
    changeTab(tab) {
      this.currentTab = tab;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    current_change(val) {
      this.form.page = val;
      this.getData();
    },
  },
};
</script>

<style lang="scss" scope>
.deposit-withdrawal-records {
  .tab-bar {
    background: #997cd8;
    height: 55px;
    font-size: 15px;

    .tab {
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      line-height: 55px;
      color: #fff;
      text-align: center;
      font-weight: bold;
      opacity: .6;

      &.active {
        opacity: 1;
        border-bottom: 2px solid #ecc200;
      }
    }
  }

  .el-table {
    font-size: 14px !important;
  }
  .cell {
    color: rgb(111, 111, 111);
    font-weight: bold;
  }
}
</style>