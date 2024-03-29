import React, { Component } from 'react';
// import { BrowserRouter } from 'react-router-dom';
import styles from './comp/styles/App.css';

// Import the seperate components.
import PositionApp from './comp/positionApp.js';
import ConfirmApp from './comp/confirmApp.js';

// Import socket.io-client.
import mySocket from 'socket.io-client'; 


class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            userInput: '',
            selectedUser: []
        };
        
        this.signIn = this.signIn.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changePagePC = this.changePagePC.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.studentIDInput = this.studentIDInput.bind(this);
    }

    
    // Use this function when signing in
    signIn() {
        this.setState({
            pageNum: 2
        });
    }

    // Function to change the page
    changePage(num) {
        this.setState({
            pageNum: num,
        });
    }

    // Function to change the page from position to confirm
    changePagePC(user) {
        this.setState({
            pageNum: 3,
            selectedUser: user
        });
    }

    studentIDInput(e) {
        const reg = /[Aa0-9]/gm;
        if (!reg.test(e.key)){
            e.preventDefault();
        } 
    }
    
    handleInput(evt){
        const userInput = evt.target.value;
        this.setState({userInput});

    }



    render() {
        var comp;
        var pageNum = this.state.pageNum;
        
        if (pageNum == 0) {
            comp = (
                <div className="wrapper">
                    <div className="logoImg"> </div>
                    <input
                        
                        ref="testInput"
                        className="bcitID" 
                        type="text" 
                        placeholder="STUDENT ID" 
                        alt="bcitID"
                        onKeyPress={(e) => this.studentIDInput(e)}
                        onChange={(evt)=> {
                            this.setState({userInput: this.refs.testInput.value});
                            console.log(this.state.userInput);
                            }}
                    />
                    <button className="startBtn" type="submit" onClick={this.signIn}>Sign in</button>
                    <h6 className="signupLink"> Click <a href="http://mediaworks-web-app.herokuapp.com/" target="_blank">Here</a>to register. <br/>
                        Or go to http://mediaworks-web-app.herokuapp.com/ on your laptop to register!</h6>
                    <div className="blueSquare"></div>
                </div>
                
            );
        }
        else if (pageNum == 2) {
            comp = <PositionApp 
                        changePagePC={this.changePagePC}
                        userInput={this.state.userInput}
                    />;
        }
        else if (pageNum == 3) {
            comp = <ConfirmApp 
                        changePage={this.changePage}
                        userInput={this.state.userInput}
                        selectedUser={this.state.selectedUser}
                    />;
        }
        
        return (
            <div>
                <div className="bcitHeader">BRITISH COLUMBIA INSTITUTE OF TECHNOLOGY - MEDIAWORKS</div>
                {comp}
                
            </div>
        );
    }
}

export default App;
