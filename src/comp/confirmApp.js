import React, { Component } from 'react';
// import styles from './styles/confirmApp.css';
import styles from './styles/App.css';

// Import socket.io-client.
import mySocket from 'socket.io-client'; 

class confirmApp extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            confirmNum: 0
        };

        this.sendMail = this.sendMail.bind(this);
    }

    sendMail(email) {
        this.socket = mySocket("https://mediaworks-server.herokuapp.com/");
        this.socket.emit("sendMail", this.props.selectedUser.bEmail);
        this.socket.on("successfullySent", function(data) {
            console.log('Mail sent.');
            this.setState({
                confirmNum: 1
            });
        }.bind(this));
    }

    render() {
        var confirmComp;
        var confirmNum = this.state.confirmNum;

        var selectedUsername = this.props.selectedUser.name;
        var userEmail = this.props.selectedUser.bEmail;

        if (confirmNum === 0) {
        
        confirmComp = (
        <div className="wrapper">
            <div className="logoImg"></div>
            <h1 className="mainTxt">Do you want to email</h1>
            <h2 className="secondaryTxt"> {selectedUsername} </h2> 
            <button className="confirmBtn" type="submit" onClick={this.sendMail.bind(this, userEmail)}>Yes</button>
        </div>
            );
        }  else if (confirmNum === 1){
        confirmComp = (
        <div className = "wrapper">
            <h1 className="mainTxt">Thank you for using HIVE </h1>
            <div className="logoImg"></div>
            <h1 className="mainTxt">{selectedUsername} will be contacted </h1>
            <button className="confirmBtn" type="submit" onClick={this.props.changePage.bind(this, 0)}>Reset</button>
        </div>
            )
        }

        return (
            <div>
                <div className="blueSquare"></div>
                {confirmComp}
            </div>
        );
    }
}

export default confirmApp;
