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
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";

function Shop() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
 const [bid,setBid]=useState([])
 const [modal, setModal] = useState(false);
 const navigate=useNavigate()
 const {user,logout}=UserAuth()
 const totalPrice = cart.reduce((total, product) => total + product.product_price * product.product_amount, 0);
 const removeFromCart = (id) => {
  const updatedCart = cart.filter((product) => product.id !== id);
  setCart(updatedCart);
};

const updateQuantity = (id, quantity) => {
  const updatedCart = cart.map((product) =>
    product.id === id ? { ...product, product_amount: quantity } : product
  );
  setCart(updatedCart);
};
 const addToCart = (product) => {
  setCart([...cart, product]);
  setModal(true);
};

 const toggleModal = () => {
  setModal(!modal);
};
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
      // <Link to={`/shop`}>
        <Button className='w-100 mb-4'  onClick={() => addToCart(product)} style={{ backgroundColor:' #118dda',
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
        
        }}>add to cart</Button>
      // </Link>
    )}
        </div>
      ))}
    
            
    </div>
    {modal && (
  <div className="modal">
    <div onClick={toggleModal} className="overlay"></div>
    <div className="modal-content" style={{width:'500px'}}>
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
          <th>product image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
  {cart.map((product) => (
    <tr key={product.id}>
    <td>
    <img
      src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/proImage/${product.product_image}`} 
      style={{width:'70px',height:'70px'}}
      alt={product.product_name}
    />
  </td>
      <td>{product.product_name}</td>
      <td>${product.product_price}</td>
      <td>
        <input
          type="number"
          value={product.product_amount}
          onChange={(e) => updateQuantity(product.id, e.target.value)}
        />
      </td>
      <td>{product.product_desc}</td>
     
      <td>
        <Button   style={{backgroundColor:' red',borderRadius: '5px',
      borderColor:'transparent',}} onClick={() => removeFromCart(product.id)}>Remove</Button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
     
      <div className="total-price">Total price:${totalPrice}</div>
      <Button    style={{ backgroundColor:' #118dda',
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
        
        }}>order</Button>
       
      <Button className='close-modal' onClick={toggleModal}>
        <AiOutlineClose />
      </Button>
    </div>
  </div>
)}

    </div>
  );
}
export default Shop;


