import Framework7 from "framework7";
import { Component, Text, Widget } from "rayous";
import { buildProps, Controller, EntryController, WidgetEvent } from "rayous/extra";
import { Page } from "../src/components/page";
import { Header } from "../src/widgets/header";
import { Card } from "../src/widgets/card";
import { List, ListItem } from "../src/widgets/list";
import { F7Icons, MaterialIcons } from "../src/widgets/icons";
import { Form } from "@/src/widgets/form";
import { Input } from "@/src/widgets/input";
import { Link } from "@/src/widgets/link";
import { Preloader } from "@/src/widgets/preloader";
import { Button } from "@/src/widgets/button";

export default class extends Component {

	_greeting = new EntryController('hello');

	build(props: buildProps) {
		return new Page({
			header: new Header({
				title: 'hello',
				right: [
					new Link(F7Icons.house)
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
							controller: this._greeting,
							info: 'Yo man',
							placeholder: "hello",
							validate: true,
							floating: true,
							required: true,
							outline: true,
							pattern: "hello|hi|yo",
							errorMessage: "insert (hello|hi|yo)"
						}),
						new Button('Submit', {
							media: MaterialIcons.send
						})
					],
					onSubmit: (e: WidgetEvent<SubmitEvent>) => {
						e.prevent();
						props.app.dialog.alert('value: '+this._greeting.get());
						// console.log(e.original);
					}
				})
			]
		});
	}
}