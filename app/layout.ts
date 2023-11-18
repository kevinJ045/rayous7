import { Component, Text, Widget } from "rayous";
import { buildProps } from "rayous/extra";
import { App, View } from "../src";
import '@/styles/icons.css';

export default class extends App {
	static options = {
		darkMode: true
	};
	
	build(props: buildProps) {
		return new View({
			app: props.app,
			children: [
				props.page!
			]
		});
	}
}