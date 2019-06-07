import React, { Component } from 'react';

class Playertotals extends React.Component {
	render(){
		return(
				<>
					{this.props.values.map((value,i) => {
						if(i===0){
							return(
								<h1 className="playerCards" key={i}> {value} </h1>
							)
						}
						else{
							return(
							<h1 className="playerCards" key={i}>{ } or {value} </h1>
							)
						}
					})}

					

				</>
			)
	}
}

export class Playertotal extends React.Component{
	render(){
		return(
				<div>
					<Playertotals values={this.props.values}/>
				</div>
			)
	}
}