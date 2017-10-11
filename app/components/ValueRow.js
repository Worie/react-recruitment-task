import PropTypes from 'prop-types';
import React from 'react';
import Highlighter from 'react-highlight-words';
import {
  valueRow as valueRowStyling,
  valueRowHighlight
} from '../styles/valueRow.scss';
import shortId from 'shortid';

const ValueRow = ({
  data,
  filter
}) => {
  let content = [];
  Object.keys(data).forEach(key => {
    content.push(
      <td className={valueRowStyling} key={shortId.generate()}>
        <Highlighter
          highlightClassName={valueRowHighlight}
          searchWords={[filter]}
          textToHighlight={String(data[key])}
        />
      </td>
    );
  });

  return (
    <tr>
      {content}
    </tr>
  );
};

ValueRow.propTypes = {
  data: PropTypes.object,
  filter: PropTypes.string
};

export default ValueRow;
