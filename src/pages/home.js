import React from 'react';
import Nav from "../components/Nav"

const Home = () => {  

    const authToken = true
    const handleClick = () => {
        console.log('clicked')
    }

    return (
        <div className='overlay'>
        <Nav/>
        <div className="container">
            <h1>Blindly</h1>
            <h2>Love Blindly, Meet Truly</h2>
            <h3>👻</h3>
            <h4>©</h4>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? 'Log In' : 'Create Account'}
            </button>
        </div>
        </div>
    )
}
export default Home