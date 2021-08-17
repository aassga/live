<template>
  <div class="game-record-one-day">
    <div class="now-date flex-row js-flex-end">
      {{ dataStr(nowDate) }}
    </div>

    <div class="tab-bar w-100 flex-row">
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
import moment from "moment";
import RecordLotterty from '@/components/record/lottery'
import RecordSport from '@/components/record/sport'
import RecordOther from '@/components/record/other'
export default {
  name: "gameRecordOneDay",
  components:{
    RecordLotterty,
    RecordSport,
    RecordOther
  },
  data() {
    return {
      currentComponent: '',
      currentDate: {
        name: "今日",
        value: 'today',
        time_start: moment(this.$route.query["date"]).format("YYYY-MM-DD"),
        time_end: moment(this.$route.query["date"]).format("YYYY-MM-DD"),
        },
      currentTab: "lottery",
      currentLotteryTypeTab: "全部",
      lotteryData: [],
      params: {
        game_class: "lottery",
        date: this.$route.query["date"],
        status: 0,
      },
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
      lotteryTypes: [
        {
          name: "全部",
          status: "",
        },
        {
          name: "已中奖",
          status: 1,
        },
        {
          name: "未中奖",
          status: 2,
        },
        {
          name: "待开奖",
          status: 0,
        },
      ],
      otherTypes: [
        {
          name: "全部",
          status: "",
        },
        {
          name: "赢",
          status: 1,
        },
        {
          name: "输",
          status: 2,
        },
        {
          name: "",
          status: "",
        },
      ],
      sportTypes: [
        {
          name: "全部",
          status: "",
        },
        {
          name: "赢",
          status: 1,
        },
        {
          name: "输",
          status: 2,
        },
        {
          name: "待结算",
          status: 0,
        },
      ],
      nowDate: this.$route.query["date"],
    };
  },
  watch:{
    '$route.query.gameType': {
      handler: function (val, oldVal) {
        if(val === 'lottery'){
          this.currentComponent = 'RecordLotterty'
        }else if (val === 'sport'){
          this.currentComponent = 'RecordSport'
        }else{
          this.currentComponent = 'RecordOther'
        }
      },
      immediate: true
    }
  },
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
    changeLotteryType(type) {
      this.currentLotteryTypeTab = type.name;
      
    },
    dataStr(v) {
      if (v) {
        return v.slice(5, v.length).replace("-", "月") + "日";
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scope>
.game-record-one-day {
  .now-date {
    color: #00bdd4;
    padding: 1rem 1rem;
  }
  .tab-bar {
    background: #fff;
    height: 2rem;
    font-size: 12px;

    .tab {
      width: 3.8rem;
      height: 100%;
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

  .red {
    color: #e71414;
  }
  .green {
    color: #00a054;
  }
}
</style>