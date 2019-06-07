import React, { Component } from 'react';
import './App.css';
import { Player } from './Player';
import { Dealer } from './Dealer';
import { Hitbutton } from './Hitbutton';
import { Playertotal } from './Playertotal';

class App extends Component {
  state = {
      availablecards : ["AC","AD","AH","AS","2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S","7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","0C","0D","0H","0S","JC","JD","JH","JS","QC","QD","QH","QS","KC","KD","KH","KS"], 
      playerscards:[],
      dealerscards:[],
      playertotal:[0],
      disablebuttons:false
    };
  getRandomCard = () => {
    let cardNumber = Math.floor(Math.random() * Math.floor(this.state.availablecards.length));
    let card = this.state.availablecards[cardNumber];
    this.state.availablecards.splice(cardNumber,1)
    return `https://deckofcardsapi.com/static/img/${card}.png`
  }
  getCardValue = (cardName) =>{
    let cardvalue=0;
    if(cardName[38] === "K" || cardName[38] === "Q" || cardName[38] === "J"  || cardName[38] === "0"){cardvalue=10}
    else if(cardName[38] === "A"){cardvalue=[1,11]}
    else{cardvalue = cardName[38]}
    return cardvalue;
  }
  updatePlayerValue=(cardvalue)=>{
    console.log(cardvalue,this.state.playertotal);
    if(!Array.isArray(cardvalue) && this.state.playertotal.length===1){
      let newplayertotal = parseInt(this.state.playertotal);
      newplayertotal += parseInt(cardvalue);
      if(newplayertotal>21){
        this.setState({disablebuttons:"disabled"});
        this.setState({playertotal:["BUST"]})
      }
      else{
        this.setState({playertotal:[newplayertotal]});
      }
    }
    else{
      this.aceLogic(cardvalue,this.state.playertotal);
    }
  }
  playerHit = () =>{
    let newplayerscards = this.state.playerscards;
    let hitcard = this.getRandomCard()
    newplayerscards.push(hitcard);
    this.setState({playerscards:newplayerscards});
    this.updatePlayerValue(this.getCardValue(hitcard));
  }
  aceLogic = (card1,card2) => {
    if(card1 === card2){
      this.setState({playertotal:[2,12]})
    }
    else if(Array.isArray(card1)){
      let total1 = parseInt(card1[0])+parseInt(card2);
      let total2 = parseInt(card1[1])+parseInt(card2);
      if(total1 > 21 && total2 > 21){this.setState({playertotal:["BUST"]});this.setState({disablebuttons:"disabled"})}
      else if(total1 > 21){this.setState({playertotal:[total2]})}
      else if(total2 > 21){this.setState({playertotal:[total1]})}
      else{this.setState({playertotal:[total1,total2]})}
    }
    else if(Array.isArray(card2)){
      let total1 = parseInt(card2[0])+parseInt(card1);
      let total2 = parseInt(card2[1])+parseInt(card1);
      if(total1 > 21 && total2 > 21){this.setState({playertotal:["BUST"]});this.setState({disablebuttons:"disabled"})}
      else if(total1 > 21){this.setState({playertotal:[total2]})}
      else if(total2 > 21){this.setState({playertotal:[total1]})}
      else{this.setState({playertotal:[total1,total2]})}
    }
  }
  componentDidMount(){
    let newplayerscards = this.state.playerscards;
    let card1=this.getRandomCard();
    let card1val = this.getCardValue(card1);
    newplayerscards.push(card1);
    let card2=this.getRandomCard()
    let card2val = this.getCardValue(card2);
    newplayerscards.push(card2);
    this.setState({playerscards:newplayerscards});
    if(!Array.isArray(card1val) && !Array.isArray(card2val)){
      this.setState({playertotal:[(parseInt(card1val)+parseInt(card2val))]})
    }
    else{
      this.aceLogic(card1val,card2val);
    }
    let newdealerscards = this.state.dealerscards;
    newdealerscards.push(this.getRandomCard());
    newdealerscards.push(this.getRandomCard());
    this.setState({dealerscards:newdealerscards});
  }
  render(){
    return (
      <div className="app">
        <Dealer card={this.state.dealerscards}/>
        <Player card={this.state.playerscards}/>
        <Playertotal values={this.state.playertotal} />
        <Hitbutton hitFunction={this.playerHit} disablebuttons={this.state.disablebuttons}/>
      </div>   
    );
  }
}

export default App;