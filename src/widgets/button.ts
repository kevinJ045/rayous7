import { Button as DefaultButton, Widget } from "rayous";
import { mergeOptions, options } from "rayous/extra";
import { Link } from "./link";

function _setButtonTypes(button: Button, types: string[]){
	types.forEach(type => {
		button.toggleClass('button-'+type);
	});
}

export interface ButtonOptions extends options {
	type?: string[] | string,
	media?: Widget
}


export class Button extends DefaultButton {
	constructor(selectedOptions: ButtonOptions | string | Widget, otherOptions?: ButtonOptions){
		let options = Link.resolveOptions(selectedOptions, otherOptions, {}) as ButtonOptions;
		
		super(mergeOptions({
			class: 'button',
		}, options));

		if(options.media) this.media = options.media;
		if(options.type) this.setType(options.type);
	}

	set media(media: Widget){
		if(this.options.prefix) this.addBefore(media);
		else this.add(media);
	}

	setType(types: string[] | string){
		if(typeof types == "string"){
			_setButtonTypes(this, types.split(' '));
		} else {
			_setButtonTypes(this, types);
		}
	}
}