import { Widget } from "rayous";
import { mergeOptions, options } from "rayous/extra";
import { createClass } from "../utils/class";
import { child } from "rayous/client/widgets/_ghost/WidgetProps";
import { mergeClassnameWithOptions } from "../utils/cssClass";


export interface FormOptions extends options {
	inset?: boolean,
	strong?: boolean,
	outline?: boolean,
	dividers?: boolean
}

export const FormUl = createClass('form-ul', null, 'ul');

export class Form extends Widget {
	constructor(options: FormOptions){
		super(mergeOptions({
			element: { name: 'form' },
			class: mergeClassnameWithOptions('list', options, 
			[
				['inset', 'inset'],
				['outline', 'list-outline'],
				['strong', 'list-strong'],
				['dividers', 'list-dividers']
			]),
			children: [new FormUl]
		}, options));
	}

	add(child: child, subchild?: string): this {
		if(child instanceof FormUl){
			super.add(child);
		} else {
			super.find('.form-ul').add(child);
		}
		return this;
	}
}