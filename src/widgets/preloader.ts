import { Widget } from "rayous";
import { mergeOptions, options } from "rayous/extra";
import { mergeClassnameWithOptions } from "../utils/cssClass";

export interface PreloaderOptions extends options {
	color?: string,
	large?: boolean
}

export class Preloader extends Widget {
	constructor(options: PreloaderOptions){
		super(mergeOptions({
			class: mergeClassnameWithOptions('preloader', options, [
				['color', 'color-$$var'],
				['large', 'preloader-large'],
			]),
			accepts: false,
		}, options));
	}
}