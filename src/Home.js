import React from 'react'
import './Home.css'
import homeBanner from '../src/images/amazonhomeBanner.jpg'
import LeanStartup from './images/theLeanStartUp.jpg'
import KenWood from './images/Kenwood-Stand-Mixer.jpg'
import amazonEcho from './images/amazonEcho.jpg'
import FitBit from './images/fitBit.jpg'
import IpadPro from './images/ipadPro.jpg'
import SmartTV from './images/smart-tv.jpg'
import Product from './Product'

function Home() {
    return (
        <div className='home'>
            <div className='home__container'>
                <img className='home__image' src={ homeBanner } />

                <div className='home__row'>
                    

                    <Product id='74358' title = 'The Lean Startup' price = {29.99} image = {LeanStartup} rating = {5}/>
                    <Product id='96739' title = 'Kenwood stand Mixer' price = {100.99} image = {KenWood} rating = {6}/>
                    
                   
                </div>

                <div className='home__row'>
                    <Product id='01256' title = 'The Amazon Echo' price = {30.99} image = {amazonEcho} rating = {3} />
                    <Product id='74356' title = 'Fit Bit Recharger 2' price = {199.99} image = {FitBit} rating = {2} />
                    <Product id='19683' title = 'The Ipad pro 2020' price = {200.99} image = {IpadPro} rating = {6}/>
                    
                </div>

                <div className='home__row'>
                    <Product id='19484' title = 'Samsung Smart tv Curved OLED' price = {1000.99} image = {SmartTV} rating = {6} />

                </div>

            </div>
        </div>
    )
}

export default Home
