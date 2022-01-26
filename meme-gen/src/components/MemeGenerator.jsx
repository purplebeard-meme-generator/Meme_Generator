import React, { Component } from "react";
import "../App.css";
import Draggable from "react-draggable";
import { ScreenCapture } from "react-screen-capture";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";

export class MemeGenerator extends Component {
    constructor() {
    super();
    this.state = {
        font_size: "22",
        topText: "",
        middleText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg",
        allMemeImgs: [],
        color: "red",
        displayColorPicker: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick = () => {
    let randomNumber = Math.floor(
        Math.random() * this.state.allMemeImgs.length
    );
    this.setState({ randomImg: this.state.allMemeImgs[randomNumber].url });
    };

    increaseFont = () => {};
    // we make an API call  and save the data returned to a new state property
    componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
        // returns a promise which we turn into a JS object with the .json() method
        .then((response) => response.json())
        // Then we get the response which is useful to us by pulling the memes array from response.data
        .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
        });
    }

    handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    }

    handleSubmit(event) {
    event.preventDefault();
    // get a random int (index in the array)
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    // get the meme from that index
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    // update the state by updating the randomImg property with randMemeImg
    this.setState({ randomImg: randMemeImg });
    }

    handleScreenCapture = (screenCapture) => {
    this.setState({ screenCapture });
    };

    handleSave = () => {
    const screenCaptureSource = this.state.screenCapture;
    const downloadLink = document.createElement("a");
    const fileName = "react-screen-capture.png";

    downloadLink.href = screenCaptureSource;
    downloadLink.download = fileName;
    downloadLink.click();
    };

    handleClick1 = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
    };

    handleClose = () => {
    this.setState({ displayColorPicker: false });
    };

    handleChange1 = (color) => {
    this.setState({ color: color.rgb });
    };

    render() {
    const styles = reactCSS({
        default: {
        color: {
            width: "36px",
            height: "14px",
            borderRadius: "2px",
            background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
            padding: "5px",
            background: "#fff",
            borderRadius: "1px",
            boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
            display: "inline-block",
            cursor: "pointer",
        },
        popover: {
            position: "absolute",
            zIndex: "2",
        },
        cover: {
            position: "fixed",
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
        },
        },
    });
    const { screenCapture } = this.state;
    console.log(this.state.font_size);
    console.log(screenCapture);
    return (
        <div className="card">
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
            name="middleText"
            placeholder="Middle Text"
            value={this.state.middleText}
            onChange={this.handleChange}
            />
            <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
            />
            <input
            type="number"
            name="font_size"
            placeholder="font size"
            value={this.state.font_size}
            onChange={this.handleChange}
            />
            <div>
            <div style={styles.swatch} onClick={this.handleClick1}>
                <div style={styles.color} />
            </div>
            {this.state.displayColorPicker ? (
                <div style={styles.popover}>
                <div style={styles.cover} onClick={this.handleClose} />
                <SketchPicker
                    color={this.state.color}
                    onChange={this.handleChange1}
                />
                </div>
            ) : null}
            </div>
        </form>

        <form className="meme-" onSubmit={this.handleSubmit}>
            <button className="genBtn">Generate</button>
        </form>
        <ScreenCapture onEndCapture={this.handleScreenCapture}>
            {({ onStartCapture }) => (
            <div className="meme">
                <img src={this.state.randomImg} alt="" />
                <Draggable>
                <h2
                    className="top"
                    style={{ fontSize: Number(this.state.font_size) }}
                >
                    {this.state.topText}
                </h2>
                </Draggable>
                <Draggable>
                <h2
                    className="middle"
                    style={{ fontSize: Number(this.state.font_size) }}
                >
                    {this.state.middleText}
                </h2>
                </Draggable>
                <Draggable>
                <h2
                    className="bottom"
                    style={{ fontSize: Number(this.state.font_size) }}
                >
                    {this.state.bottomText}
                </h2>
                </Draggable>

                <button className="captureBtn" onClick={onStartCapture}>
                Capture
                </button>
            </div>
            )}
        </ScreenCapture>
        <center>
            <img src={this.state.screenCapture} alt="react-screen-capture" />
            <p>
            {this.state.screenCapture && (
                <button className="downloadBtn" onClick={this.handleSave}>
                Download
                </button>
            )}
            </p>
        </center>
        </div>
    );
    }
}

export default MemeGenerator;
