<template>
  <div>
    <router-link class="item" :to="{ name: 'bags' }">
      <i class="icon issue"></i>
      <div class="active">背包</div>
    </router-link>
    <router-link class="item" :to="{ name: 'activity' }">
      <i class="icon issue"></i>
      <div class="active">活動</div>
    </router-link>
    <router-link class="item" :to="{ name: 'liveActivity' }">
      <i class="icon issue"></i>
      <div class="active">直播活动</div>
    </router-link>
    <router-link class="item" :to="{ name: 'gameActivity' }">
      <i class="icon issue"></i>
      <div class="active">游戏活动</div>
    </router-link>
    <router-link class="item" :to="{ name: 'promote' }">
      <i class="icon issue"></i>
      <div class="active">我的推廣</div>
    </router-link>
    <router-link class="item" :to="{ name: 'level' }">
      <i class="icon issue"></i>
      <div class="active">等級</div>
    </router-link>
    <router-link class="item" :to="{ name: 'depositWithdrawalRecords' }">
      <i class="icon issue"></i>
      <div class="active">充提紀錄</div>
    </router-link>
    <router-link class="item" :to="{ name: 'gameRecordHiPie' }">
      <i class="icon issue"></i>
      <div class="active">遊戲紀錄</div>
    </router-link>
    <!-- <router-link class="item" :to="{ name: 'consumeIncomeDetail' }">
      <i class="icon issue"></i>
      <div class="active">收支明細</div>
    </router-link> -->
    <router-link class="item" :to="{ name: 'consumeDetail' }">
      <i class="icon issue"></i>
      <div class="active">消费明细</div>
    </router-link>
    <router-link class="item" :to="{ name: 'incomeDetail' }">
      <i class="icon issue"></i>
      <div class="active">收入明细</div>
    </router-link>
    <router-link class="item" :to="{ name: 'anchorContribute' }">
      <i class="icon issue"></i>
      <div class="active">貢獻榜</div>
    </router-link>
    <!-- <router-link class="item" :to="{ name: 'leaderboard' }">
      <i class="icon issue"></i>
      <div class="active">排行榜</div>
    </router-link> -->
    <router-link class="item" :to="{ name: 'leaderboardAnchor' }">
      <i class="icon issue"></i>
      <div class="active">主播榜</div>
    </router-link>
    <router-link class="item" :to="{ name: 'leaderboardRich' }">
      <i class="icon issue"></i>
      <div class="active">土豪榜</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
<style lang="scss" scope>
</style>
