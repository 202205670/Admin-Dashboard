import React from 'react';
import './Spinner.css';

const Spinner = ({ size = '36px', color = '#3498db', className = '' }) => {
  return (
    <div
      className={`spinner ${className}`}
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent transparent transparent`,
      }}
    ></div>
  );
};

export default Spinner;
