import React, { useState,useEffect } from 'react';
import '../css/detail.css'
import Colors from './Colors';
// import DetailsThumb from './DetailThumb';
import { Form,Alert, Button  } from 'react-bootstrap'
import cargo_pants from '../../images/download.jpeg';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';
import {supabase} from '../../config/supabaseClient'
const Deatail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      // Fetch the data from the product_table
      const { data, error } = await supabase
        .from('products_table')
        .select('*')
        .eq('id', id )
        .single();
        console.log(id );
      if (error) {
        console.log(error);
      } else {
        setProduct(data);
      }
    };

    getProduct();
  }, [id]);

 
  if (!product) {
    return <div>Loading...</div>;
  }
    return(
       <div>
        <div  style={{background:'#333',width:'100%',height:'100%'}} >
<Link href="/shop" style={{color:'white',marginLeft:'60%'}}>product List</Link>
<Link href="/account" style={{color:'white',marginLeft:'100px'}}>dashboard</Link>
<Link href="/" style={{color:'white',marginLeft:'150px'}}>logout</Link>
         </div>
      <div className="app">
         
        {
        //   products.map(item =>(
            <div className="details">
              <div className="big-img">
              <img src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/proImage/${product.product_image}`} alt={product.product_name} />
              </div>

              <div className="box">
                <div className="row">
                  <h2>{product.product_name}</h2>
                  
                </div>
               
                <p>${product.product_price}</p>
                <p>{product.product_desc}</p>
                <p>only {product.product_amount} items left</p>
                
                <Button className='w-100 mb-4'style={{ backgroundColor:' #783584',
color:'white',
fontSize:'15px',
padding: '5px 2px',
borderRadius: '15px',
borderColor:'transparent',
margin:'10px',
width:'150px',
height:'30px',
marginLeft:'80px',
cursor: "pointer"

}} >Buy now</Button>
<p><FaTruck />Free delivery</p>
<Link style={{color:'black',marginTop:'10px'}}>enter your code for delivery availabilty</Link>
<p><FaTruck />Return delivery</p>
<Link style={{color:'black',marginTop:'10px'}}>Free 30 day delivery returns</Link>

              </div>
            </div>
        //   ))
        }
      </div>
      </div>
    );
  };
  export default Deatail;
