import { buildProps } from "rayous/extra";
import { App, View } from "../src";
import '@/styles/styles.css';
import '@/styles/icons.css';

export default class extends App {
	static options = {
		darkMode: true,
		theme: 'md',

		view: {
			browserHistory: true,
			browserHistoryRoot: '',
			browserHistorySeparator: ''
		}
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


