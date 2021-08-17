<template>
  <div class="income-detail">
    <div class="container">
      <div class="top w-100 flex-row relative">
        <div class="text">今日收入0金币</div>
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
  name: "incomeDetail",
  data() {
    return {
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
.income-detail {
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
          width: 8rem;
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
