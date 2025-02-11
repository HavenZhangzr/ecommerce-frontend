import React from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'
import { useState } from 'react';
import { useEffect } from 'react';

const Popular = () => {

  const [popularProducts,setpopularProducts] = useState([]);
  useEffect(()=>{
    //http://localhost:4000/popularinwomen
    fetch('https://dailysweets-58cb7c07014c.herokuapp.com/popularinwomen')
  .then((resp) => resp.json())
  .then((data) => { setpopularProducts(data); });
  },[])

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} 
            new_price={item.new_price} old_price={item.old_price}/>})}
      </div>
    </div>
  )
}

export default Popular
