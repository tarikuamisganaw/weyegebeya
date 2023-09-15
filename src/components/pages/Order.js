import {React,useState,useEffect} from 'react';
import {supabase} from '../../config/supabaseClient'
import SideBar from './SideBar';
import '../css/shop.css';
import { UserAuth } from "../../context/AuthContext";
import { FaTrash } from 'react-icons/fa';
import Header from './Header';
const Order = () => {
    const [products,setProducts]=useState([])
    const {user,logout}=UserAuth()
    const handleDelete = async (productId) => {
      try {
        const { error } = await supabase
          .from('ordering')
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
            .from('ordering')
            .select('*')
            
    
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
        <h2>ordered items</h2>
        <table>
          <thead>
            <tr>
            <th> id</th>
              <th>Number of items ordered</th>
              <th>Total Price</th>
              <th>User id</th>
             
            </tr>
          </thead>
          <tbody>
    {products.map((product) => (
      <tr key={product.id}>
      
      <td>{product.id}</td>
        <td>{product.no_items}</td>
        <td>${product.total_price}</td>
        
        <td>
        <div class="cart-quantity">
      
      <span>{product.user_id}</span>
      
    </div>
        </td>
        
        <td><button onClick={() => handleDelete(product.id)} style={{color:'red'}}>
      <FaTrash />
    </button></td>
        
      </tr>
    ))}
  </tbody>
        </table>
       
      </div>
    )
}

export default Order
