<template>
  <div class="gameRecord">
    <div class="date-bar w-100 flex-row js-flex-start">
      <div
        class="tab"
        :class="{ active: currentDateTab === tab.name }"
        v-for="tab in dateTabs"
        :key="tab.name"
        @click="changeDateTab(tab)"
      >
        {{ tab.name }}
      </div>
    </div>

    <div class="tab-bar w-100 flex-row" v-if="showTypeTab">
      <div
        class="tab"
        :class="{ active: currentTab === tab.type }"
        v-for="tab in tabs"
        :key="tab.type"
        @click="changeTab(tab.type)"
      >
        {{ tab.name }}
      </div>
    </div>
    <div :is="currentComponent" :currentDate="currentDate" :currentTab="currentTab" />
  </div>
</template>
<script>
import RecordLotterty from '@/components/record/lottery'
import RecordSport from '@/components/record/sport'
import RecordOther from '@/components/record/other'
import moment from "moment";
export default {
  name: "gameRecord",
  components:{
    RecordLotterty,
    RecordSport,
    RecordOther
  },
  data() {
    return {
      showTypeTab: true,
      currentDate: {
        name: "昨日",
        value: 'yesterday',
        time_start: moment()
          .subtract(1, "days")
          .startOf("day")
          .format("YYYY-MM-DD"),
        time_end: moment()
          .subtract(1, "days")
          .endOf("day")
          .format("YYYY-MM-DD"),
        },
      currentComponent: 'RecordLotterty', //default first
      currentLotteryTypeTab: "全部",
      currentDateTab: "昨日",
      currentTab: "lottery",
      dateTabs: [
        {
          name: "昨日",
          value: 'yesterday',
          time_start: moment()
            .subtract(1, "days")
            .startOf("day")
            .format("YYYY-MM-DD"),
          time_end: moment()
            .subtract(1, "days")
            .endOf("day")
            .format("YYYY-MM-DD"),
        },
        {
          name: "今日",
          value: 'today',
          time_start: moment().startOf("day").format("YYYY-MM-DD"),
          time_end: moment().endOf("day").format("YYYY-MM-DD"),
        },
        {
          name: "本月",
          value: 'thisMonth',
          time_start: moment().startOf("month").format("YYYY-MM-DD"),
          time_end:  moment().endOf("day").format("YYYY-MM-DD"),
        },
        {
          name: "上月",
          value: 'lastMonth',
          time_start: moment()
            .subtract(1, "months")
            .startOf("month")
            .format("YYYY-MM-DD"),
          time_end: moment()
            .subtract(1, "months")
            .endOf("month")
            .format("YYYY-MM-DD"),
        },
      ],
      tabs: [
        {
          name: "彩票",
          type: "lottery",
        },
        {
          name: "棋牌",
          type: "chess",
        },
        {
          name: "视讯",
          type: "live",
        },
        {
          name: "捕鱼",
          type: "fish",
        },
        {
          name: "电子",
          type: "slot",
        },
        {
          name: "体育",
          type: "sport",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
      if(tab === 'lottery'){
        this.currentComponent = 'RecordLotterty'
      }else if (tab === 'sport'){
        this.currentComponent = 'RecordSport'
      }else{
        this.currentComponent = 'RecordOther'
      }
    },
    changeDateTab(tab) {
      this.currentDate = tab
      this.currentDateTab = tab.name;
      const checkType = ["today", "yesterday"];
      if(checkType.includes(this.currentDate.value)) {
        this.showTypeTab = true
      }else{
        this.showTypeTab = false
      }
    },
  },
};
</script>

<style lang="scss" scope>
.gameRecord {
  .date-bar {
    background: #fff;
    height: 3rem;
    font-size: 12px;
    border-top: 1px solid #e4e4e4;

    .tab {
      width: 3.8rem;
      line-height: 2rem;
      color: #858b9b;
      text-align: center;
      font-size: 18px;

      &.active {
        color: #00bdd4;
        font-weight: bold;
        border: 2px solid #00bdd4;
        line-height: 1.9rem;
      }
    }
  }

  .tab-bar {
    background: #fff;
    height: 2rem;
    font-size: 12px;
    border-top: 1px solid #e4e4e4;

    .tab {
      width: 3.8rem;
      line-height: 2rem;
      color: #858b9b;
      text-align: center;
      font-size: 18px;

      &.active {
        color: #00bdd4;
        font-weight: bold;
        border-bottom: 2px solid #00bdd4;
        line-height: 1.9rem;
      }
    }
  }

  .total-container {
    padding: 0 1rem;
    background: #f7f6fc;
    height: 2rem;

    .item {
      font-size: 12px;
      color: #b4b7c1;
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

        .game-name {
          font-size: 14px;
          font-weight: 400;
          color: #4b5059 !important;

          img {
            width: 1rem;
            margin-right: 0.5rem;
          }
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
}
</style>
