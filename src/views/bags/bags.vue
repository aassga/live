<template>
  <div class="bags" v-loading="loading">
    <!-- <div class="header-bar">
      <ul>
        <li :class="{ active: currentTab === 'car' }" @click="changeTab('car')">
          座驾
        </li>
        <li :class="{ active: currentTab === 'bag' }" @click="changeTab('bag')">
          背包
        </li>
      </ul>
    </div> -->
    <div class="bags-content">
      <ul v-if="currentTab === 'car'">
        <li class="bag" v-for="item in carData" :key="item.id">
          <div class="flex-row">
            <div class="bag-bg">
              <img v-lazy="item.thumb" />
            </div>
            <div class="bag-msg">
              <span class="bag-title">{{ item.name }}</span>
              <span v-show="item.is_buy === 1" class="date"
                >{{ item.endtime | datefilter }} 到期</span
              >
              <span v-show="item.is_buy === 0" class="date"
                >原价：{{ item.needcoin }} 金币</span
              >
            </div>
          </div>
          <div class="bag-btn">
            <div
              v-show="item.is_buy === 0"
              class="buyClick"
              @click="openBuyTip(item.id)"
            ></div>
            <div
              v-show="item.is_buy === 1"
              :class="{
                mounbtn_a: item.status == 1,
                mounbtn_b: item.status == 0,
              }"
              @click="changeSubmit(item.id, item.status)"
            ></div>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li class="giftbag" v-for="item in bagData" :key="item.id">
          <div class="bag-img"><img v-lazy="item.thumb" /></div>
          <div class="bag-msg">
            <span class="bag-title">{{ item.name }}</span>
            <!-- <span class="number">數量 {{ item.nums }}</span> -->
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="buyBg" :class="buyBg" @click="closeBuyTip()"></div> -->

    <!-- 點擊購買後下方顯示的 div -->
    <el-drawer
      title="我是标题"
      :with-header="false"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="buyCars" :class="buyCars" v-loading="buyCarloading">
        <div class="buyTitle">{{ buyInfo.name }}</div>
        <div class="buyContent">
          <img v-lazy="buyInfo.thumb" alt="" />
          <div class="buyMsg">
            <span>原价: {{ buyInfo.onlycoin }}帖/月</span>
            <span>续费: {{ buyInfo.paycoin }}帖/月</span>
          </div>
        </div>
        <div class="buyFooter">
          <div class="buyTotal">
            <span class="buyText">合計: </span>
            <span class="buyMoney"
              ><img v-lazy="buyInfo.domin" alt="" />
              {{ buyInfo.onlycoin }}</span
            >
          </div>
          <div class="clickBtn" @click="buyCarSubmit(buyInfo.id)">
            <span>确认购买</span>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import moment from "moment";
