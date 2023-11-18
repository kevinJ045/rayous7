import { Text, Widget } from "rayous";
import { mergeOptions, options, widget } from "rayous/extra";
import { createClass } from "../utils/class";
import { mergeClassnameWithOptions } from "../utils/cssClass";

export interface HeaderOptions extends options {
	title?: string | Widget,
	left?: (Widget | null)[],
	right?: (Widget | null)[],
	transparent?: boolean,
	large?: boolean
}

export class HeaderItem extends Widget {};

export const HeaderBG = createClass('navbar-bg', HeaderItem);
export const HeaderInner = createClass('navbar-inner', HeaderItem);
export const HeaderInnerLeft = createClass('left', HeaderItem);
export const HeaderInnerTitle = createClass('title', HeaderItem);
export const HeaderInnerRight = createClass('right', HeaderItem);

export const HeaderTitleLarge = createClass('title-large', HeaderItem);
export const HeaderTitleLargeText = createClass('title-large-text', HeaderItem);

function addChildren(widget, cb){
	if(!widget.find('.navbar-inner')) cb(new HeaderInner({
		children: [
			new HeaderInnerLeft,
			new HeaderInnerTitle,
			new HeaderInnerRight
		]
	}));
}

export class Header extends Widget {
	constructor(options: HeaderOptions = {}){
		super(mergeOptions({
			class: mergeClassnameWithOptions('navbar', options, [
				['transparent', 'navbar-transparent'],
				['large', 'navbar-large']
			]),
			_setters: ['title', 'left', 'right', 'largeTitle']
		}, options));
		super.add(new HeaderBG as Widget);
		addChildren(this, (child) => super.add(child));
	}

	addRight(child: Widget){
		if(!super.find('.right')) addChildren(this, (child) => super.add(child));
		return super.find('.right').add(child);
	}

	addLeft(child: Widget){
		if(!super.find('.left')) addChildren(this, (child) => super.add(child));
		return super.find('.left').add(child);
	}

	add(child: Widget){
		if(child instanceof HeaderItem){
			super.add(child);
		} else if(child.options.right == true){
			this.addRight(child);
		} else {
			this.addLeft(child);
		}
		return this;
	}

	set largeTitle(title: string | Widget){
		if(!super.find('.title-large')) super.add(new HeaderTitleLarge({ children: [new HeaderTitleLargeText] }) as Widget);
		if(typeof title == "string"){
			super.find('.title-large').find('.title-large-text').text(title);
		} else {
			super.find('.title-large').find('.title-large-text').add(title);
		}
	}

	set title(title: string | Widget){
		if(!super.find('.title')) addChildren(this, (child) => super.add(child));
		if(typeof title == "string"){
			this.find('.title').text(title);
		} else {
			super.add(title as Widget, '.title');
		}
	}
	
	set left(children: (Widget | null)[]){
		children.filter(Boolean)
		.forEach(child => this.addLeft(child!));
	}

	set right(children: (Widget | null)[]){
		children.filter(Boolean)
		.forEach(child => this.addRight(child!));
	}
}
