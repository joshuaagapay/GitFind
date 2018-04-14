import React from 'react';
import PropTypes from 'prop-types';

import Paginator from './Paginator';

import { sizeObj } from './utils';

import collection from './collection';


const TFooter = props => (
  <tfoot>
    <tr>
      <td colSpan={sizeObj(props.options.columns) + (1)}>
        <Paginator
          updater={props.updater}
          instanceTable={props.instance}
          service={props.service}
          data={collection.dataset}
          options={props.options}
        />
      </td>
    </tr>
  </tfoot>
);

TFooter.propTypes = {
    options: PropTypes.object.isRequired,
    instance: PropTypes.object.isRequired,
    service: PropTypes.object.isRequired,
    updater: PropTypes.object,
};

export default TFooter;
