import {React,useState,useEffect} from 'react';
import '../css/shop.css';
import { useDispatch,useSelector } from 'react-redux';
import cargo_pants from '../../images/download.jpeg';
import black_tote from '../../images/black tote bag.webp';
import crocheted_tote from '../../images/crocheted tote bag.webp';
import new_balance from '../../images/new balance 550.webp';
import nike_shorts from '../../images/nike shorts.webp';
import watch from '../../images/vintage metal watch.webp';
import {supabase} from '../../config/supabaseClient'
import { Form,Alert, Button  } from 'react-bootstrap'
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import {FiLogOut, } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";
import Header from './Header';
import Search from './Search';
import HomeBanner from './HomeBanner';
import Footer from './common/Footer';
import Sell from './Sell';
import {addCart, decreaseQuantity, removeFromCart,clearCart} from '../../features/CartSlice'
import SideBar from './SideBar';
import swal from 'sweetalert';

import uuid from 'react-uuid';
import HomeSection from './home/HomeSection';

function Shop() {
  
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    let newUserId = uuid(); 

    const toggleModal = () => {
      setModal(!modal);
    };
    const toggleModali = () => {
      setModali(!modali);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const cart=useSelector((state)=>state.cart)
 const [bid,setBid]=useState([])
 const [clist,setclist]=useState([])
 const [modal, setModal] = useState(false);
 const [modale, setModale] = useState(false);
 const [modali, setModali] = useState(false);
 const navigate=useNavigate()
 const {user,logout}=UserAuth()
 const [failMessage, setFailMessage] = useState('');
const  dispatch=useDispatch()
const totalPrice = cart.cartItems.reduce((total, product) => total + product.product_price * product.cartQunatity, 0);
 const handleRemoveCart = (product) => {
 
  dispatch(removeFromCart(product))
};

const decrementCartQuantity = (product) => {
dispatch(decreaseQuantity(product))
};
const incrementCartQuantity = (product) => {
  dispatch(addCart(product))
};
 const addToCart = (product) => {
  if(!user){
    swal ("sigup first to add to cart ")
  }else{
    dispatch(addCart(product))
  setModali(true);
  }
  
};


const handleOrder = async () => {
  setLoading(true);

  // Get total number of items and total price from cart
  const noItems = cart.cartItems.reduce((total, product) => total + product.cartQunatity, 0);
  const totalPrice = cart.cartItems.reduce((total, product) => total + product.product_price * product.cartQunatity, 0);

  // Create array of items from cart
  const items = cart.cartItems.map((product) => ({
    id: product.id,
    image:product.product_image,
    name: product.product_name,
    amount: product.cartQunatity,
    sellerid:product.customer_id,
   
  }));

  // Insert order into order_table
  const { data, error } = await supabase.from('ordering').upsert([
    {
      id: newUserId,
      user_id: user.uid,
      no_items: noItems,
      total_price: totalPrice,
      items: items,
    },
  
  ],{ returning: 'minimal', key: 'items.id' });

  if (error) {
    console.error(error);
  } else {
    // Update product_table with new quantities
    for (const product of cart.cartItems) {
      const { data: updatedProduct, error } = await supabase
        .from('products_table')
        .update({ 
          product_amount: product.product_amount - product.cartQunatity <= 0 
            ? "soldout" 
            : product.product_amount - product.cartQunatity 
        })
        .eq('id', product.id)
        .single();
    
      if (error) {
        console.error(error);
      }
    }

    dispatch(clearCart());
  }

  setLoading(false);
};;
 const toggleModale = () => {
  setModale(!modale);
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
        let supabaseQuery = supabase.from('products_table');
       
        
        // if (selectedCategory) {
        //   supabaseQuery = supabaseQuery.select('*').eq('category',selectedCategory);
        // } else {
          supabaseQuery = supabaseQuery.select('*');
        // }
        
       
        const { data: products, error } = await supabaseQuery;
        
        if (error) {
          console.log('Error retrieving products:', error);
        } else {
          setProducts(products);
          
      
      }
      } catch (error) {
        console.log('Error retrieving products:', error);
      }
    };
    fetchProducts();
  }, [selectedCategory]);
  const filteredProducts = [];
  products.forEach((product) => {
    if (!filteredProducts.some((item) => item.category === product.category)) {
      filteredProducts.push(product);
    }
  });
  
  return (
    <div >
      
      <Header toggleModali={toggleModali} />

<Search onsetSearchQuery={setSearchQuery} searchQuery={searchQuery} />
{/* <HomeBanner/> */}


<HomeSection
        title="Explore popular categories"
        data={filteredProducts}
        onSelectCategory={setSelectedCategory}
        onsetSearchQuery={setSearchQuery}
        
        selectedCategory={selectedCategory}
      />
      
 
    <h1> products</h1>
    <div className="explore">
    {products
  .filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      (!searchQuery || product.product_name.includes(searchQuery))
  ).map((product) => (
       <div className="size" key={product.id}>
          <img src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/proImage/${product.product_image}`} alt={product.product_name} />
          <div>
          <h2>{product.product_name}</h2>
          <p style={{marginTop:'2px'}}>${product.product_price}</p>
          <p style={{marginTop:'2px'}}> items are {product.product_amount} </p>
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
    
    {modali && (
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
            <th>Qunatity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
  {cart.cartItems.map((product) => (
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
      <div class="cart-quantity">
    <Button class="minus-btn" onClick={() => decrementCartQuantity(product)}>-</Button>
    <span>{product.cartQunatity}</span>
    <Button class="plus-btn" onClick={() => addToCart(product)}>+</Button>
  </div>
      </td>
      <td>{product.product_desc}</td>
     
      <td>
        <Button   style={{backgroundColor:' red',borderRadius: '5px',
      borderColor:'transparent',}} onClick={() => handleRemoveCart(product)}>Remove</Button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
     
      <div className="total-price">Total price:${totalPrice}</div>
      <button disabled={loading} onClick={handleOrder} style={{ backgroundColor:' #118dda',
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
        
        }}>
        {loading ? 'Placing order...' : 'Place Order'}
      </button>

     
      
       
      <Button className='close-modal' onClick={toggleModali}>
        <AiOutlineClose />
      </Button>
    </div>
  </div>
)}
 <Footer/>
    </div>
   
  );
}
export default Shop;


