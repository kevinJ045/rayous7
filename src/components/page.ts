import { Widget } from "rayous";
import { mergeOptions, options } from "rayous/extra";


export interface PageOptions extends options {
	content?: (Widget | null)[],
	header?: Widget,
	toolbar?: Widget
}

export class PageContent extends Widget{
	constructor(options: options = {}){
		super(mergeOptions({
			class: 'page-content'
		}, options));
	}
}

export class Page extends Widget {
	constructor(options: PageOptions){
		super(mergeOptions({
			class: 'page',
			_setters: ['header', 'toolbar']
		}, options));
		let content = new PageContent;
		super.add(content);
		
		let o: PageOptions = this.options;
		if(Array.isArray(o.content)){
			o.content.forEach(widget => {
				if(widget instanceof Widget ||
					// @ts-ignore
					widget instanceof HTMLElement) {
					content.add(widget);
				}
			});
		}
	}

	add(child: Widget){
		super.add(child, '.page-content');
		return this;
	}
	
	set header(header: Widget){
		super.addBefore(header);
	}

	set toolbar(toolbar: Widget){
		super.add(toolbar);
	}
}