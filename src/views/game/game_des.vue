<template>
  <div class="game">
    <div class="header-bar">
      <div class="header-arrow-left">
        <router-link class="item" :to="{ name: 'promote' }">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </div>
      <div class="header-title">遊戲返傭說明</div>
    </div>
    <div class="tabs mb_1">
      <div class="tab_item" v-for="tab in tabs" :key="tab.id" :class="{ 'active': tab.id === currentTab }"
        @click="changeTab(tab.id)">
        {{ tab.className }}
      </div>
    </div>
    <div class="content">
      <ul class="list_item">
        <li>
          <div class="color_default">
            *根据好友的金管家等级存款打码要求进行奖励发放
          </div>
          <div class="color_default">
            *每一游戏类型,每一等级均可发放一次
          </div>
        </li>
        <li>
          <router-link class="item" :to="{ name: 'game_des_rules' }">
            <span class="icon_img">
              <img src="../../assets/images/icon_info.png" alt="" />
            </span>
          </router-link>
        </li>
      </ul>
      <el-table v-if="tableData.length !== 0" :data="tableData" style="width: 99.9%;position: relative;">
        <el-table-column label="好友等级">
          <el-table-column min-width="20%" prop="level" label="ID">
          </el-table-column>
          <el-table-column min-width="20%" prop="betAmount" label="玩家ID">
          </el-table-column>
        </el-table-column>
        <el-table-column label="邀请者门槛奖励">
          <el-table-column min-width="20%" prop="payTotal" label="储值时间">
          </el-table-column>
          <el-table-column min-width="20%" prop="betTotal" label="储值金币">
          </el-table-column>
          <el-table-column min-width="20%" prop="levelGiftMoney" label="奖励金币">
          </el-table-column>
        </el-table-column>
      </el-table>
      <!-- 如果無數據 -->
      <div class="nodata" v-else>
        <div class="img">
          <img src="../../assets/images/nodata.png" alt="" />
          <p>暂无数据</p>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { getJinguanJiaRule } from "@/api";

export default {
  name: "game_des",
  data() {
    return {
      tabs: [],
      currentTab: '',
      dataList: [],
      tableData: [],
    };
  },
  mounted() {
    this.getJinguanJiaRuleData();
  },
  methods: {
    getJinguanJiaRuleData() {
      getJinguanJiaRule()
        .then((res) => {
          if (res.code === 200) {
            let data = res.data;
            data.forEach((item, index) => {
              if (index === 0) this.currentTab = item.id;
              this.tabs.push({
                id: item.id,
                className: item.class_name
              });
              
              this.dataList.push({
                'id': item.id,
                data: item.list
              });
            });
            this.initDataList();
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            });
          }
        }).catch((err) => {
          console.log(err);
          this.$message({
            message: err,
            type: 'warning'
          });
        });
    },
    changeTab(tab) {
      this.currentTab = tab;
      this.tableData = this.dataList.filter(item => item.id === tab)[0].data;
    },
    initDataList() {
      this.dataList.forEach(item => {
        item.data.forEach(list => {
          list.payTotal = list.monthAmountInfo.payTotal;
          list.betTotal = list.monthAmountInfo.betTotal;
        });
      });
      this.changeTab(this.tabs[0].id);
    },
  },
};
</script>

<style lang="scss" scope>
.game {
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
  .tabs {
    background-color: #f3f2f2;
    padding: 0.5em;
    display: flex;
    white-space: nowrap;
    overflow-x: scroll;
    .tab_item {
      width: auto;
      padding: 0.75rem 0.25rem;
      margin: 0 1rem;
      color: #969799;
      &.active {
        color: #323233;
        font-weight: bold;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          height: 3px;
          width: 100%;
          bottom: 0;
          left: 0;
          border-radius: 1.5px;
          background: #ff5777;
        }
      }
    }
  }
  ul.list_item {
    background: #fff;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    li {
      padding: 1em 0;
      text-align: left;
      .title {
        font-weight: bold;
        color: #666666;
      }
      div{
        line-height: 1.5em;
        padding-bottom: 0.8em;
      }
      .icon_img {
        margin-left: 1rem;
        img {
          width: 1.3rem;
        }
      }
    }
    p {
      color: #999999;
      line-height: 1.5;
    }
  }
}
.mb_1 {
  margin-bottom: 1rem;
}
.color_default {
  color: #ff5777 !important;
}
</style>