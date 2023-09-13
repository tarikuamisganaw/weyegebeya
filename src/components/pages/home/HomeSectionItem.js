import React, { useState,useEffect } from "react";
import '../../css/home.css'
const HomeSectionItem = ({ item, onClick, selectedCategory }) => {
  if (!item) return <></>;

  return (
    <div
      className={`home__sectioni ${item.category === selectedCategory ? 'active' : ''}`}
      onClick={onClick}
    >
      
      <div className="home__sectionii"><img src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/proImage/${item.product_image}`} alt={item.product_name} />
      </div>
      <span>{item.category}</span>
    </div>
  );
};
  
  export default HomeSectionItem;