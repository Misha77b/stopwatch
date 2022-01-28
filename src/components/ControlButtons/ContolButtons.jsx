import React from 'react';
import PropTypes from 'prop-types';
import './ContolButtons.scss'

const ContolButtons = (props) => {
    const {start, stop, reset, wait} = props;

  return (
      <div className='btnContainer'>
        <button type="button" className="button is-dark" onClick={start}>
          Start
        </button>
        <button type="button" className="button is-dark" onClick={stop}>
          Stop
        </button>
        <button type="button" className="button is-dark" onClick={reset}>
          Reset
        </button>
        <button type="button" className="button is-dark" onDoubleClick={wait}>
          Wait
        </button>
    </div>
  );
};

export default ContolButtons;

ContolButtons.propTypes = {
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    wait: PropTypes.func.isRequired,
};