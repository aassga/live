<template>
  <div class="level" v-loading="loading">
    <div class="flex-column">
      <img
        class="level-icon mt-2"
        src="@/assets/images/level_big_icon001.png"
      />

      <div class="user-level mt-05">LV.{{ nowLevel }}</div>

      <div class="relative flex-column al-flex-start mt-2" style="width: 90%">
        <div class="flex-row js-flex-end" :style="{ width: nowExp + '%' }">
          <div class="now-exp hide">
            {{ nowExp }}
          </div>
        </div>
        <progress-bar
          class="mt-05 w-100"
          bar-color="#dc720f"
          :val="nowExp"
          bg-color="#fff"
        >
        </progress-bar>
        <div class="exp-text-container w-100 mt-05 flex-row js-space-between">
          <div>经验值</div>
          <div class="flex-row"><span>距离升级：</span><span>{{ nextLevel }}</span></div>
        </div>
      </div>

      <div class="upgrade-level mt-3">
        <div class="flex-column js-space-between h-100">
          <div class="upgrade-text">如何升级</div>
          <div class="flex-row upgrade-items">
            <div class="flex-row item">
              <img class="" src="@/assets/images/level_shoulie001.png" />
              送礼
            </div>
            <!-- <div class="flex-row item">
              <img class="" src="@/assets/images/level_kanbo001.png" />
              看播
            </div>
            <div class="flex-row item">
              <img class="" src="@/assets/images/level_fenxiang001.png" />
              分享
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLive } from "@/api";
import ProgressBar from "vue-simple-progress";
import { Loading } from "element-ui";
export default {
  name: "level",
  data() {
    return {
      loadingInstance: Loading,
      nowExp: 0,
      nextLevel: 0,
      nowLevel: 0,
      formData: {
        service: "User.GetUserLevelInfo",
        uid: this.$route.query.uid,
        token: this.$route.query.token,
      },
      loading: false,
    };
  },
  components: {
    ProgressBar,
  },
  mounted() {
    this.getData(this.formData);
  },
  methods: {
    getData(params) {
      this.loading = true;
      this.loadingInstance.service({
        fullscreen: true,
        spinner: "loading-spinner",
      });
      getLive(params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.nowExp = res.data.info.baifen;
            this.nextLevel = res.data.info.cha;
            this.nowLevel = res.data.info.levelinfo.levelid;
            this.loading = false;
            this.loadingInstance.service().close();
            return;
          }
          this.$message.error(res.message);
          this.loading = false;
          this.loadingInstance.service().close();
        })
        .catch((err) => {
          this.$message.error(err.message);
          this.loading = false;
          this.loadingInstance.service().close();
        });
    },
  },
};
</script>

<style lang="scss" scope>
.level {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/my_level_bg.png") no-repeat top;
  background-size: cover;
  overflow: hidden;

  .level-icon {
    width: 10rem;
  }

  .user-level {
    padding: 0.4rem 1.5rem;
    background: #fff;
    border-radius: 2rem;
    font-size: 18px;
    color: #f47ca2;
  }

  .el-progress {
    width: 100%;
    position: relative;
  }

  .now-exp {
    min-width: 1.6rem;
    text-align: center;
    background: #ec3e6f;
    color: #fff;
    padding: 0.4em 0.2rem;
    border-radius: 0.5rem;
    font-size: 12px !important;
    position: relative;
    transform: translateX(1rem);

    &:after {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      left: 50%;
      bottom: -0.5rem;
      border: transparent 5px solid;
      border-top: #ec3e6f 5px solid;
      transform: translateX(-50%);
    }
  }

  .exp-text-container {
    color: #fff;
    font-size: 12px;
  }

  .upgrade-level {
    width: 24rem;
    height: 12rem;
    background: url("../../assets/images/my_level_infobg.png") no-repeat center;
    background-size: contain;

    .upgrade-text {
      color: #fff;
      margin-top: 1.3rem;
    }

    .upgrade-items {
      font-weight: 100;
      margin-bottom: 4rem;
      .item {
        img {
          width: 1.5rem;
          margin-right: 0.5rem;
        }
        &:nth-child(n + 2) {
          margin-left: 3rem;
        }
      }
    }
  }
}
</style>