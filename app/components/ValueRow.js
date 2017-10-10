import PropTypes from 'prop-types';
import React from 'react';

const ValueRow = ({ data }) => {
  let content = [];
  Object.keys(data).forEach(key => {
    content.push(
      <td>{data[key]}</td>
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
};

export default ValueRow;
