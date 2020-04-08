import React, { Fragment } from 'react';
import spinner from '../../img/spinner.gif';

export const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: '75px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </Fragment>
  );
};

export default Spinner;
