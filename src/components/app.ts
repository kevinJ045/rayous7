// @ts-ignore
import Framework7 from "framework7/bundle";
import { Component } from "rayous";
import { buildProps } from "rayous/extra";

export interface args {}

export class App extends Component {
	static options = {};

	static beforeBuildStart(props: buildProps){
		let app = new Framework7(this.options);
		props.add!('app', app);
		props.addArgument!(app);
	};
}