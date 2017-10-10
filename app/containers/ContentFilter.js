import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { filterContent } from '../actions';

//  import { filterableTable } from '../styles/filterableTable.scss';

const ContentFilter = ({ filter, onFilter }) => {
    let input;

    return (
        <label>
          Filter:
            <input
                value={filter}
                ref={node => {input = node;}}
                onChange={() => onFilter(input.value)} />
        </label>
    );
};

ContentFilter.propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: filterText => dispatch(filterContent(filterText))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentFilter);
