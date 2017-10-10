import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { switchTab } from '../actions';
import {
  menu,
  menuWrapper
} from '../styles/menu.scss';

const Menu = ({ onShowContent }) => {
  let li;
  return (
    <nav className={menu}>
      <div className={menuWrapper}>
        <h2>
          Menu
        </h2>
        <ul>
          <li>
            <a href="#showPosts" onClick={() => onShowContent('posts')}>
              Show posts
            </a>
          </li>
          <li>
            <a href="#showComments" onClick={() => onShowContent('comments')}>
              Comments
            </a>
          </li>
          <li>
            <a href="#showAlbums" onClick={() => onShowContent('albums')}>
              Albums
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Menu.propTypes = {
  onShowContent: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    visibleContent: state.tabId.visibleContent
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowContent: contentId => { return dispatch(switchTab(contentId));}
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
