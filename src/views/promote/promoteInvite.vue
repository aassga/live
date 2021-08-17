<template>
  <div class="promote-invite">
    <div class="banner_invite mb_1" v-loading="loading">
      <img src="../../assets/images/game.jpg" width="100%" alt="" />
      <div class="inviteCode">
        <h3>{{ inviteCode }}</h3>
        <span class="hidden" id="inviteCode" :value="inviteCode">{{
          inviteCode
        }}</span>
        <a
          class="btn_orange"
          data-clipboard-action="copy"
          data-clipboard-target="#inviteCode"
          id="inviteCodeBtn"
          >复制邀请码</a
        >
      </div>
    </div>
    <div class="content">
      <ul class="list_item">
        <li class="border_b" @click="openCodeModal">
          <div class="title">我的上级</div>
          <a href="#" class="iconfont icon-right color_default"></a>
        </li>
        <li>
          <p>
            邀请须知:<br />每个用户都有自己的邀请码，只要您邀请的用户输入您的邀请码，对方充值时您将获得一定的分成奖励。
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { inviteFriendsToRegister, updateAgencyByCode } from "@/api";
export default {
  name: "promoteInvite",
  data() {
    return {
      loading: false,
      inviteCode: "123456",
    };
  },
  mounted() {
    this.getCode();
    this.initClipboard();
  },
  methods: {
    getCode() {
      this.loading = true;
      let params = {
        activityType: "getInvitation",
      };
      inviteFriendsToRegister(params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.inviteCode = res.data.code;
            this.$nextTick(function () {
              this.setInviteCode();
            });
            this.loading = false;
            return;
          }
          this.$message.error(res.message);
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error(err.message);
          this.loading = false;
        });
    },
    updateCode(code) {
      if (!code.trim()) {
        this.$message({
          type: "warning",
          message: "请输入邀请码",
        });
        return;
      }
      this.loading = true;
      let params = {
        invite_code: Number(code),
        device: this.getMobileOperatingSystem(),
      };
      updateAgencyByCode(params)
        .then((res) => {
          if (res != undefined && res.code == 200) {
            this.$message({
              type: "success",
              message: res.data.message,
            });
          } else {
            this.$message({
              type: "warning",
              message: res.message,
            });
          }
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error(err.message);
          this.loading = false;
        });
    },
    setInviteCode() {
      // 邀請碼
      const inviteCodeTxt = document.querySelector(".inviteCode h3");
      const addSpan = (text) => {
        return [...text].map((letter) => `<span>${letter}</span>`).join("");
      };
      inviteCodeTxt.innerHTML = addSpan(inviteCodeTxt.textContent);
    },
    openCodeModal() {
      this.$prompt("请输入上级邀请码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9\s]*$/,
        inputErrorMessage: "请输入数字",
        center: true,
      })
        .then(({ value }) => {
          if (!value) {
            this.$message({
              type: "warning",
              message: "请输入邀请码",
            });
            return;
          }
          this.updateCode(value);
        })
        .catch(() => {});
    },
    initClipboard() {
      // 複製邀請碼
      let vm = this;
      var clipboard = new ClipboardJS("#inviteCodeBtn");
      clipboard.on("success", function (e) {
        vm.$message({
          type: "success",
          message: "已复制 " + e.text,
        });
        e.clearSelection(); //取消選取
      });

      clipboard.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
      });
    },
    getMobileOperatingSystem() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent)) {
        return "android";
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
      }
      return "android";
    },
  },
};
</script>

<style lang="scss" scope>
.promote-invite {
  .border_b {
    border-bottom: 1px solid #e4e4e4;
  }
  .color_default {
    color: #ff5777 !important;
  }

  .mb_1 {
    margin-bottom: 1rem;
  }

  .banner_invite {
    position: relative;
  }
  .banner_invite .inviteCode {
    position: absolute;
    top: 10rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .invite_friend_btn {
    position: absolute;
    left: 0;
    width: 100%;
    top: 42%;
    text-align: center;
  }

  .inviteCode {
    text-align: center;
    display: flex;
    flex-direction: column;
    padding-bottom: 6%;
    justify-content: flex-end;
    align-items: center;
  }
  .inviteCode .hidden {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
  .inviteCode h3 {
    margin-bottom: 1rem;
    display: flex;
  }
  .inviteCode h3 span {
    border-radius: 0.25rem;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    width: 2.5rem;
    height: 2.5rem;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.25rem;
    font-family: Avenir;
    font-weight: normal;
  }
  @media (min-width: 575px) {
    .inviteCode h3 span {
      width: 3rem;
      height: 3rem;
    }
  }

  .btn_orange {
    border-radius: 50px;
    background-image: linear-gradient(-145deg, #ffe985 0%, #fa742b 100%);
    color: #fff;
    padding: 0.55rem 2rem;
    display: inline-block;
    font-size: 1.2rem;
  }

  ul.list_item {
    background: #fff;
    padding: 0 1rem;
  }
  ul.list_item li {
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
  }
  ul.list_item li .title {
    font-weight: bold;
    color: #666666;
  }
  ul.list_item li .icon_img {
    margin-left: 1rem;
  }
  ul.list_item li .icon_img img {
    width: 1.3rem;
  }
  ul.list_item p {
    color: #999999;
    line-height: 1.5;
  }

  .content {
    background: #fff;
  }
}
/* .el-message-box start */
.el-message-box {
  width: 90% !important;
  border-radius: 1rem;
}

.el-message-box__btns .el-button {
  border: 0 !important;
  border-radius: 2rem;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
}
.el-message-box__btns .el-button--primary {
  width: 90%;
  height: 3rem;
  background: linear-gradient(#f23b65, #f65687);
}
.el-message-box__btns .el-button:nth-child(1) {
  display: none;
}
/* .el-message-box end */
</style>