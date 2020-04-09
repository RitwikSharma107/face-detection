import React from 'react';
import "./Rank.css";


const Rank = ({name,entries}) =>  {
  return (
    <div id="info" className="center">
        <div className="light-pink f1 pointer"> {`${name}, your current entry count is:`} </div>
        <div className="light-pink f1 pointer"> &nbsp;{entries} </div>
    </div>
  );
}

export default Rank;