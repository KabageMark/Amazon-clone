import { useStripe , useElements , CardElement} from '@stripe/react-stripe-js';
import axios from './axios';
import React , { useState , useEffect } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import { db } from './firebase';


function Payment() {
    
    const [{basket , user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded ,  setSucceeded] = useState(false);
    const [processing ,  setProcessing] = useState("");

    const [error ,  setError] = useState(null);
    const [disabled ,  setDisabled] = useState(true);
    const [clientSecret ,  setClientsecret] = useState(true);

    const finaltotal = getBasketTotal(basket) * 100
 
    //runs wheen the payment component loads
    useEffect(() => {
        //generate special stripe secret allowing to charge customers
        
        const getClientSecret = async () => {
            //axios is a way of making a request
             const response = await axios({
                 method: 'post',
                 //stripe expects the total in a currencies subunits
                 url: '/payments/create?total='+ finaltotal
             });
             setClientsecret(response.data.clientSecret)
        };

        getClientSecret();
    } , [basket])
    
    console.log('The secret is ' , clientSecret)
      
    const handleSubmit = async (event) => {
          // do all the fancy Stripe staff
          event.preventDefault();
          setProcessing(true)
          const payload = await stripe.confirmCardPayment(clientSecret , {
              payment_method: {
                  card: elements.getElement(CardElement)
              }
          }).then(({ paymentIntent }) => {
          
            db.collection('users').
            doc(user?.uid).
            collection('orders').
            doc(paymentIntent.id).
            set({
               basket:basket,
               amount: paymentIntent.amount,
               created: paymentIntent.created
            })


              //paymentIntent = paymentConfirmation

              setSucceeded(true);
              setError(null);
              setProcessing(false);

              dispatch({
                  type: 'EMPTY_BASKET'
              })

              history.replace('/Orders')

          })
    }

    const handleChange = event => {
        //listen for changes in the card element
        //display any errors as user types card details
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")

  }

    return (
        <div className='payment'>
          <div className='payment__container'>
             <h1>
    Checkout  (<Link to = '/checkout'> {basket?.length} items</Link>)
             </h1>
            {/* payment section - delivery address */}

            <div className='payment__section'>
                 <div className='payment__title'>
                   <h3>Delivery Address</h3>
                 </div>
                 <div className='payment__adrress'>
                     {/* using a ? is called chaining its important if the email is null */}
                     <p> {user?.email}</p>
                     <p> 123 React Lane</p>
                     <p>Los Angeles, CA</p>
                 </div>
            </div>

            {/* payment section - review items */}

            <div className='payment__section'>
            <div className='payment__title'>
               <h3>Review items and Delivery</h3>
            </div>
            <div className='payment__itme'>
                {basket.map( item => (
                    <CheckoutProduct 
                    id  = {item.id}
                    title = {item.title}
                    image = {item.image}
                    price = {item.price}
                    rating = {item. rating}
             
                    />
                ))}
            </div>

            </div>

            {/* payment section - payment method */}

            <div className='payment__section'>
                <div className='payment__title'>
                   <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                     {/* stripe magic will go here */}
                    
                    <form onClick = {handleSubmit}>

                        <CardElement onChange = {handleChange} />
                        <div className = 'payment__priceContainer'>
                        <CurrencyFormat 
                            renderText={(value) => (
                            <h3>
                                Order total: {value}
                            </h3> 
                            )} 
                            decimalScale={2}
                            value = {getBasketTotal(basket)}
                            displayType = {"text"}
                            thousandSeparator = {true}
                            prefix = {"$"}
                   />
                   <button disabled = {processing || disabled || succeeded} >
                       <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                   </button>
                        </div>

                        {/* Errors */}
                            { error && <div>{error}</div>}
                    </form>
                </div>
            </div>

          </div>

        </div>
    )
}

export default Payment
