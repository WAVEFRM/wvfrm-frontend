import React, { useState, useEffect } from 'react';
import './SlotMachine.css';

const SlotMachine = ({ value }) => {

  return (
    <div className="slot-machine">
    <h2>The song is predicted as.. &nbsp; {value}</h2>
     
      </div>
  );
};

export default SlotMachine;

