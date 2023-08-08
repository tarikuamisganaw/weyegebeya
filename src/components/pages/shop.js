import {React,useState,useEffect} from 'react';
import '../css/shop.css';
import cargo_pants from '../../images/download.jpeg';
import black_tote from '../../images/black tote bag.webp';
import crocheted_tote from '../../images/crocheted tote bag.webp';
import new_balance from '../../images/new balance 550.webp';
import nike_shorts from '../../images/nike shorts.webp';
import watch from '../../images/vintage metal watch.webp';
import {supabase} from '../../config/supabaseClient'
import { Form,Alert, Button  } from 'react-bootstrap'
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import {FiLogOut, } from 'react-icons/fi';
import { Link } from "react-router-dom";
function Shop() {
    const [products, setProducts] = useState([]);
 const [bid,setBid]=useState([])
 const navigate=useNavigate()
 const {user,logout}=UserAuth()
   const handleSignOut=async()=>{
try{
await logout()
}catch(error){
   console.log(error)
}
   }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: products, error } = await supabase
          .from('products_table')
          .select('*');
        if (error) {
          console.log('Error retrieving products:', error);
        } else {
          setProducts(products);
          console.log(products)
          
        }
      } catch (error) {
        console.log('Error retrieving products:', error);
      }
    };
    fetchProducts();
  }, []);
  
  return (
    <div>
      <div  style={{background:'#333',width:'100%',height:'35px'}} >
  
  <button onClick={()=>{
  navigate('/account')
}}  style={{backgroundColor:' #333',
  color:'white',
  fontSize:'17px',
  height:'30px',
  width:'150px',
  padding: '10px 10px',
  borderRadius: '5px',
  marginLeft:'100px',
  borderColor:'transparent',
  cursor: "pointer"}}>
<FaUser  style={{marginRight: '5px'}} />dashboard</button>
<button onClick={handleSignOut}  style={{backgroundColor:' #333',
  color:'white',
  fontSize:'17px',
  height:'30px',
  width:'150px',
  padding: '10px 10px',
  borderRadius: '5px',
  marginLeft:'150px',
  borderColor:'transparent',
  cursor: "pointer"}}>
<FiLogOut style={{marginRight: '5px'}} />logout</button>
         </div>
    <h1> Our Products</h1>
    <div className="explore">
    {products.map((product) => (
       <div className="size" key={product.id}>
          <img src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/proImage/${product.product_image}`} alt={product.product_name} />
          <div>
          <h2>{product.product_name}</h2>
          <p style={{marginTop:'2px'}}>${product.product_price}</p>
          <p style={{marginTop:'2px'}}>{product.product_amount} items available</p>
          <p style={{marginTop:'2px'}}>{product.product_desc}</p>
          </div>
          {product.bid_info === 'bid' ? (
            <Link to={`/detail/${product.id}`}>
      <Button className='w-100 mb-4'style={{ backgroundColor:' red',
      color:'white',
      fontSize:'15px',
      padding: '5px 2px',
      borderRadius: '5px',
      borderColor:'transparent',
      margin:'10px',
      width:'100px',
      height:'30px',
      marginLeft:'130px',
      cursor: "pointer"
      
      }}>Auction</Button>
      </Link>
    ) : (
      <Link to={`/shop`}>
        <Button className='w-100 mb-4'style={{ backgroundColor:' #118dda',
        color:'white',
        fontSize:'15px',
        padding: '5px 2px',
        borderRadius: '5px',
        borderColor:'transparent',
        margin:'10px',
        width:'100px',
        height:'30px',
        marginLeft:'130px',
        cursor: "pointer"
        
        }}>Buy Now</Button>
      </Link>
    )}
        </div>
      ))}
    
            
    </div>

    </div>
  );
}
export default Shop;


