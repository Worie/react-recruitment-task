import PropTypes from 'prop-types';
import React from 'react';
import Highlighter from 'react-highlight-words';
import {
  valueRow as valueRowStyling
} from '../styles/valueRow.scss';


const ValueRow = ({
  data,
  filter
}) => {
  let content = [];
  Object.keys(data).forEach(key => {
    content.push(
      <td className={valueRowStyling}>
        <Highlighter
          highlightClassName="YourHighlightClass"
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
