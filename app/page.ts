import Framework7 from "framework7";
import { Component, Text, Widget } from "rayous";
import { buildProps } from "rayous/extra";
import { Page } from "../src/components/page";
import { Header } from "../src/widgets/header";
import { Card } from "../src/widgets/card";
import { List, ListItem } from "../src/widgets/list";
import { MaterialIcons } from "../src/widgets/icons";

export default class extends Component {
	build(props: buildProps) {
		return new Page({
			header: new Header({
				title: 'hello',
				right: [
					new Text('hi')
				],
				largeTitle: 'Hii',
				large: true
			}),
			content: [

				new Card({
					header: 'Hi',
					footer: 'Hi',
					headerImage: 'https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg',
					headerHeight: 400,
					content: [
						new Text('hello')
					]
				}),

				new List({
					items: ['a', 'b', 'c'],
					outline: true,
					dividers: true,
					template(item){
						return new ListItem({
							media: MaterialIcons.home,
							title: item,
							link: true
						})
					}
				})
			]
		});
	}
}