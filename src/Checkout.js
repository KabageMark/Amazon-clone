import React from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import amazonAd from './images/amazonAd.png'
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal'
function Checkout() {

    const [{basket , user }, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                 <img src={amazonAd}  className='checkout__ad' />

                 <div>
                <h3>hello ,  {user.email}</h3>
                <h1 className='checkout__title' >Your Shopping Basket</h1>
                {basket.map( item =>(

                    <CheckoutProduct 
                        id = {item.id}
                        title = {item.title}
                        image = {item.image}
                        price = {item.price}
                        rating = {item.rating}
                    />
                ))}
                </div>
            </div>

            <div classname = 'checkout__right'>
                <Subtotal />
                <h2>The Subtotal will go here</h2>
            </div>

           
        </div>
    )
}

export default Checkout
