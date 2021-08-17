<template>
  <div class="game-record-hi-pie-detail">
    <div class="list-container">
      <div class="list-row flex-row js-space-between" v-for="item in rows" :key="item.key">
        <div class="label">{{ item.name }}</div>
        <div class="value" :class="item.class ? item.class(listData[item.key]) : ''">{{ item.format ? item.format(listData[item.key]) : listData[item.key] }}</div>
      </div>
      <div id="copyBillNoBtn"
        class="list-row list-bottom flex-row js-space-between"
        data-clipboard-action="copy"
        data-clipboard-target="#billNo"
      >
        <div class="label">订单号</div>
        <div class="flex-row">
          <div id="billNo" class="value">{{ listData.billNo }}</div>
          <div class="copy-button">复制</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';

const statusList = [
  {
    class: 'greenAmount',
    value: '未结算'
  },
  {
    class: 'redAmount',
    value: '赢'
  },
  {
    class: 'greenAmount',
    value: '输'
  },
  {
    class: 'redAmount',
    value: '和'
  },
  {
    class: 'greenAmount',
    value: '测单'
  },
  {
    class: 'redAmount',
    value: '取消'
  },
];

export default {
  name: "gameRecordHiPieBetDetail",
  data() {
    return {
      listData: {},
      rows: [
        {
          name: '平台类型',
          key: 'platform',
        },
        {
          name: '订单状态',
          key: 'status',
          class: (e) => {
            return statusList[e].class
          },
          format: (e) => {
            return statusList[e].value
          }
        },
        {
          name: '游戏名',
          key: 'gameName',
        },
        {
          name: '下注时间',
          key: 'betTime',
          format: (e) => {
            return moment(Number(e * 1000)).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          name: '下注总金额',
          key: 'betAmount',
        },
        {
          name: '中奖金额',
          key: 'netAmount',
        },
      ],
    };
  },
  methods: {
    initCopy() {
      const vm = this;
      const clipboard = new ClipboardJS("#copyBillNoBtn");
      clipboard.on("success", function (e) {
        vm.$message({
          type: "success",
          message: "已复制 " + e.text,
        });
      });
    }
  },
  mounted() {
    this.initCopy();
  },
  created() {
    if (this.$route.query) {
      this.listData = Object.assign(this.$route.query, {});
    }
  },
};
</script>

<style lang="scss" scope>
.game-record-hi-pie-detail {
  background-color: #f7f6fc;
  height: 100vh;

  .list-row {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    font-size: 12px;
    background-color: white;

    .label {
      color: #b4b7bf;
      font-weight: bold;
    }
  }

  .list-bottom {
    margin-top: .5rem;
  }

  .copy-button {
    border: 1px solid #eee;
    padding: .3rem;
    border-radius: 4px;
    margin-left: .3rem;
  }
}
</style>