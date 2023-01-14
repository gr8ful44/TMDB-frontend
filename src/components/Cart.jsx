import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import Payment from "./Payment";

function Cart({ price, cart, setCart, handleChange }) {
   const [totalPrice, setTotalPrice] = useState(0);
   const [isPayment, setIsPayment] = useState(false);

   // popup payment
   const closeEditMode = () => {
      setIsPayment(false);
   };

   const handleRemove = (id) => {
      // เอาทุกตัวยกเว้นตัวที่กดไป setCart ใหม่
      const exceptItem = cart.filter((item) => item.id !== id);
      setCart(exceptItem);
      handlePrice();
   };

   const handlePrice = () => {
      let ans = 0;
      cart.map((item) => (ans += item.quantity * price));
      setTotalPrice(ans);
   };

   const getPosterURL = (poster_path) => {
      return `https://www.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`;
   };

   //ถ้า component นี้ถูก render = handlePrice() ถูกเรียก
   useEffect(() => {
      handlePrice();
   });

   return (
      <div className="cpage">
         {cart.map((item, index) => (
            <div className="cardincart" key={item.id}>
               <div>
                  <div className="imgbox">
                     <img
                        className="imgct"
                        src={getPosterURL(item.poster_path)}
                        alt=""
                     />
                     <p className="titleinct">{item.title}</p>
                  </div>
                  <div className="i-d-btnwrap">
                     <button
                        className="i-d-btn"
                        onClick={() => handleChange(item, -1)}
                     >
                        -
                     </button>
                     <button className="itQ">{item.quantity}</button>
                     <button
                        className="i-d-btn"
                        onClick={() => handleChange(item, +1)}
                     >
                        +
                     </button>
                  </div>
               </div>
               <div className="removecon">
                  <p className="">Quantity : {item.quantity}</p>
                  <div className="tt">
                     <p>$ {price}</p>
                     <button
                        className="removebtn"
                        onClick={() => handleRemove(item.id)}
                     >
                        <TrashIcon />
                     </button>
                  </div>
               </div>
            </div>
         ))}
         <div className="total">
            <div className="totalcon">
               <div className="pricecon">
                  <h2 className="ptitle">TOTAL PRICE :</h2>
                  <p className="p">
                     <span className="ps">{totalPrice}</span>$
                  </p>
               </div>
               <button
                  className="paymentbtn"
                  type="submit"
                  onClick={() => setIsPayment(true)}
               >
                  LET DO THIS
               </button>
            </div>
         </div>

         {isPayment && <Payment closeEditMode={closeEditMode} />}
      </div>
   );
}

export default Cart;
