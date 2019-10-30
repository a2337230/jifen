import ajax from './ajax'
const BASE_URL = ''
// const BASE_URL = 'https://www2.xlxt.net'
// ------------------------------------------------------------------------
export const GetCoinGiftRanking = (params) => ajax(BASE_URL + '/CoinGiftView/GetCoinGiftRanking', params)
export const GetAllDepartmentType = (params) => ajax(BASE_URL + '/Department/GetAllDepartmentType', params)
export const GetXLCoinRanking = (params) => ajax(BASE_URL + '/CoinGiftView/GetXLCoinRanking', params)

