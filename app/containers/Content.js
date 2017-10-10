import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
//  import { content } from '../styles/c.scss';
import ContentTable from '../components/ContentTable';
import ContentFilter from '../containers/ContentFilter';

const Content = ({
  visibleContent,
  elPerPage,
  pagination,
  filter,
  sortBy
}) => {
  return (
    <section>
      <h2>
        Content
      </h2>
      <ContentFilter />
      <ContentTable
        visibleContent={visibleContent}
        elPerPage={elPerPage}
        pagination={pagination}
        filter={filter}
        sortBy={sortBy} />
    </section>
  );
};

Content.propTypes = {
  visibleContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  elPerPage: PropTypes.number,
  pagination: PropTypes.number,
  filter: PropTypes.string,
  sortBy: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    visibleContent: state.tabId,
    elPerPage: state.elPerPage,
    pagination: state.pagination,
    filter: state.filter,
    sortBy: state.sortBy
  };
};


export default connect(
    mapStateToProps,
)(Content);
