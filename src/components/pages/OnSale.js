import {React,useState,useEffect} from 'react';
import {supabase} from '../../config/supabaseClient'
import SideBar from './SideBar';
import '../css/shop.css';
import { UserAuth } from "../../context/AuthContext";
import { FaTrash } from 'react-icons/fa';
import Header from './Header';
import Footer from './common/Footer';

const OnSale = () => {
  const [products,setProducts]=useState([])
  const {user,logout}=UserAuth()
  const handleDelete = async (productId) => {
    try {
      const { error } = await supabase
        .from('products_table')
        .delete()
        .eq('id', productId);
  
      if (error) {
        console.error(error);
      } else {
        setProducts(products.filter((product) => product.id !== productId));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: products, error } = await supabase
          .from('products_table')
          .select('*')
          .eq('customer_id', user.uid);
  
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
  }, [user.uid]);
  return (
    <div>
       <Header/>
    <div> 
     
      <h2>onsale items</h2>
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
  {products.map((product) => (
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
    
    <span>{product.product_amount}</span>
    
  </div>
      </td>
      <td>{product.product_desc}</td>
      <td><button onClick={() => handleDelete(product.id)} style={{color:'red'}}>
    <FaTrash />
  </button></td>
      
    </tr>
  ))}
</tbody>
      </table>
     
    </div>

    </div>
  )
 
}

export default OnSale
