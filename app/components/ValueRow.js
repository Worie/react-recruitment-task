import PropTypes from 'prop-types';
import React from 'react';
import Highlighter from 'react-highlight-words';

const ValueRow = ({
  data,
  filter
}) => {
  let content = [];
  Object.keys(data).forEach(key => {
    content.push(
      <td>
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
  data: PropTypes.array,
  filter: PropTypes.string
};

export default ValueRow;
