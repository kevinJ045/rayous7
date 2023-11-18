import { List as DefaultList, Widget, ListItem as DefaultListItem } from "rayous";
import { Controller, mergeOptions, options } from "rayous/extra";
import { createClass } from "../utils/class";
import { mergeClassnameWithOptions } from "../utils/cssClass";


interface ListItemOptions extends options {
	media?: Widget;

	title?: Widget | string;
	after?: Widget | string;
	header?: Widget | string;
	subtitle?: Widget | string;
	content?: Widget | string;

	titleRow?: boolean;
	link?: boolean
}

type items = Controller<any[]> | any[]
interface ListOptions extends options {
	itemsStateName?: string,
	template?: CallableFunction,
	items?: items | Promise<items>,
	empty?: boolean,

	inset?: boolean,
	strong?: boolean,
	outline?: boolean,
	dividers?: boolean,
}

class ListItemItem extends Widget {}

export const ListItemContainer = createClass('item-content', ListItemItem);
export const ListItemContainerLink = createClass('item-link item-content', ListItemItem, 'a');
export const ListItemMedia = createClass('item-media', ListItemItem);
export const ListItemInner = createClass('item-inner', ListItemItem);
export const ListItemInnerTitle = createClass('item-title', ListItemItem);
export const ListItemInnerTitleHeader = createClass('item-header', ListItemItem);
export const ListItemInnerAfter = createClass('item-after', ListItemItem);
export const ListItemAfter = createClass('item-after', ListItemItem);
export const ListItemSubtitle = createClass('item-subtitle', ListItemItem);
export const ListItemText = createClass('item-text', ListItemItem);
export const ListItemTitleRow = createClass('item-title-row', ListItemItem);

export class ListItem extends Widget {
	constructor(options: ListItemOptions){
		super(mergeOptions({
			element: { name: 'li' },
			init: options,
			_setters: ['init', 'media', 'title', 'header', 'after', 'subtitle', 'content', 'titleRow']
		}, options));
	}

	set init(options: ListItemOptions){
		let container = new ListItemContainer as Widget;
		if(options.link) container = new ListItemContainerLink as Widget;
		super.add(container);
	}

	set media(media: Widget){
		if(!super.find('.item-media')) super.find('.item-content').addBefore(new ListItemMedia as Widget);
		super.find('.item-media').add(media);
	}

	set title(title: string | Widget){
		if(!super.find('.item-title')) super.find('.item-content').add(new ListItemInner({
			children: [ new ListItemInnerTitle ]
		}) as Widget);
		if(typeof title == "string"){
			super.find('.item-title').text(title);
		} else {
			super.find('.item-title').add(title);
		}
	}

	set header(title: string | Widget){
		if(!super.find('.item-inner')) super.find('.item-content').add(new ListItemInner({
			children: [ new ListItemInnerTitle ]
		}) as Widget);
		if(!super.find('.item-header')) super.find('.item-inner').find('.item-title').add(new ListItemInnerTitleHeader as Widget);
		if(typeof title == "string"){
			super.find('.item-header').text(title);
		} else {
			super.find('.item-header').add(title);
		}
	}

	set after(title: string | Widget){
		if(!super.find('.item-inner')) super.find('.item-content').add(new ListItemInner({
			children: [ new ListItemInnerTitle ]
		}) as Widget);
		if(!super.find('.item-after')) super.find('.item-content').find('.item-inner').add(new ListItemInnerAfter as Widget);
		if(typeof title == "string"){
			super.find('.item-after').text(title);
		} else {
			super.find('.item-after').add(title);
		}
	}

	set subtitle(title: string | Widget){
		if(!super.find('.item-inner')) super.find('.item-content').add(new ListItemInner({
			children: [ new ListItemInnerTitle ]
		}) as Widget);
		if(!super.find('.item-subtitle')) super.find('.item-inner').add(new ListItemSubtitle as Widget);
		if(typeof title == "string"){
			super.find('.item-subtitle').text(title);
		} else {
			super.find('.item-subtitle').add(title);
		}
	}

	set content(title: string | Widget){
		if(!super.find('.item-inner')) super.find('.item-content').add(new ListItemInner({
			children: [ new ListItemInnerTitle ]
		}) as Widget);
		if(!super.find('.item-text')) super.find('.item-inner').add(new ListItemText as Widget);
		if(typeof title == "string"){
			super.find('.item-text').text(title);
		} else {
			super.find('.item-text').add(title);
		}
	}

	set titleRow(rowEnabled: boolean){
		if(rowEnabled){
			let row = new ListItemTitleRow as Widget;
			if(!super.find('.item-title-row')) super.find('.item-content').addBefore(row);
			row.add(super.find('.item-title'));
			row.add(super.find('.item-after'));
		}
	}
}

export class List extends Widget {
	constructor(options: ListOptions){
		super(mergeOptions({
			class: mergeClassnameWithOptions('list', options, 
			[
				['inset', 'inset'],
				['outline', 'list-outline'],
				['strong', 'list-strong'],
				['dividers', 'list-dividers']
			]),
			children: [
				new DefaultList({
					items: options.items || [],
					itemsStateName: options.itemsStateName || '$items_list',
					template: options.template || ((item: any) => new ListItem(item)),
					empty: 'empty' in options ? options.empty : true
				})
			]
		}, options));
	}

	appendItem(item: any, index: number){
		this.find('ul').add((this.find('ul') as DefaultList)._fromTemplate(item, index))
		return this;
	}
	
	onItems(event: string, handler: CallableFunction): this {
		(this.find('ul') as DefaultList).onItems(event, handler)
		return this;
	}

	empty(){
		this.find('ul').raw().empty();
		return this;
	}

	updateList(newOptions: ListOptions){
		let list = this.find('ul') as DefaultList;
		list.updateList(newOptions);
	}

	addItem(item: any){
		(this.find('ul') as DefaultList).addItem(item);
		return this;
	}

	removeItems(...items: any[]){
		(this.find('ul') as DefaultList).removeItems(...items);
		return this;
	}
}