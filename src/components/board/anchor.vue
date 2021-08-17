<template>
  <div class="contribute-container flex-column">
    <div class="contribute-container-top relative">
      <div
        v-for="(item, index) in currentData.dataTop3"
        :key="item.user_nicename + Math.random(1, 100000)"
      >
        <div :class="[`top top-${index}`]" class="flex-column">
          <div
            class="avatar-container relative"
            @click="enterLiveRoom(item.is_live, item.uid)"
          >
            <img class="crown" src="../../assets/images/my_bang001_ed.png" />
            <div v-show="item.is_live" class="live-gif"></div>
            <img class="thumb" :src="item.avatar_thumb" :onerror="defaultImg" />
          </div>
          <div @click="goToAnchorInfo(item.uid)">
            <div class="name name-title">{{ item.user_nicename }}</div>
            <img
              v-if="item.user_nicename !== '虚位以待'"
              class="level-thumb"
              :src="item.level_info.thumb"
            />
            <div
              v-show="item.user_nicename !== '虚位以待'"
              class=" name name-top3"
            >
              {{index > 0 ? '落后' + item.totalcoin_diff + '火力'  : ' '}}
            </div>
          </div>
          <div v-if="index === 0" class="empty-box"></div>
          <div
            @click="followAnchor(item.uid)"
            v-show="item.user_nicename !== '虚位以待' && showFollow"
            class="follow"
          >
            {{ item.is_attension ? "取消关注" : "关注" }}
          </div>
          <div v-if="item.user_nicename === '虚位以待'" class="empty-box-L"></div>
        </div>
      </div>
    </div>
    <div class="contribute-container-bottom w-100 js-space-around">
      <div
        class="list flex-row js-flex-start relative"
        v-for="(item, index) in currentData.dataTotal"
        :key="item.user_nicename + Math.random(1, 100000)"
        v-show="index > 2 && index < 30"
      >
        <div class="sort">
          {{ index + 1 }}
        </div>
        <div class="flex-row" v-if="item.user_nicename === '虚位以待'">
          <img class="thumb mr-05" :src="item.avatar_thumb" :onerror="defaultImg" />
          <div class="name">{{ item.user_nicename }}</div>
        </div>
        <div class="flex-row" v-else>
          <div
            class="relative"
            @click="enterLiveRoom(item.is_live, item.uid)"
          >
            <div v-show="item.is_live" class="live-gif"></div>
            <img class="thumb mr-05" :src="item.avatar_thumb" :onerror="defaultImg" />
          </div>
          <div
            class="flex-column al-flex-start"
            @click="goToAnchorInfo(item.uid)"
          >
            <div class="flex-row mb-05">
              <div class="name bottom-nickname">{{ item.user_nicename }}</div>
              <img
                v-if="item.user_nicename !== '虚位以待'"
                class="level-thumb"
                :src="item.level_info.thumb"
              />
            </div>
            <div class="name name-behind">落后{{ item.totalcoin_diff }}火力</div>
          </div>
        </div>
        <div
          @click="followAnchor(item.uid)"
          v-show="item.user_nicename !== '虚位以待' && showFollow"
          class="follow flex-row"
        >
          {{ item.is_attension ? "取消关注" : "关注" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "c-board-anchor",
  props: {
    currentData: {
      default: "",
    },
    showFollow: {
      type: Boolean,
      default: false,
    },
    defaultImg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    goToAnchorInfo(uid) {
      this.$emit("goToAnchorInfo", uid);
    },
    enterLiveRoom(is_live, uid) {
      this.$emit("enterLiveRoom", is_live, uid);
    },
    followAnchor(uid) {
      this.$emit("followAnchor", uid);
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-container {
  flex-grow: 1;
}

.empty-box {
  height: 26px;
}

.empty-box-L {
  height: 36%;
}

.record-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .record {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
</style>