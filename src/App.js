import React , { useEffect } from "react";
import './App.css';
import Header from './Header'
import Home from './Home'
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import Payment from "./Payment";
import { loadStripe} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

//this is a public key
const promise = loadStripe('pk_test_51HluxEB0BcMb1Kt62jjwQizIenfMnUPEQyzzjlewigiN7YoCXRwwYpHHsQgFoDkImlvmSJ8lzunTIIe2hGBXWN9b00G8gncoRe');


function App() {

const [{} , dispatch] = useStateValue();

  useEffect( () => {
    //will only rub once the app component runs
    auth.onAuthStateChanged(authUser => {
      console.log( ' THE USER IS >>>>', authUser )

      if ( authUser ) {
        //the user just logged in 

        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        //the user is logged out
        dispatch({
          type:'SET_USER',
          user: null
        })
      }
    })

  }, [])

  return (
    <Router>
      
    <div className="app">
        
      <Switch>
      
      <Route path='/Orders'>
        < Header/> 
          <Orders />
        </Route>

      <Route path='/login'>
          
          <Login/>
        </Route>

    
        <Route path='/checkout'>
        < Header/> 
          <Checkout/>
        </Route>

        <Route path='/payment'>
        < Header/> 
          <Elements stripe = {promise}>
          < Payment />
          </Elements>
          
        </Route>

       {/* make sure the default route is always at the bottom */}
        <Route path='/'>
        < Header/> 
           < Home/>

        </Route>

        </Switch>
        

    </div>
    </Router>
  );
  }

export default App;
