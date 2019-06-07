import React, { Component } from 'react';


export class Hitbutton extends React.Component{
	render(){
		return(
				<>
					
					<button onClick={this.props.hitFunction} disabled={this.props.disablebuttons}>Hit</button>
				</>
			)
	}
}