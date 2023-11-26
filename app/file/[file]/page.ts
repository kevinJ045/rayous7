import { CodeBlock } from "@/app/components/codeblock";
import { F7Icons, Header, Link, Page } from "@/src";
import { Component, Text } from "rayous";
import { Ref, buildProps, ref } from "rayous/extra";



export default class extends Component {
	@ref code: string = "";

	build(props: buildProps) {
		return new Page({
			header: new Header({
				left: [
					new Link(F7Icons.arrow_left, {
						class: 'back'
					})
				],
				title: props.route.params.file
			}),
			content: [
				new CodeBlock({
					lang: 'javascript',
					code: this.code
				})
			]
		});
	}

	async afterBuild(props: any) {
		this.code = await fetch('/files/'+props.route.params.file).then(r => r.text());
	}
}