import { getLive } from "@/api";
import { Loading } from "element-ui";
export default {
  name: "bags",
  data() {
    return {
      loadingInstance: Loading,
      currentTab: "car",
      params: {
        service: "User.CarList",
        uid: this.$route.query.uid,
        token: this.$route.query.token,
        type: "mall", // 類型，mall:商城/my:我的列表
      },
      carData: [],
      bagData: [],
      buyBg: "",
      buyCars: "buyCars_start",
      buyInfo: {
        name: "御龍在天",
        thumb: "http://qiniu.guohuile.com/car_5.png",
        onlycoin: 18888,
        paycoin: 15000,
        domin: require("../../assets/images/light.png"),
      },
      loading: false,
      buyCarloading: false,
      drawer: false,
      direction: "btt",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleClose(done) {
      this.buyCars = "";
      done();
    },
    goBack() {
      this.$router.go(-1);
    },
    changeTab(tab) {
      this.currentTab = tab;
    },
    getData() {
      this.getCarData();
      // this.getBackData();
    },
    getCarData() {
      this.params.type = "mall";
      this.loading = true;
      this.loadingInstance.service({
        fullscreen: true,
        spinner: "loading-spinner",
      });
      getLive(this.params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.carData = res.data.info;
            this.loading = false;
            this.loadingInstance.service().close();
            return;
          }
          this.$message({
            message: res.message,
            type: "warning",
          });
          this.loading = false;
          this.loadingInstance.service().close();
        })
        .catch((err) => {
          this.$message({
            message: err.message,
            type: "warning",
          });
          this.loadingInstance.service().close();
        });
    },
    getBackData() {
      this.params.type = "my";
      this.loading = true;
      getLive(this.params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.bagData = res.data.info;
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
          this.$message({
            message: err.message,
            type: "warning",
          });
        });
    },
    //更換裝備
    changeSubmit(id, status) {
      let params = {
        service: "User.SetCar",
        uid: this.$route.query.uid,
        token: this.$route.query.token,
        carid: id,
        status: status == 0 ? 1 : 0,
      };
      getLive(params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 1000,
            });
            this.getCarData();
            return;
          }
          this.$message({
            message: err.message,
            type: "warning",
            duration: 1000,
          });
        })
        .catch((err) => {
          this.$message({
            message: err.message,
            type: "warning",
            duration: 1000,
          });
        });
    },
    //購買裝備
    buyCarSubmit(id) {
      let params = {
        service: "User.BuyCar",
        uid: this.$route.query.uid,
        token: this.$route.query.token,
        carid: id,
      };
      this.buyCarloading = true;
      getLive(params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.getCarData();
          } else {
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
          this.closeBuyTip();
          this.buyCarloading = false;
        })
        .catch((err) => {
          this.$message({
            message: err.message,
            type: "warning",
          });
          this.closeBuyTip();
          this.buyCarloading = false;
        });
    },
    openBuyTip(id) {
      let buyItem = this.carData.find((item) => item.id === id);
      this.buyInfo = {
        id: id,
        name: buyItem.name,
        thumb: buyItem.thumb,
        onlycoin: buyItem.needcoin,
        paycoin: buyItem.needcoin,
        domin: require("../../assets/images/light.png"),
      };
      this.drawer = true;
      window.setTimeout(() => (this.buyCars = "buyCars_end"), 200);

      // this.buyBg = "buy_active";
      // this.buyCars = "buyCars_end"
    },
    closeBuyTip() {
      this.drawer = false;
      // this.buyBg = "";
      this.buyCars = "";
    },
  },
  filters: {
    datefilter(data) {
      return moment(new Date(data * 1000)).format("YYYY-MM-DD"); //加上 locale('zh-tw')顯示為中文
    },
  },
};
</script>

