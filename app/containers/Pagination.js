import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  setPage,
  setNumOfEls
} from '../actions';
import LocalStorage from '../util/localStorage';
import {
  pagination as paginationStyling,
  pageAnchors as pageAnchorsStyling
} from '../styles/pagination.scss';

const Pagination = ({
  fetchedDataLength,
  pagination,
  elPerPage,
  onSetPage,
  onElPerPage
}) => {
  let goToPageInput;
  let elPerPageInput;
  const pageAnchors = [];
  // change into redux state

  for (let i = 0; i < fetchedDataLength / elPerPage; i++) {
    pageAnchors.push(
      <li>
        <a href={`#page${i}`} onClick={() => onSetPage(i)}>
          Page {i}
        </a>
      </li>
    );
  }

  return (
    <nav className={paginationStyling}>
      <label>
        Go to page:
        <input
          type="text"
          value={pagination}
          ref={node => {goToPageInput = node;}}
          onChange={() => {onSetPage(goToPageInput.value);}} />
      </label>
      <label>
        Elements per page:
        <input
          type="text"
          value={elPerPage}
          ref={node => {elPerPageInput = node;}}
          onChange={() => {onElPerPage(elPerPageInput.value); onSetPage(0);}} />
      </label>
      <ul className={pageAnchorsStyling}>
        {pageAnchors}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  onSetPage: PropTypes.func,
  pagination: PropTypes.number,
  elPerPage: PropTypes.number,
  onElPerPage: PropTypes.func,
  fetchedDataLength: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  return {
    pagination: state.pagination,
    elPerPage: state.elPerPage,
    fetchedDataLength: ownProps.fetchedDataLength
  };
};

const mapDispatchToProps = (dispatch) => {
  const forceNumber = numOfEls => {
    const value = Number(numOfEls);
      // Make sure it's not NaN
      if (value !== value || value < 0) {
        return null;
      }
    return value;
  };
  return {
    onSetPage: pageId => {
      if (forceNumber(pageId) === null) {
        return null;
      }
      return dispatch(
        setPage(
          Number(pageId)
        )
      );
    },
    onElPerPage: numOfEls => {
      if (forceNumber(numOfEls) === null) {
        return null;
      }

      const val = (Number(numOfEls) === 0 ? 1 : Number(numOfEls));
      LocalStorage.setItem('elPerPage', val);
      return dispatch(
        setNumOfEls(val)
      );
    }
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);
