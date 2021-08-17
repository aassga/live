<template>
  <div class="contribute-container flex-column">
    <div class="contribute-container-top relative">
      <div class="fire flex-row mt-05">
        <img src="../../assets/images/rank_huoyan_001.png" />
        {{ data.dataFire }}火力
      </div>
      <div v-for="(item, index) in data.dataTop3" :key="item.uid">
        <div :class="[`top top-${index}`]" class="flex-column">
          <img class="crown" src="../../assets/images/my_bang001_ed.png" />
          <img
            class="thumb"
            :src="item.userinfo.avatar_thumb"
            :onerror="defaultImg"
          />
          <div class="name">{{ item.userinfo.user_nicename }}</div>
          <template v-if="item.uid">
            <img
              class="level-thumb mt-05 mb-05"
              :src="item.userinfo.level_info.thumb"
            />
            <div class="name" v-show="item.diff_total && item.diff_total !== 0">
              落后 {{ item.diff_total }} 火力
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="contribute-container-bottom w-100 js-space-around">
      <div
        class="list flex-row js-flex-start"
        v-for="(item, index) in data.dataTotal"
        :key="item.uid"
        v-show="index > 2 && index < 30"
      >
        <div class="sort">
          {{ index + 1 }}
        </div>
        <img
          class="thumb"
          :src="item.userinfo.avatar_thumb"
          :onerror="defaultImg"
        />
        <div class="flex-column al-flex-start">
          <div class="flex-row mb-05">
            <div class="name">{{ item.userinfo.user_nicename }}</div>
            <img
              v-if="item.userinfo.user_nicename !== '虚位以待'"
              class="level-thumb"
              :src="item.userinfo.level_info.thumb"
            />
          </div>
          <div v-if="item.userinfo.user_nicename !== '虚位以待'" class="name">落后{{ item.diff_total }}火力</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "anchorContributeRank",
  props: ["data", "defaultImg"],
};
</script>