import React, { Component } from 'react'
import '../App.css';


export class Header extends Component {
    render() {
        return (
            <header className='titleHeader'>
                <img src="https://www.pngall.com/wp-content/uploads/7/Cute-Emoticon-PNG-Download-Image.png" 
                alt='Smile face'
                /> 
                <p style={{fontSize: '2rem'}}>Meme Girls Presents</p>
                <h3 style={{fontSize: '4rem'}}>Meme Generator</h3>
            </header>
        )
    }
}

export default Header;
