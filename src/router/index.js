import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home',
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home/Home.vue'),
  },
  {
    path: '/bags',
    name: 'bags',
    component: () => import(/* webpackChunkName: "bags" */ '../views/bags/bags.vue'),
    meta: { title: "我的背包" }
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import(/* webpackChunkName: "activity" */ '../views/activity/activity.vue'),
    meta: { title: "活动中心" }
  },
  {
    path: '/liveActivity',
    name: 'liveActivity',
    component: () => import(/* webpackChunkName: "liveActivity" */ '../views/activity/liveActivity.vue'),
    meta: { title: "直播活动" }
  },
  {
    path: '/gameActivity',
    name: 'gameActivity',
    component: () => import(/* webpackChunkName: "gameActivity" */ '../views/activity/gameActivity.vue'),
    meta: { title: "游戏活动" }
  },
  {
    path: '/level',
    name: 'level',
    component: () => import(/* webpackChunkName: "level" */ '../views/level/level.vue'),
    meta: { title: "等级" }
  },
  {
    path: '/anchorContribute',
    name: 'anchorContribute',
    component: () => import(/* webpackChunkName: "anchorContribute" */ '../views/contribute/anchorContribute.vue'),
    meta: { title: "贡献榜" }
  },
  {
    path: '/depositWithdrawalRecords',
    name: 'depositWithdrawalRecords',
    component: () => import(/* webpackChunkName: "depositWithdrawalRecords" */ '../views/record/depositWithdrawalRecords.vue'),
    meta: { title: "充提纪录" }
  },
  {
    path: '/gameRecordHiPie',
    name: 'gameRecordHiPie',
    component: () => import(/* webpackChunkName: "gameRecordHiPie" */ '../views/record/gameRecordHiPie.vue'),
    meta: { title: "游戏纪录" }
  },
  {
    path: '/gameRecordHiPieBetOrder',
    name: 'gameRecordHiPieBetOrder',
    component: () => import(/* webpackChunkName: "gameRecordHiPieBetOrder" */ '../views/record/gameRecordHiPieBetOrder.vue'),
    meta: { title: "游戏注单" }
  },
  {
    path: '/gameRecordHiPieBetDetail',
    name: 'gameRecordHiPieBetDetail',
    component: () => import(/* webpackChunkName: "gameRecordHiPieBetDetail" */ '../views/record/gameRecordHiPieBetDetail.vue'),
    meta: { title: "下注详情" }
  },
  // {
  //   path: '/gameRecord',
  //   name: 'gameRecord',
  //   component: () => import(/* webpackChunkName: "gameRecord" */ '../views/record/gameRecord.vue'),
  //   meta: { title: "游戏纪录" }
  // },
  // {
  //   path: '/gameRecordOneDay',
  //   name: 'gameRecordOneDay',
  //   component: () => import(/* webpackChunkName: "gameRecordOneDay" */ '../views/record/gameRecordOneDay.vue'),
  //   meta: { title: "游戏纪录" }
  // },
  // { // 收支明细拆分成兩頁了, 此頁廢棄
  //   path: '/consumeIncomeDetail',
  //   name: 'consumeIncomeDetail',
  //   component: () => import(/* webpackChunkName: "consumeIncomeDetail" */ '../views/detail/consumeIncomeDetail.vue'),
  //   meta: { title: "收支明细" }
  // },
  {
    path: '/consumeDetail',
    name: 'consumeDetail',
    component: () => import(/* webpackChunkName: "consumeDetail" */ '../views/detail/consumeDetail.vue'),
    meta: { title: "消费明细" }
  },
  {
    path: '/incomeDetail',
    name: 'incomeDetail',
    component: () => import(/* webpackChunkName: "incomeDetail" */ '../views/detail/incomeDetail.vue'),
    meta: { title: "收入明细" }
  },
  {
    // 因為 主播榜、土豪榜 抽出去單獨放, 所以 leaderboard 應該是廢棄了
    path: '/leaderboard',
    name: 'leaderboard',
    component: () => import(/* webpackChunkName: "leaderboard" */ '../views/leaderboard/leaderboard.vue'),
    meta: { title: "排行榜" }
  },
  {
    path: '/leaderboardAnchor',
    name: 'leaderboardAnchor',
    component: () => import(/* webpackChunkName: "leaderboardAnchor" */ '../views/leaderboard/leaderboardAnchor.vue'),
    meta: { title: "主播榜" }
  },
  {
    path: '/leaderboardRich',
    name: 'leaderboardRich',
    component: () => import(/* webpackChunkName: "leaderboardRich" */ '../views/leaderboard/leaderboardRich.vue'),
    meta: { title: "土豪榜" }
  },

  {
    path: '/promote',
    name: 'promote',
    component: () => import(/* webpackChunkName: "promote" */ '../views/promote/promote.vue'),
    meta: { title: "推广赚钱" }
  },
  {
    path: '/promoteInvite',
    name: 'promoteInvite',
    component: () => import(/* webpackChunkName: "promoteInvite" */ '../views/promote/promoteInvite.vue'),
    meta: { title: "好友推荐码" }
  },
  {
    path: '/friend',
    name: 'friend',
    component: () => import(/* webpackChunkName: "friend" */ '../views/friend/friend.vue'),
    meta: { title: "好友注册明细" }
  },
  {
    path: '/friendGameDetail',
    name: 'friendGameDetail',
    component: () => import(/* webpackChunkName: "friendGameDetail" */ '../views/friend/friendGameDetail.vue'),
    meta: { title: "好友游戏明细" }
  },
  {
    path: '/stored',
    name: 'stored',
    component: () => import(/* webpackChunkName: "stored" */ '../views/stored/stored.vue'),
    meta: { title: "好友储值明细" }
  },
  {
    path: '/game_des',
    name: 'game_des',
    component: () => import(/* webpackChunkName: "game_des" */ '../views/game/game_des.vue'),
    meta: { title: "反佣说明" }
  },
  {
    path: '/game_des_rules',
    name: 'game_des_rules',
    component: () => import(/* webpackChunkName: "game_des_rules" */ '../views/game/game_des_rules.vue'),
    meta: { title: "反佣说明" }
  },
]

const router = new VueRouter({
  routes
})

export default router
