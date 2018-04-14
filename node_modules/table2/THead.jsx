import React from 'react';
import PropTypes from 'prop-types';

import SortingButton from './SortingButton';

import collection from './collection';

const THead = props => (
  <thead>
    <tr>
      {props.options.columns.map((data, i) => {
          const CSS_HEADER = data.cssHeader ? data.cssHeader : null;
          const CLASS_NAME = data.classCssHeader ? data.classCssHeader : null;
          return (
            <th className={CLASS_NAME} style={CSS_HEADER} key={parseInt(i, 10)}>
              {data.noSorting ?
                <button
                  className="btn btn-link btn-no-link"
                >{ data.title }</button>
            :
                <SortingButton
                  instance={this}
                  service={props.service}
                  data={collection.dataset}
                  options={props.options}
                  element={data}
                />
              }
            </th>
          );
      })}
      {props.options.hiddenActions ? null : (
        <th>
          <button className="btn btn-link btn-no-link">Acciones</button>
        </th>
      )}
    </tr>
  </thead>
);

THead.propTypes = {
    options: PropTypes.object.isRequired,
};

export default THead;
