import * as types from "./mutation-types";

const mutations = {
  [types.SET_SINGER](state: any, singer: any) {
    state.singer = singer;
  }
};

export default mutations;
