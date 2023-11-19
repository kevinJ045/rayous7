import Framework7 from "framework7";
import { Component, Text, Widget } from "rayous";
import { buildProps } from "rayous/extra";
import { Page } from "../src/components/page";
import { Header } from "../src/widgets/header";
import { Card } from "../src/widgets/card";
import { List, ListItem } from "../src/widgets/list";
import { MaterialIcons } from "../src/widgets/icons";
import { Form } from "@/src/widgets/form";
import { Input } from "@/src/widgets/input";
import { Link } from "@/src/widgets/link";
import { Preloader } from "@/src/widgets/preloader";

export default class extends Component {
	build(props: buildProps) {
		return new Page({
			header: new Header({
				title: 'hello',
				right: [
					new Link(MaterialIcons.home)
				],
				largeTitle: 'Hii',
				large: true
			}),
			content: [

				new Preloader({
					color: 'multi'
				}),

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
							link: true,
							url: '/'
						})
					}
				}),

				new Form({
					outline: true,
					children: [
						new Input({
							media: MaterialIcons.person,
							title: 'Yo!',
							info: 'Yo man',
							placeholder: "hello",
							validate: true,
							outline: true,
							pattern: "apple|banana",
							errorMessage: "insert (apple|banana)"
						})
					]
				})
			]
		});
	}
}