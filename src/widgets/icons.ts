import { Widget } from "rayous";


export class Icon extends Widget {
	constructor(options: { class?: string, icon?: string, textual?: boolean, classic?: boolean }){
		super({
			element: { name: 'i' },
			class: options.class,
			...options,
			_setters: ['icon']
		});
	}

	set icon(icon: string){
		let options = this.options;
		if(options.textual) {
			this.text(icon);
		} else if(options.classic){
			this.addClass(icon);
		} else {
			this.attr({'data-icon': icon});
		}
	}

}

export class IconsList {
	handler: ProxyHandler<IconsList>;

	constructor(classnames: string) {
		this.handler = {
			get: (target, prop, receiver) => {
				if (typeof prop === 'string') {
					return new Icon({
						class: 'icon '+classnames,
						icon: prop,
						textual: true
					});
				}
				return Reflect.get(target, prop, receiver);
			}
		};

		return new Proxy(this, this.handler);
	}
}

/**
 * Example to show how to work with IconLists
 */
// @ts-ignore
export const MaterialIcons = new IconsList('material-symbols-outlined') as Record<string, Icon>;