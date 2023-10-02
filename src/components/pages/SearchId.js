import React, {useState} from 'react'
import '../css/search.css'
import arrow from '../../images/arrow.svg';
import search from '../../images/search.png';


const SearchId = ({ onsetSearchQuery}) => {
   const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="search" style={{height:'90px',marginLeft:'0px'}}>
    <div className="search__container" style={{height:'78px',marginBottom:'0px'}}>
      <div className='logo' style={{width: '500px',marginLeft: '0px'}}> Weye Gebeya</div>
      
      <div className="search__form" style={{marginLeft: '0px'}}>
        <img className="search__formic" src={search} alt="search" />
        <input className="search__formi" type="text" placeholder="Search by name of the item"    value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}/>
       
      </div>
      <div className="search__forma">
      <button onClick={() => {onsetSearchQuery(searchQuery)
        setSearchQuery('')}}>Search</button>
         <button  onClick={() => { 
         onsetSearchQuery('') }}>cancel</button>
        
      </div>
    </div>
  </div>
  )
}

export default SearchId
