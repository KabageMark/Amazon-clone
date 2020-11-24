import React from 'react'
import './Header.css'
import logo from '../src/images/amazonLogo.jpg'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
// we use the command rfce to create this

function Header() {
  const [{basket , user}, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if ( user ) {
       auth.signOut();
    } else {
      
    }
  }
    return (
        <div className="header">
            <Link to='/'>
            <img className="header__logo" src= { logo } />

            </Link>

            <div className="header__search" >

                <input className="header__searchInput" type="text" />
                <SearchIcon className='header__searchIcon'/>
                { /* logo  */ }

            </div>
            <div className="header__nav" >
              <Link to= { !user && '/login'} >
                 <div onClick = {handleAuthentication} className="header__option">
                      <span className='header__optionLineOne'>
                        { user ? user.email : 'hello Guest'}
                      </span>
                      <span className='header__optionLineTwo'>
                        { user ? 'Sign out' : 'Sign in'}
                      </span>
                 </div>
                 </Link>

                 <Link to='/orders'>
                 <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Returns
                      </span>
                      <span className='header__optionLineTwo'>
                        Orders
                      </span>
                 </div>
                 </Link>
                 
                 <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Your
                      </span>
                      <span className='header__optionLineTwo'>
                        Prime
                    </span>
                 </div>

                <Link to='/checkout'>
                <div className='header__optionBasket'>
                     <ShoppingBasketIcon />
                     <span className='header_optionLineTwo' className='header_basketCount'>
                       {/* //option chaining for running the program smoothly incase of an error */}
                               {basket?.length}
                     </span>
                 </div>
                </Link>
                
            </div>
        </div>
    )
}

export default Header
