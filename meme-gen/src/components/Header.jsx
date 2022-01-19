import React, { Component } from 'react'
import '../App.css';


export class Header extends Component {
    render() {
        return (
            <header>
                <div className='realHeader'>
                    <div className='smileImg'>
                        <img src="https://www.pngall.com/wp-content/uploads/7/Cute-Emoticon-PNG-Download-Image.png" 
                        alt='Smile face'
                        /> 
                    </div>
                    <div className='title'>
                        <p>Meme Girls Presents</p>
                        <p>Meme Generator</p>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;
