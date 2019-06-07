import React, { Component } from 'react';

class PlayerCards extends React.Component {
	render(){
		return(
				<>
					{this.props.cards.map((card,i) => {return(
							<img className="playerCards" key={i} src={card} />
						)})}
					

				</>
			)
	}
}

export class Player extends React.Component{
	render(){
		return(
				<div>
					<h1>Player's Cards</h1>
					<PlayerCards cards={this.props.card}/>
				</div>
			)
	}
}