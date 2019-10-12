import React from 'react';

const Marker = props => {
  const { numPoints } = props;

  return (
    <div style={{
      display: 'inline-block',
      width: '30px',
      height: '30px',
      backgroundColor: 'yellow',
      borderRadius: '50%',
      position: 'relative'
    }} >
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >{numPoints || ''}</span>
    </div>
  )
}

export default Marker;