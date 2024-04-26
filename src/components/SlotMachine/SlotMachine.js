import React, { useState, useEffect } from 'react';
import './SlotMachine.css';

const SlotMachine = ({ value }) => {
  return (
    <div className="slot-machine">
    <h1>
  <span className='predict-text'>The&nbsp;</span>
  <span className='predict-text'>song&nbsp;</span>
  <span className='predict-text'>is&nbsp;</span>
  <span className='predict-text'>predicted&nbsp;</span>
  <span className='predict-text'>as&nbsp;</span>
  <span className='predict-text'>&nbsp;{value}.</span> 
</h1>    
  </div>
  );
};

export default SlotMachine;
