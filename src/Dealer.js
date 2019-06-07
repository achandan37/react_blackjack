import React, { Component } from 'react';

class DealerCards extends React.Component {
	render(){
		return(
				<>
					{this.props.cards.map((card,i) => {return(
							<img className="dealerCards" key={i} src={card} />
						)})}
					

				</>
			)
	}
}

export class Dealer extends React.Component{
	render(){
		return(
				<div>
					<h1>Dealer's Cards</h1>
					<DealerCards cards={this.props.card}/>
				</div>
			)
	}
}