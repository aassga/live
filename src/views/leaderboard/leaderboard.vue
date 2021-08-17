<template>
  <div class="leaderboard">
    <div class="nav-bar w-100 flex-row">
      <div
        class="tab"
        @click="changeNav('leaderboardAnchor')"
        :class="{ navActive: currentNav === 'leaderboardAnchor' }"
      >
        <div class="tab-text relative">主播榜</div>
        <span class="underline"></span>
      </div>
      <div
        class="tab"
        @click="changeNav('leaderboardRich')"
        :class="{ navActive: currentNav === 'leaderboardRich' }"
      >
        <div class="tab-text relative">土豪榜</div>
        <span class="underline"></span>
      </div>
    </div>
    <div :is="currentNav" />
  </div>
</template>
<script>
import leaderboardAnchor from "../leaderboard/leaderboardAnchor";
import leaderboardRich from "../leaderboard/leaderboardRich";
export default {
  name: "leaderboard",
  data() {
    return {
      currentNav: "leaderboardAnchor",
    };
  },
  components: {
    leaderboardAnchor,
    leaderboardRich
  },
  mounted() {},
  methods: {
    changeNav(name) {
      this.currentNav = name;
    },
  },
};
</script>

<style lang="scss" scope>
.leaderboard {
  & > .nav-bar {
    background: #fff;
    height: 2rem;
    font-size: 16px;
    border-top: 1px solid #e4e4e4;
    position: fixed;
    top: 0;
    z-index: 1000;

    .tab {
      width: 50%;
      line-height: 2rem;
      color: #262626;
      text-align: center;
      transition: all 0.1s;
      position: relative;
      text-decoration: none;

      &.navActive {
        color: #191919;
        font-size: 20px;
        font-weight: bold;

        .underline {
          width: 1.2rem;
          height: 0.4rem;
          border-radius: 0.1rem 0.1rem 0 0;
          background: linear-gradient(to right, #ea5082, #f9bcd7);
          position: absolute;
          left: 40%;
          bottom: 0.35rem;
          z-index: 1;
        }
      }

      .tab-text {
        z-index: 2;
      }
    }
  }
}
</style>