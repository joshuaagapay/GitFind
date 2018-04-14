import React from 'react';
import PropTypes from 'prop-types';

import { sizeObj } from './utils';

const THeadPaginator = props => (
  <thead style={{ display: 'none' }}>
    <tr>
      <td colSpan={sizeObj(props.options.columns) + (1)}>
          -
      </td>
    </tr>
  </thead>
);

THeadPaginator.propTypes = {
    options: PropTypes.object.isRequired,
};

export default THeadPaginator;
