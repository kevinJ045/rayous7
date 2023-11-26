import { Widget } from "rayous";
import { mergeOptions, options } from "rayous/extra";
import { createClass } from "../utils/class";
import { mergeClassnameWithOptions } from "../utils/cssClass";

export const CardContent = createClass('card-content');
export const CardHeader = createClass('card-header');
export const CardFooter = createClass('card-footer');


export interface CardOptions extends options {
	content?: (Widget | null)[],
	header?: Widget | string,
	footer?: Widget | string | Widget[],

	outline?: boolean,
	raised?: boolean,
	padded?: boolean,

	headerImage?: string,
	headerHeight?: string | number
}

export class Card extends Widget {
	constructor(options: CardOptions){
		let content = new CardContent as Widget;
		super(mergeOptions({
			class: mergeClassnameWithOptions('card', options, [
				['outline', 'card-outline'],
				['raised', 'card-raised']
			]),
			padded: true,
			_setters: ['header', 'footer', 'headerImage', 'headerHeight'],
			children: [content],
		}, options));

		let o: CardOptions = this.options;
		if(Array.isArray(o.content)){
			o.content.forEach(widget => {
				if(widget instanceof Widget ||
					// @ts-ignore
					widget instanceof HTMLElement) {
					content.add(widget);
				}
			});
		}
		if(o.padded) content.addClass('card-content-padding');
	}

	set header(title: string | Widget){
		if(!super.find('.card-header')) super.addBefore(new CardHeader as Widget);
		if(typeof title == "string"){
			super.find('.card-header').text(title);
		} else {
			super.find('.card-header').add(title);
		}
	}

	set footer(footer: string | Widget | Widget[]){
		if(!super.find('.card-footer')) super.add(new CardFooter as Widget);
		if(typeof footer == "string"){
			super.find('.card-footer').text(footer);
		} else {
			if(Array.isArray(footer)){
				footer.forEach((item: Widget) => super.find('.card-footer').add(item));
			} else {
				super.find('.card-footer').add(footer);
			}
		}
	}

	//style="background-image:url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)" valign="bottom"

	set headerImage(image: string){
		if(!super.find('.card-header')) super.addBefore(new CardHeader as Widget);
		super
		.find('.card-header')
		.attr({ valign: 'bottom' })
		.style = {
			backgroundImage: 'url("'+image+'")'
		}
	}

	set headerHeight(height: string | number){
		if(super.find('.card-header')) super
		.find('.card-header')
		.style = { height }
	}
}