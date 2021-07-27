import React from 'react';
import Button from './Button';

var Axios = require('axios');

class Home extends React.Component{
    constructor(){
        super();

        this.state = {
            'user': '',
            'userInfo': '',
            'passwordInfo': '',
        }

        this.info_changer = this.info_changer.bind(this)
       
    }


    info_changer(e){
        let value = e.target.value
        let info = e.target.className
        if(info==="UserNameInfo"){
            this.setState(()=>({'userInfo': value}))
        }else if(info==="PasswordInfo"){
            this.setState(()=>({'passwordInfo': value}))
        }
    }

    sign_in(){
        console.log(this.state)
        let get_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, POST, PUT',
            'access-control-allow-origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, X-Requested-With, Access-Control-Allow-Origin'
        }
        const name = this.state.userInfo;
        const pass = this.state.passwordInfo;
        Axios({
            method: 'get',
            url: 'https://cabb2m53ne.execute-api.eu-central-1.amazonaws.com/dev/sign/'+ name+ '/'+pass, //'https://5xb5oab6lk.execute-api.eu-central-1.amazonaws.com/dev/sign',//'http://127.0.0.1:5000/submit_invoice',//'https://5xb5oab6lk.execute-api.eu-central-1.amazonaws.com/dev/invoice',
            headers: get_headers
        }).then(response => {
            this.setState(()=>({user:response['data']['user_name'], userInfo: "", passwordInfo: ""}))
            console.log(response);
        }).catch(error => {
            console.log(error)
        })
    }

    sign_up(){
        console.log(this.state)
        const data = {
            'user_name': this.state.userInfo,
            'password': this.state.passwordInfo
        }
        let post_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, POST, PUT',
            'access-control-allow-origin': '*',
            'Access-Control-Allow-Headers': 'Authorization, Content-Type, Access-Control-Allow-Headers, X-Requested-With, Access-Control-Allow-Origin'
        }
        Axios({
            method: 'post',
            url: 'https://cabb2m53ne.execute-api.eu-central-1.amazonaws.com/dev/sign',//'http://127.0.0.1:5000/submit_invoice',//'https://5xb5oab6lk.execute-api.eu-central-1.amazonaws.com/dev/invoice',
            data: data,
            headers: post_headers
        }).then(response => {
            console.log(response);
            this.setState(()=>({user:response['data']['user_name'], passwordInfo: "", userInfo: ""}))
        }).catch(error => {
            console.log(error)
        })
    }

    show_state(){
        console.log(this.state)
    }

    render() {
        if(this.state['user']===""){
            return <div className="SignPage">
                <input onChange={this.info_changer} type="username" className="UserNameInfo"></input>
                <br></br>
                <input onChange={this.info_changer} type="password" className="PasswordInfo"></input>
                <div onClick={()=>this.sign_in()}>
                    <Button name="Sign In"></Button>
                </div>
                <div onClick={()=>this.sign_up()}>
                    <Button name="Sign Up"></Button>
                </div>
            </div>
        }else{
            return <div onClick={()=>this.show_state()}>
                Hello World
            </div>
        }
    }
}


export default Home