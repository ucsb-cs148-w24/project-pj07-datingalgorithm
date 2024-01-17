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
        <div className="home">
            <h1>Blindly</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? 'Signout' : 'Create Account'}
            </button>
        </div>
        </div>
    )
}
export default Home