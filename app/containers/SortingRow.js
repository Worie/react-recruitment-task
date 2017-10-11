import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setSort } from '../actions';
import {
  sortingRow as sortingRowStyling
} from '../styles/sortingRow.scss';
import shortId from 'shortid';

const SortingRow = ({ keys, onSort }) => {
  let content = [];
  keys.forEach(key => {
    content.push(
      <td key={shortId.generate()}>
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
    const ORDER = ['ASC', 'DESC'];
    // This is the case where I'd like to set local state (ASC/DESC individual for each tab)
    // This approach should be reconsidered (new component with its local state?)
    const orderOfSort = {};
    return {
        onSort: sortValue => {
            dispatch(
              setSort({
                key: sortValue,
                // This makes sure that even if the key is undefined, it'll pass 'ASC'
                order: ORDER[Number(Boolean(orderOfSort[sortValue]))]
              })
            );
            // Next time someone click it, it'll be in the negated order
            orderOfSort[sortValue] = !orderOfSort[sortValue];
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortingRow);
