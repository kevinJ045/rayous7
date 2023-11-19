import { Link as DefaultLink, Text, Widget } from "rayous";
import { LinkOptions as DefaultLinkOptions, urlOptions } from "rayous/client/widgets/main/Link";
import { Controller, mergeOptions, options } from "rayous/extra";

export interface LinkOptions extends DefaultLinkOptions {
	ref?: string | urlOptions | Controller<string | urlOptions>,
	media?: Widget,
	prefix?: boolean 
}

export function reformatLink(widget: any, url: string | urlOptions){
	if(typeof url == "string"){
		if(url.match(/^ui\.([a-zA-Z-]+):/)){
			let [, name, ui] = url.match(/ui\.([a-zA-Z-]+):(.+)/);
			widget
				.addClass(name+'-link')
				.attr('data-'+name, ui);
		} else {
			widget
			.attr({'href': url});
		}
	} else {
		if(url.url){
			widget
			.attr({'href': url.url})
			.on('click', (e: MouseEvent) => {
				e.preventDefault();
				url.click(url.url);
			});
		}
	}
}

export class Link extends DefaultLink {

	constructor(selectedOptions: string | LinkOptions | Widget, otheroptions: LinkOptions | null = null){
		const options = Link.resolveOptions(selectedOptions, otheroptions, { accepts: true }) as LinkOptions;
		super(mergeOptions({
			class: 'link',
			accepts: true
		}, options));

		if(options.media) this.media = options.media;
	}

	set media(media: Widget){
		if(this.options.prefix) this.addBefore(media);
		else this.add(media);
	}

	set ref(url: string | urlOptions | Controller<string | urlOptions>){
		if(url instanceof Controller) url.onChange((change: string) => {
			this.ref = change;
		});
		reformatLink(this.raw(), url instanceof Controller ? url.get() : url);
	}

	static resolveOptions(selectedOptions: string | object | Widget, otheroptions: object, defaults: object): {} {
		if(selectedOptions instanceof Widget){
			selectedOptions = { media: selectedOptions };
		}
		return Text.resolveOptions(selectedOptions, otheroptions, defaults);
	}
}