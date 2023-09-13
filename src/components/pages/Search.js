import React, {useState} from 'react'
import '../css/search.css'
import arrow from '../../images/arrow.svg';
import search from '../../images/search.png';


const Search = ({ onsetSearchQuery}) => {
   const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="search">
    <div className="search__container">
      <img  className="search__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png" alt="logo" />
      
      <div className="search__form">
        <img className="search__formic" src={search} alt="search" />
        <input className="search__formi" type="text" placeholder="Search by name of the item"    value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}/>
       
      </div>
      <div className="search__forma">
      <button onClick={() => {onsetSearchQuery(searchQuery)
        setSearchQuery('')}}>Search</button>
        
      </div>
    </div>
  </div>
  )
}

export default Search
