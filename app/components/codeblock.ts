
import 'prismjs';
import 'prismjs/components/prism-javascript';
import { Widget } from 'rayous';

export const CodeBlock = Widget.model({
	"selector": "pre.codeblock",
	"children": [
		"code.code",
	],
	_onMount: function(){
		let that: Widget = this;
		(window as any).Prism.highlightElement(that.raw().find('code').at(0));
	},
	"options": {
		"code": {
			"string": {
				"code.code": {
					"html": "$code"
				}
			}
		},
		"lang": {
			"string": {
				"code.code": {
					"addClass": "language-$(lang)"
				},
				"this": {
					"addClass": "language-$(lang)"
				}
			}
		}
	}
}, { code: "" })