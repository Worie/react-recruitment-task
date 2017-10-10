import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { showContent } from '../actions';
//  import { content } from '../styles/c.scss';

const Content = ({ onShowContent }) => {
  return (
    <nav>
      <ul>
        <li>
          <a href="#opt1" onClick={() => onShowContent(this.props.href)}>
            Opt 1
          </a>
        </li>
        <li>
          <a href="#opt2" onClick={() => onShowContent(this.props.href)}>
            Opt 2
          </a>
        </li>
        <li>
          <a href="#opt3" onClick={() => onShowContent(this.props.href)}>
            Opt 3
          </a>
        </li>
      </ul>
    </nav>
//    <div className={filterableTable}>
//      <input
//        value={filter}
//        ref={node => {input = node;}}
//        onChange={() => onFilter(input.value)} />
//
//      <ProductTable filter={filter} />
//    </div>
  );
};

Menu.propTypes = {
  onShowContent: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowContent: contentId => dispatch(showContent(contentId))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);
