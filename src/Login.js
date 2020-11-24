import React , {useState} from 'react'
import './Login.css'
import logo from '../src/images/amazonLogo.jpg'
import { Link, useHistory} from 'react-router-dom'
import { auth } from './firebase'

function Login() {

    //create states to track data in the form
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
     //this is the sign in function
     const signIn = e =>{
         //prevents it from reloading
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then(auth =>{

            history.push('/')
             
         })
         .catch(error => alert(error.message))
        
     }

     //this is the register function
     const register = e =>{
         e.preventDefault()
         auth.createUserWithEmailAndPassword(email,password).then((auth) =>{
             //successfully created user
             console.log(auth)
             if (auth){
                history.push('/')
             }
         }).catch(error => alert(error.message))
     }

    return (
        <div className='login'>
            <Link to='/'>
           <img className='login__logo' src = { logo }/> 
           </Link>

        <div className='login__container'>
            <h1>Sign in</h1>
            
            <form>

            <h5>E-mail</h5>
            <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

            <h5>Password</h5>
            <input type = 'password' value={password} onChange={e => setPassword(e.target.value)} />

            <button type = 'submit' className='login__signInButton' onClick = {signIn} >Sign in</button>
            </form>
            <p>
                By signing in you agree to the Amazons conditions for use and sale.
                Please see our Privacy notice, our Cookie notice and our interest  based Ads
                Notice
            </p>

            <button onClick = {register} className='login__registerButton'>Create Amazon Account</button>
        </div>   
    </div>
    )
}

export default Login
