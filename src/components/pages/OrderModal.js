import {React,useState,useEffect} from 'react';
import {supabase} from '../../config/supabaseClient'
import SideBar from './SideBar';
import '../css/ordermoda.css';
import { UserAuth } from "../../context/AuthContext";
import { FaTrash } from 'react-icons/fa';
import Header from './Header';

const OrderModal = ({ order, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Items in Order {order.id}</h2>
        <table>
          <thead>
            <tr>
            <th>image</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Seller_id</th>
            </tr>
          </thead>
          <tbody>
          {order.items &&
    order.items.map((item) => (
      <tr key={item.id}>
         <td>
    <img
      src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/proImage/${item.image}`} 
      style={{width:'70px',height:'70px'}}
      alt={item.name}
    />
  </td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.sellerid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderModal;
 