import React, { useEffect } from 'react';
import './Loading.css'

function Loading(props) {
  useEffect(() => {
    const box = document.querySelectorAll(".box");
    const interval = 100;

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    function loading() {
      box.forEach(function (item, index) {
        setTimeout(async function () {
          box[index].style.animation = "loading_anim 1s cubic-bezier(0,.59,.37,1)";
          await sleep(1000);
          box[index].style.animation = "";
        }, index * interval);
      });
    }

    loading();
    setInterval(loading, 1750);
  }, []);
  
  return (
    <div className="loading-container">
      <div className="box"><span className="txt">L</span></div>
      <div className="box"><span className="txt">o</span></div>
      <div className="box"><span className="txt">a</span></div>
    </div>
  );
}

export default Loading;