<style lang="scss" scope>
.bags {
  .header-bar {
    display: flex;
    padding: 1em;
    border-bottom: 1px solid #ececec;
    align-items: center;
    ul {
      display: flex;
      align-items: center;
      li {
        padding: 0 2em 0 4em;
        font-size: 17px;
        font-weight: 600;
        color: rgb(73, 73, 73);
      }
      .active {
        font-size: 20px;
        font-weight: 600;
        color: rgb(73, 73, 73);
        &:after {
          display: block;
          content: "";
          width: 1.5em;
          height: 3px;
          background-color: #ff9a8b;
          background-image: linear-gradient(
            90deg,
            #ff9a8b 0%,
            #ff6a88 55%,
            #ff99ac 100%
          );
          border-radius: 30%;
          margin: 0 auto;
          margin-top: 2px;
        }
      }
    }
  }
  .bags-content {
    width: auto;
    background-color: #fff;
    padding: 1.25em 0.75em;
    margin-top: 0.5rem;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .bag {
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e4e4e4;
        height: 15vh;

        .bag-msg {
          position: relative;
          width: 35vw;
          span {
            display: block;
            line-height: 1.85em;
          }
          .bag-title {
            color: #666666;
            font-size: 15px;
            font-weight: 600;
            text-align: left;
          }
          .date {
            color: #999999;
            font-size: 15px;
            text-align: left;
          }
        }

        .bag-bg {
          background-size: contain;
          background-repeat: no-repeat;
          width: 5rem;
          height: 5rem;
          margin-right: 1rem;
          border-radius: 10px;
          background-color: #F5F5F5;
          img {
            width: 3rem;
            height: 3rem;
            transform: translate(-0.1rem, 0.9rem);
          }
        }
        .bag-btn {
          .mounbtn_a {
            width: 6em;
            height: 1.5em;
            border: 1px solid #666666;
            border-radius: 36px;
            &:after {
              display: block;
              content: "卸下";
              color: #666666;
              font-size: 15px;
              text-align: center;
              line-height: initial;
              font-weight: 600;
            }
          }
          .mounbtn_b {
            width: 6em;
            height: 1.5em;
            border: 1px solid #ff607e;
            border-radius: 36px;
            &:after {
              display: block;
              content: "使用";
              color: #fc5a79;
              font-size: 15px;
              text-align: center;
              line-height: initial;
              font-weight: 600;
            }
          }
          .buyClick {
            padding: 6px 25px;
            background: linear-gradient(to left, rgb(253, 131, 179), rgb(240, 66, 115));
            border-radius: 36px;
            &:after {
              display: block;
              content: "获取";
              color: #ffffff;
              font-size: 15px;
              text-align: center;
              line-height: initial;
              font-weight: 600;
            }
          }
          .noBuyClick {
            width: 6em;
            height: 1.5em;
            border: 1px solid #666666;
            border-radius: 36px;
            &:after {
              display: block;
              content: "已购买";
              color: #666666;
              font-size: 15px;
              text-align: center;
              line-height: initial;
              font-weight: 600;
            }
          }
        }
      }
      .giftbag {
        width: 100vw;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e4e4e4;
        height: 10.8vh;
        padding: 1rem 0 0 0;
        .bag-img {
          height: 14vh;
          img {
            height: 7vh;
            transform: translate(-0.5rem, 0.7rem);
          }
        }
        .bag-msg {
          position: relative;
          left: 1%;
          top: -0.8rem;
          span {
            display: block;
            line-height: 1.85em;
          }
          .bag-title {
            color: #666666;
            font-size: 15px;
            font-weight: 600;
            text-align: left;
          }
          .number {
            color: #999999;
            font-size: 15px;
            text-align: left;
          }
        }
      }
    }
  }
  .buyBg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    display: none;
  }
  .buyCars {
    width: 100vw;
    height: 20em;
    background-color: #fff;
    position: fixed;
    display: none;
    bottom: -20em;
    transition: 0.5s;
    .buyTitle {
      font-size: 20px;
      font-weight: 600;
      padding: 0.6em 5em;
      margin: 0 auto;
      border-bottom: 1px solid #f0f0f0;
      span {
        position: relative;
        top: 1px;
      }
    }
    .buyContent {
      padding: 0em 0.8em 1.2em 0.8em;
      border-bottom: 1px solid #f0f0f0;
      img {
        padding: 1em;
      }
      .buyMsg {
        width: 19em;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        span {
          font-size: 14px;
          color: #747474;
        }
      }
    }
    .buyFooter {
      width: 21em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      padding: 1.2em 0;
      .buyTotal {
        span {
          font-size: 14px;
          color: #747474;
        }
        .buyMoney {
          img {
            height: 1em;
          }
        }
      }
      .clickBtn {
        font-size: 14px;
        padding: 0.7em 1em;
        color: #ffffff;
        border-radius: 15px;
        background-color: #4158d0;
        background-image: linear-gradient(43deg, #af5bab 0%, #e770f7 100%);
        font-weight: 800;
      }
    }
  }
  .buy_active {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .buyCars_end {
    display: block;
    bottom: 0;
    transition: 0.5s;
  }

  .el-drawer__open .el-drawer.btt {
    height: 0% !important;
  }
}
.loading {
  img {
    width: 100px !important;
    height: 100px;
  }
}
</style>
