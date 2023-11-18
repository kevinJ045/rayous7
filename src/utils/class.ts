import { Widget } from "rayous";
import { mergeOptions, options } from "rayous/extra";



export function createClass<T = options | {}>(classname: string, classToExtend: any = Widget, elementName: string = 'div'){
	return class GenClass extends (classToExtend || Widget) {
		constructor(options: T = ({} as T)){
			super(mergeOptions({
				element: {name: elementName},
				class: classname
			}, options as Record<string, any>));
		}
	}
}