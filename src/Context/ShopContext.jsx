import React, { createContext, useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    /*
    是的，useEffect 在你的代码中主要用于 初始化页面数据。通过它可以在组件加载时完成数据的获取，并将数据存储在组件的状态中。
    总结：useEffect 初始化数据的具体流程
    组件首次渲染时触发： 当 React 渲染组件后，useEffect 中的回调函数会被执行。
    数据请求： 在回调函数中，通过 fetch 向服务器请求数据。
    更新状态： 数据获取成功后，通过 setState 方法（如 setAll_Product）更新组件的状态。
    触发重新渲染： 状态更新后，React 自动重新渲染组件，页面上会展示最新的数据。
    简单类比： 就像网页打开时，浏览器向服务器请求网页内容一样，useEffect 起到了“让组件加载后获取数据”的作用.
    */
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
      .then((resp) => resp.json())
      .then((data) => { setAll_Product(data); });

      if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/getcart',{
            method: 'POST',
            headers:{
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem("auth-token")}`,
                'Content-Type':'application/json',
            },
            body:""
        })
        .then((resp)=>resp.json())
        .then((data)=>setCartItems(data));
      }

    },[])

     // 在 cartItems 更新后执行
     useEffect(() => {
        console.log("cartItems", cartItems);
    }, [cartItems]); // 监听 cartItems 的变化

    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId] + 1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({'itemId':itemId})
            })
            // .then((resp)=>resp.json())
            // .then((data)=>console.log(data))
        }
    }
    
    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId] - 1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({'itemId':itemId})
            })
            // .then((resp)=>resp.json())
            // .then((data)=>console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.new_price;
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
      }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart};

    return (
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;