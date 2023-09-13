import React, { useState,useEffect } from "react";
// import nextBlack from '../../images/next-black.png';
import '../../css/home.css'
const HomeSectionTitle = ({ title ,onSelectCategory,onsetSearchQuery }) => {
  return (
    <div className="home__sectiont">
      <span className="home__sectiont--big">{title}</span>
      <div>
        <span className="home__sectiont--small"  onClick={() => {onSelectCategory(null) 
         onsetSearchQuery('') }}>See all</span>
        {/* <img src={nextBlack} alt="next"/> */}
      </div>
    </div>
  );
};

export default HomeSectionTitle;