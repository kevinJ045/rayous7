import { EntryController, EntryOptions, mergeOptions, options } from "rayous/extra";
import { ListItem, ListItemOptions } from "./list";
import { InputWrapper, Widget } from "rayous";
import { createClass } from "../utils/class";
import { mergeClassnameWithOptions } from "../utils/cssClass";



export interface InputOptions extends ListItemOptions {
	floating?: boolean,
	required?: boolean,
	outline?: boolean,
	validate?: boolean,

	pattern?: string,
	errorMessage?: string,
	placeholder?: string,
	inputClass?: string,

	input?: Widget,
	controller?: EntryController,
	onTextInput?: CallableFunction,

	inputType?: 'file' | 'text' | 'email' | 'password' | 'number' | 'textarea' | 'range' | 'progress'
}

class InputItem extends Widget{}

export const InputItemWrapper = createClass('item-input-wrap', InputItem);
export const InputClearButton = createClass('input-clear-button', InputItem, 'span');
export const InputTitleLabel = createClass('item-title item-label', InputItem);
export const InputInfo = createClass('item-input-info', InputItem);

export class Input extends ListItem {
	_inputWidget?: Widget;

	constructor(options: InputOptions){
		super(mergeOptions({
			class: mergeClassnameWithOptions('item-content item-input', options, [
				['outline', 'item-input-outline']
			]),
			inner: new InputItemWrapper({
				children: [
					new InputClearButton
				]
			}),
			_setters: ['floating', 'info', 'input', 'placeholder', 'validate', 'pattern', 'errorMessage'],
			input: new InputWrapper({
				inputType: options.inputType,
				controller: options.controller,
				onTextInput: options.onTextInput || (() => {}),
				required: options.required,
				class: options.inputClass || '',
				title: options.placeholder || (typeof options.title == 'string' ? options.title : '')
			}),
			selfContain: true
		}, options));
	}

	set input(input: Widget){
		if(this.find('.input-item')) this.find('.input-item').remove();
		this._inputWidget = input;
		input.addClass('input-item');
		this.find('.item-input-wrap')
		.addBefore(input);
	}

	set placeholder(placeholder: string){
		this.find('.input-item').attr({ placeholder });
	}

	set validate(validate: boolean){
		this.find('.input-item').attr({ validate });
	}
	
	set pattern(pattern: string){
		this.find('.input-item').attr({ pattern });
	}

	set errorMessage(errorMessage: string){
		this.find('.input-item').attr({ 'data-error-message': errorMessage });
	}

	set controller(controller: EntryController){
		(this.find('.input-item') as InputWrapper)
		.setController(controller);
	}

	set floating(float: boolean){
		if(float){
			super.find('.item-title')
			?.removeClass('item-label')
			.addClass('item-floating-label');
		} else {
			super.find('.item-title')
			?.removeClass('item-floating-label')
			.addClass('item-label');
		}
	}

	set dropdown(isDropdown: boolean){
		if(isDropdown){
			super.addClass('input-dropdown-wrap');
		} else {
			super.removeClass('input-dropdown-wrap');
		}
	}

	set title(title: string | Widget){
		if(!super.find('.item-title')) super.find('.item-content')
		.find('.item-inner').addBefore(new InputTitleLabel as Widget);
		if(typeof title == "string"){
			super.find('.item-title').text(title);
		} else {
			super.find('.item-title').add(title);
		}
	}

	set info(info: string | Widget){
		if(!super.find('.item-input-info')) super
		.find('.item-input-wrap')
		.add(new InputInfo as Widget);
		super.addClass('item-input-with-info');
		if(typeof info == "string"){
			super.find('.item-input-info').text(info);
		} else {
			super.find('.item-input-info').add(info);
		}
	}
}