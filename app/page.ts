import { Component } from "rayous";
import { buildProps, Controller } from "rayous/extra";
import { Page } from "../src/components/page";
import { Header } from "../src/widgets/header";
import { List, ListItem } from "../src/widgets/list";
import { F7Icons, MaterialIcons } from "../src/widgets/icons";
import { Link } from "@/src/widgets/link";
import { Card } from "@/src";

export default class extends Component {

	build(props: buildProps) {
		return new Page({
			header: new Header({
				title: 'Page Title',
				right: [
					new Link(F7Icons.house)
				]
			}),
			content: [
				new Card({
					content: [
						new List({
							items: fetch('/files')
							.then(r => r.json()) as Promise<{isFile: boolean, title: string }[]>,
							outline: true,
							dividers: true,
							template(item){
								return new ListItem({
									media: MaterialIcons[item.isFile ? 'draft' : 'folder'],
									title: item.title,
									link: true,
									url: '/file/'+item.title
								});
							}
						})
					]
				})
			]
		});
	}
}


