<template>
  <div class="promote">
    <div class="promote-bg">
      <div class="promote-Content">
        <div class="promote-title">
          <img src="../../assets/images/promoteh1.png" alt="">
          <img src="../../assets/images/promoteh2.png" alt="">
        </div>
        <router-link class="promote-invite-friend" :to="{ name: 'promoteInvite' }">
          <img src="../../assets/images/invite_friend_btn.png" alt="">
        </router-link>
        <!-- <div class="promote-invite-friend" @click="QRcodeInvite">
          <img src="../../assets/images/invite_friend_btn.png" alt="">
        </div> -->
        <div class="promote-detail">
          <ul>
            <li>
              <router-link class="item" :to="{ name: 'friend' }">
                <div><img src="../../assets/images/icon_friend.png" alt=""></div>
                <div>
                  <span>好友註冊</span>
                  <span>送50積分</span>
                </div>
                <div>查看明細 >></div>
              </router-link>  
            </li>
            <li>
              <router-link class="item" :to="{ name: 'stored' }">
                <div><img src="../../assets/images/icon_money.png" alt=""></div>
                <div>
                  <span>好友儲值</span>
                  <span>獎勵5%</span>
                </div>
                <div>查看明細 >></div>
              </router-link>  
            </li>
            <li>
              <router-link class="item" :to="{ name: 'friendGameDetail' }">
                <div><img src="../../assets/images/icon_game.png" alt=""></div>
                <div>
                  <span>好友遊戲</span>
                  <span>高額返水</span>
                </div>
                <div>查看明細 >></div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>    
    </div>

  </div>
</template>
<script>
export default {
  name:"promote",
  data(){
    return {

    }
  },
  mounted(){ },
  methods: { 
    goBack() {
      this.$router.go(-1);
    },
    QRcodeInvite(){

    },
  }
}
</script>

<style lang="scss" scope>
  .promote{
    .promote-bg{
      background-image: url('../../assets/images/promote-bg.png');
      background-repeat: no-repeat;
      background-size: cover;
      width: 100vw;
      height: 100vh;
      .promote-Content {
        .promote-rule{
          width: 1em;
          height: 6.2em;
          position: absolute;
          right: 0;
          background-color: #5c0347;
          -ms-writing-mode: tb-lr;
          writing-mode: vertical-lr;
          color: #FFF;
          top: 6em;
          border-radius: 10px 0 0 10px;
          padding: 0 6px;
        }
        .promote-title{
          padding: 2em 0 0 0.5em;
          img{
            &:nth-child(1){
              height: 25vw;
            }
            &:nth-child(2){
              height: 13vw;
            }
          }
        }
        .promote-invite-friend{
          margin: 3em auto;
          img{
            height: 4.7em;
          }
        }
        .promote-detail{
          padding: 0 8px;
          ul{
            display: flex;
            justify-content: space-between;
            li{
              width: 31vw;
              height: 25vh;
              background-image: url('../../assets/images/borderlight.png');
              background-repeat: no-repeat;
              background-size: contain;
              a{
                text-decoration: none;
                div{
                  padding-bottom:0.5vw;
                  &:nth-child(1){
                    img{
                      height: 11vw;
                      padding-top:2.5vw
                    }
                  }
                  &:nth-child(2){
                    font-size: 15px;
                    color: #f0d58c;
                    span{
                      display: block;
                      line-height: 1.2em;
                    }
                  }
                  &:nth-child(3){
                    font-size: 13px;
                    font-weight: 500;
                    color: #f3c23b;
                    padding-top: 10px;
                  }
                }
              }

            }
          }
        }
      }
    }
  }
</style>