import {React,useState,useEffect} from 'react';
import {supabase} from '../../config/supabaseClient'
import SideBar from './SideBar';
import '../css/shop.css';
import { UserAuth } from "../../context/AuthContext";
import { FaTrash } from 'react-icons/fa';
import HeaderExtra from './common/HeaderExtra';
import { useNavigate } from "react-router-dom"
import OrderModal from './OrderModal';
const Order = () => {
    const [products,setProducts]=useState([])
    const {user,logout}=UserAuth()
    const navigate=useNavigate()
    const [selectedOrder, setSelectedOrder] = useState(null);
    const handleSignOut=async()=>{
      try{
      await logout()
      }catch(error){
         console.log(error)
      }
         }
         const handlelog=()=>{
          navigate('/login')
        }
        const handlehome=()=>{
          navigate('/account')
        }
const handleOpenModal = (order) => {
  setSelectedOrder(order);
};

const handleCloseModal = () => {
  setSelectedOrder(null);
};
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
      <div>
      <div className="header">
        <div className="header__actions">
      

      <span className="header__action-title"onClick={handlehome} ><span>Dashboard</span></span>
      <span className="header__action-title" onClick={handleSignOut}><span>Logout</span></span>
      {!user && (
      <span className="header__action-title" onClick={handlelog} ><span>Signin</span></span>
      )}
     
       
       
       
    </div>
    </div>
        
    
        <h2>order information</h2>
        <table>
          <thead>
            <tr>
            <th> id</th>
              <th>Number of items ordered</th>
              <th>Total Price</th>
              <th>Buyer id</th>
             
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
    <td><button onClick={() => handleOpenModal(product)} className="orderb">see detail</button></td>
        
      </tr>
    ))}
  </tbody>
        </table>
        
       
      </div>
      {selectedOrder && (
  <OrderModal order={selectedOrder} onClose={handleCloseModal} />
)}
      </div>
    )
}

export default Order
