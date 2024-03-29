import React, { Component } from 'react';

// Import socket.io-client.
import mySocket from 'socket.io-client'; 

class positionApp extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            positionNum: 0,
            positionSelect: "D3 Digital Design Development",
            usersSearched: []
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSearch(ev) {
        this.setState({
            positionSelect: ev.target.value
        });
    }

    handleSubmit() {
        // this.socket = mySocket("http://localhost:10002");
        this.socket = mySocket("https://mediaworks-server.herokuapp.com/");
        this.socket.emit("grabUsers", this.state.positionSelect);
        this.socket.on("displayUsers", function(data) {
            console.log(data);
            this.setState({
                positionNum: 1,
                usersSearched: data
            });
        }.bind(this));
    }

    render() {

        var positionComp;
        var positionNum = this.state.positionNum;

        if (positionNum === 0) {
            positionComp = (
                <div className="wrapper-row">
                    <div className="container left">
                        <div className="content">
                            <h1 className="intro-center"> Your BCIT ID: </h1>
                            <h2 className="positionA"> {this.props.userInput}</h2>
                            <div className="hex"></div>
                        </div>
                    </div>

                    <div className="container right">
                        <div className="content">
                            <h1 className="intro-center"> Looking for a </h1>
                            <select className="positionB" value={this.state.programSelect} onChange={this.handleSearch}>
                                <option value="D3 Digital Design Development"> Graphic Designer </option>
                                <option value="D3 Digital Design Development"> Web Designer </option>
                                <option value="Chemical Engineering"> Chemical Engineering </option>
                                <option value="Carpentry"> Carpentry </option>
                                <option value="Metal Working"> Metal Working </option>
                            </select>
                        </div>
                    </div>

                    <div className="contBtn logoImg" type="submit" onClick={this.handleSubmit}></div>
                </div>
            )
        } else if (positionNum === 1) {
            var usersSearched = this.state.usersSearched.map( (data, index) => {
                return (
                    <button key={index} className="positionBtn" type="submit" onClick={this.props.changePagePC.bind(this, data)}> {data.name} - {data.program} </button>
                );
            });

            positionComp = (
                <div className="wrapper-row">
                    <div className="container left">
                        <div className="content">
                            <h1 className="intro-center"> Your BCIT ID: </h1>
                            <h2 className="positionA"> {this.props.userInput}</h2>
                            <div className="hex"></div>
                        </div>
                    </div>

                <div className="container right">
                    <div className="content">
                        <h1 className="intro-center"> Here are the available people for 'hire' </h1>
                    <div className="posContainer">
                        {usersSearched}
                    </div>
                    </div>
                </div>
                </div>
            )
        }

        return (
            <div>
                {positionComp}
            </div>
        );
    }
}

export default positionApp;
