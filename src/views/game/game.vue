<template>
  <div class="stored">
    <div class="header-bar">
      <div class="header-arrow-left">
        <router-link class="item" :to="{ name: 'promote' }">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </div>
      <div class="header-title">好友遊戲明細</div>
    </div>
    <div class="stored-search-box">
      <div class="stored-block">
        <div><span class="stored-time">开始时间</span></div>
        <div>
          <el-date-picker v-model="timeValue" size="small" type="date" align="left"></el-date-picker>
        </div>
      </div>
      <div class="stored-block">
        <div><span class="stored-time">结束时间</span></div>
        <div>
          <el-date-picker v-model="timeValue" size="small" type="date" align="left"></el-date-picker>
        </div>
      </div>
      <div class="stored-search">
        <img src="../../assets/images/search.png" alt="">
      </div>
      <div class="stored-easy" @click="openSearchTip()">快捷</div>
    </div>
    <div class="stored-content">
      <div class="stored-title">
        <ul>
          <li>ID</li>
          <li>玩家ID</li>
          <li>儲值時間</li>
          <li>儲值金币</li>
          <li>獎勵積分</li>
        </ul>
      </div>
      <div class="stored-content">
        <ul v-if="data >= 1">
          <li>adim12</li>
          <li>77525</li>
          <li>2015-01-22</li>
          <li>100000</li>
          <li>99999</li>
        </ul>
        <div class="no-msg" >暫無數據</div>
      </div>
    </div>
    <div class="stored-footer">
      <!-- <div>好友遊戲返傭, 每日發放一次</div> -->
      <div>遊戲獎勵積分: 0</div>
    </div>

    <div class="search-bg" :class="searchTip"></div>
    <div class="search-tip" :class="searchTip">
      <div class="search-title">
        <div class="">快捷查詢</div>
        <div class="search-close"  @click="closeSearchTip()">X</div>
      </div>
      <div class="search-content">
        <ul>
          <li v-for="(item, i) in searchSelect" :key="i.searchSelect">
            {{ item.date }}
          </li>
        </ul>
      </div>
    </div>    
    <div class=""></div>
  </div>
</template>
<script>
export default {
  name: "game",
  data() {
    return {
      searchTip:"search_start",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      timeValue: "2021-03-22",
      searchSelect: [
        { date: "當日" },
        { date: "昨日" },
        { date: "本周" },
        { date: "上周" },
        { date: "本月" },
        { date: "上月" },
      ],
    };
  },
  mounted() {},
  methods: {
    openSearchTip(){
      this.searchTip = "search_active";
    },
    closeSearchTip(){
      this.searchTip = "search_start"      
    }  
  },
};
</script>

<style lang="scss" scope>
.stored {
  .header-bar {
    display: flex;
    padding: 1.26em 1em;
    border-bottom: 1px solid #ececec;
    align-items: center;
    .header-title {
      width: 100vw;
      font-size: 17px;
      font-weight: 600;
    }
  }
  .stored-search-box{
    width: 95vw;
    background-color: #f3f2f2;
    padding: 0.8em 10px;
    display: inline-flex;
    align-items: center;
    .stored-block{
      display: inline-block;
      .stored-time{
        font-size: 13px;
        float: left;
        color: #666666;
      }
    }
    .stored-search{
      background-color: #FFFFFF;
      border-radius: 50%;
      width: 1.5em;
      height: 1.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      img{
        height: 1em;
      }
    }
    .stored-easy{
      margin-left: 10px;
      background-color: rgb(3, 82, 253);
      color: #FFF;
      font-size: 11px;
      padding: 0.6em;
      border-radius: 35px;
    }
  }
  .stored-content{
    .stored-title{
      border-bottom:1px solid #dddddd;
      padding: 0.7em;
      ul{
        display: flex;
        li{
          font-size: 14px;
          text-align: left;
          &:nth-child(1){
            width: 4em;
          }
          &:nth-child(2){
            width: 6em;
          }
          &:nth-child(3){
            width: 7em;
          }
          &:nth-child(4){
            width: 6.5em;
          }
          &:nth-child(5){
            width: auto;
          }
        }
      }
    }
    .stored-content{
      padding: 1em 0.7em;
      ul{
        display: flex;
        // justify-content: space-between;
        li{
          font-size: 14px;
          text-align: left;
          &:nth-child(1){
            width: 4em;
          }
          &:nth-child(2){
            width: 6em;
          }
          &:nth-child(3){
            width: 7em;
          }
          &:nth-child(4){
            width: 6.5em;
          }
          &:nth-child(5){
            width: auto;
          }
        }
      }
      .no-msg{
        width: auto;
        font-size: 13px;
        color: #666666;
        margin: 0 auto;
        padding: 3em 0;
      }
    }
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
  .search-bg{
    width: 100vw;
    height: 42.5em;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .search-tip{
    width: 100vw;
    position: absolute;
    bottom:0;
    background-color: #ffffff;
    padding: 0.5em 0 1em 0;
    font-size: 14px;
    border-radius: 25px 25px 0 0;
    .search-title{
      display: flex;
      width: 100vw;
      justify-content: center;
      align-items: center;
      padding: 1em 0;
      .search-close{
        position: absolute;
        right: 20px;
        color: #cccbcb;
        font-size: 17px;
        
      }
    }
    .search-content{
      ul{
        li{
          line-height: 3em;
        }
      }
    }
  }
}

.search_start{
  display: none;
}
.search_active{
  display: block;
}

.el-date-editor.el-input{
  width: 12em;
}
.el-input__prefix {
  display: none;
}
.el-input__inner{
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom:1px solid #dddddd;
  border-radius: 0;
  background-color: #f3f2f2;
  padding: 0;
}
.el-input--prefix .el-input__inner{
  padding-left:0;
}
.el-input--suffix .el-input__inner {
    padding-right: 15px;
}
</style>