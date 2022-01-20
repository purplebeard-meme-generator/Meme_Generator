import React, { Component } from 'react'
import '../App.css';

export class MemeGenerator extends Component {
    constructor(){
        super();
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    // we make an API call  and save the data returned to a new state property 
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        // returns a promise which we turn into a JS object with the .json() method
            .then(response => response.json())
        // Then we get the response which is useful to us by pulling the memes array from response.data
            .then(response => {
            const { memes } = response.data
            this.setState({ allMemeImgs: memes })
            })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault()
        // get a random int (index in the array)
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
        // get the meme from that index
        const randMemeImg = this.state.allMemeImgs[randNum].url;
        // update the state by updating the randomImg property with randMemeImg
        this.setState({ randomImg: randMemeImg });
    }

    render() {
        return (
            <div className='card'>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    value={this.state.topText}
                    onChange={this.handleChange}
                    />
                    <input
                    type="text"
                    name="bottomText"
                    placeholder="Bottom Text"
                    value={this.state.bottomText}
                    onChange={this.handleChange}
                    />
                    <div className='genBtn'>
                        <button>Generate</button>
                </div>
                </form>
                
                <div className='meme'>
                    <img src={this.state.randomImg} alt='' />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>

                    {/* <button className="downloadBtn">Download</button> */}
                </div>
                
            </div>
        )       
    }
}

export default MemeGenerator;
