import { axios } from '../libs/axios/api.request'

// 取得網站config
export const getSiteConfig = ()=>{
  let postData = {
    url: '/frontend/v1/config',
    method: 'get',
  }
  return axios.request(postData) 
}


//『用戶』取得登入簡訊 - loginSms
export const loginSms = data => {
  let postData = {
    url: '/frontend/v1/live/loginSms',
    method: 'post',
    data }
    return axios.request(postData);
}


//直播相關功能
export const getLive = data => {
  const postData = {
    url:'/frontend/v1/live/proxyRequest',
    method:'post',
    data,
  }
  return axios.request(postData);
}
//好友註冊明細
export const getRegisterFriend = data => {
  const postData = {
    url:'/frontend/v1/live/friendRegisterSendList',
    method:'post',
    data,
  }
  return axios.request(postData);
}

//好友遊戲明細
export const getFriendGameDetail = data => {
  const postData = {
    url:'/frontend/v1/agency/lowerFinance21',
    method:'post',
    data,
  }
  return axios.request(postData);
}

//好友儲值明細
export const getDepositFriend = data => {
  const postData = {
    url:'/frontend/v1/live/friendDepositSendList',
    method:'post',
    data,
  }
  return axios.request(postData);
}

//好友返還明細
export const getJinguanJiaRule = data => {
  const postData = {
    url:'/frontend/v1/jinguanjiaRuleList',
    method:'post',
    data,
  }
  return axios.request(postData);
}

// 好友註冊邀請碼
export const inviteFriendsToRegister = data => {
  const postData = {
    url:'/frontend/v1/inviteFriendsToRegister',
    method:'post',
    data,
  }
  return axios.request(postData);
}
// 更新好友註冊邀請碼
export const updateAgencyByCode = data => {
  const postData = {
    url:'/frontend/v1/live/updateAgencyByCode',
    method:'post',
    data,
  }
  return axios.request(postData);
}

// 充提紀錄 --- 儲值
export const getDepositRecord = (params) => {
  let postData = {
    url: '/frontend/v1/member/account-money-record/deposit',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 充提紀錄 --- 提現
export const getWithdrawalRecord = (params) => {
  let postData = {
    url: '/frontend/v1/member/account-money-record/withdrawals',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 仿造悠悠下注紀錄group 個平台 
// date=2021-04-19
export const getGroupBetRecordList = (params) => {
  let getData = {
    url: '/frontend/v1/live/member/bet-record/list',
    method: 'get',
    params
  }
  return axios.request(getData)
}

// 下注记录 - 列表
export const getBetRecordList = (params) => {
  let postData = {
    url: '/frontend/v1/member/bet-record/list',
    method: 'get',
    params
  }
  return axios.request(postData)
}


// 取得 投注遊戲紀錄 近7天，本月，上月
export const getBetRecordListAll = (data) => {
  let postData = {
    url: '/frontend/v1/getBetList',
    method: 'post',
    data
  }
  return axios.request(postData)
}