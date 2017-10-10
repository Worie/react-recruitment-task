import * as types from './types';

export function filterContent(filter) {
  return {
    type: types.FILTER,
    filter
  };
}

export function switchTab(value) {
  return {
    type: types.SHOW_CONTENT,
    value
  };
}

export function setPage(value) {
  return {
    type: types.PAGE,
    value
  };
}

export function setNumOfEls(value) {
  return {
    type: types.NUM_OF_ELS,
    value
  };
}

export function setSort(value) {
  return {
    type: types.SORT_CONTENT,
    value
  };
}

