<template>
  <div class="game_des_rules">
    <div class="header-bar">
      <div class="header-arrow-left">
        <router-link class="item" :to="{ name: 'promote' }">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </div>
      <div class="header-title">遊戲返傭說明</div>
    </div>
    <div class="content game_des_rules" style="">
      <p>
        1.会员邀请好友注册,好友晋升金管家等级的同时,在当月内,会员达相应等级存款打码要求,即可进行奖励发放,如当月无达到要求,下月清零,重新开始累积存款打码(打码不区分类型,需满足等级打码要求,并按照会员的实际存款乘以倍数进行计算)。
      </p>
      <br>
      <p>2.每一游戏类型,每一等级均可发放一次。</p>
      <br>
      <p>3.邀请者奖励=视讯奖励+棋牌奖励+彩票奖励+电子奖励。</p>
      <br>
      <p>4.金管家等级由各游戏类型的累积有效打码进行计算,如视讯等级只计算视讯的累积有效打码。</p>
      <br>
      <p>5.当邀请的好友晋升多级,邀请者当月要拿到每一级别邀请奖励只需当月累计达到最高级别的存款打码要求,即可获得每一级别奖励。</p>
      <p>例:1等级邀请者存款要求10,打码量存款的2倍为20,2等级邀请者存款要求30,打码量存款的3倍为90,如需拿到1,2等级礼金,则当月内需达到总存款30,打码量根据会员实际存款倍数计算。</p>
      <p>(1)当会员当月存款30,打码量需达到90,可同时获得1,2等级礼金。</p>
      <p>(2)当会员当月存款31,打码量需达到93,可同时获得1,2等级礼金。</p>
      <p>(3)当会员当月存款31,打码量只达到了90,不满足3倍存款要求,则只可获得1等级礼金,要想拿到2等级礼金,下月重新开始计算存款打码,达到存款30,打码达到实际存款的3倍,即可获得2等级礼金。</p>
      <br>
      <p>6.发放时间:系统自动发放,达到好友金管家等级存款打码要求即可进行发放。</p>
      <br>
      <p>7.会员晋升为代理后,可继续获得之前邀请好友奖励,发展下级后同时可获得下级返佣。</p>
      <br>
      <p>8.无论是个人或团体,如有任何威胁、滥用或使用不诚实方式套利的行为系统将自动拉入优惠黑名单将不能参与所有优惠,并取消该团队或个人优惠金额盈利金额,只保留本金。</p>
      <br>
      <p>9.同一玩家冒充好友注册将不符合申请礼金/代理条件。</p>
      <br>
      <p>10.玩家晋升为代理后如发现有团体进行对打行为,我司将有权收回代理资格。</p>
      <br>
      <p>11.金沙娱乐场将保留对活动的最终解释权,且在任何情况下可随时更改、停止、取消该优惠权利,谢谢!</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "game_des_rules",
  mounted() { },
  methods: { },
};
</script>

<style lang="scss" scope>
.game_des_rules {
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
  .game_des_rules{
    padding: 1rem;
    p {
      font-size: 14px;
      color: rgb(102, 102, 102);
      letter-spacing: 0.05em;
      line-height: 1.4em;
      text-align: left;
    }
  }

}
</style>