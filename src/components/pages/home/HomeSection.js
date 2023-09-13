import React, { useState,useEffect } from "react";
import HomeSectionItem from './HomeSectionItem';
import HomeSectionTitle from './HomeSectionTitle';
import '../../css/home.css'

const HomeSection = ({ title, data,onSelectCategory,selectedCategory,onsetSearchQuery   }) => {
  

  if (!data || !data.length) return <></>;
 

  return (
    <div className="home__section">
      <HomeSectionTitle title={title} onSelectCategory={onSelectCategory} onsetSearchQuery={onsetSearchQuery}/>
      <div className="home__sectionc">
      {data.map((item) => (
          <HomeSectionItem
            onClick={() => onSelectCategory(item.category, selectedCategory)}
            key={item.id}
            item={item}
            selectedCategory={selectedCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSection;