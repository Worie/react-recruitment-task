import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setSort } from '../actions';
import {
  sortingRow as sortingRowStyling,
} from '../styles/sortingRow.scss';


const SortingRow = ({ keys, onSort }) => {
  let content = [];
  keys.forEach(key => {
    content.push(
      <td>
        <a href={'#sortBy' + key} onClick={() => onSort(key)}>
          {key}
        </a>
      </td>
    );
  });

  return (
    <tr className={sortingRowStyling}>
      {content}
    </tr>
  );
};

SortingRow.propTypes = {
  keys: PropTypes.array,
  onSort: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    keys: ownProps.keys,
    sortBy: state.sortBy
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSort: sortValue => dispatch(setSort(sortValue))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortingRow);
