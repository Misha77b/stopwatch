import React from 'react';
import './ClockFace.scss';
import PropTypes from 'prop-types';

const ClockFace = (props) => {
    const { time } = props

  return (
    <div className='clock-face'>
        <span className="time-indicators">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="time-indicators">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="time-indicators">
        {("0" + ((time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
};

export default ClockFace;

ClockFace.propTypes = {
  time: PropTypes.number.isRequired,
};
