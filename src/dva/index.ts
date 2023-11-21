import {payloadType, stateType} from "@/dva/dva";

export const base = {
  namespace: 'base',
  state: <stateType>{
    userData: null
  },
  reducers: {
    updateName(state: stateType, payload: payloadType){
      return {...state, userData: payload}
    }
  },
  effects: {
    *updataNameData({payload}: {payload: payloadType}, {put}: {put: any}){
      yield put({type: 'updateName', payload})
    }
  },
}
