// @ts-ignore
import Framework7 from "framework7/bundle";
import { Component } from "rayous";
import { RayousExport, buildProps, getComponentExports } from "rayous/extra";

export interface args {}

export class App extends Component {
	static options = {};

	static beforeBuildStart(props: buildProps){
		let app = new Framework7({
			...this.options,
			routes: props.router.paths.map(item => {
				return {
					path: item.pathname,
					component: (_props, { $h, $el, $on }) => {
						let initiated = false;
						let component: Promise<RayousExport> | null = new Promise((r) => {r({} as RayousExport)});
						let builtComponent, made, p;

						$on('pageInit', (e, page) => {
							if(initiated) return;
							component = new Promise((resolve) => {
								let url = item.pathname.replace(/\:([\w]+)/g, (all, key) => {
									return page.route.params[key] || "empty";
								});
								const requestUrl = url+'?onlyjs=true&export=true';
								const script = document.createElement('script');
								script.src = requestUrl;
								script.onload = () => {
									// @ts-ignore
									let exports: Record<string, RayousExport> = getComponentExports();
									resolve(exports[item.filename]);
								}
								script.onerror = () => {
									const requestUrl = url+'/index.js';
									script.src = requestUrl;
									script.remove();
									document.head.appendChild(script);
								}
	
								document.head.appendChild(script);
							});
							
						});

						$on('pageReinit', (e, page) => {
							if(builtComponent) builtComponent.emit('rebuild', { widget: made, component: builtComponent, props: p });
						});

						$on('pageBeforeIn', (e, page) => {
							if(initiated) return;
							component
							.then(({component, props: _props}) => {
								p = props.wrap(_props);
								p.route.params = page.route.params;
								builtComponent = new component(p);
								builtComponent._beforeInit();
								builtComponent.initState(p);
								made = builtComponent.make(p);
								$el.value.removeClass('page');
								made.to($el.value[0]);
								return builtComponent;
							});
						});

						$on('pageAfterIn', (e, page) => {
							if(initiated) return;
							component
							.then(item => {
								builtComponent.afterBuild({...p, page: made});
								initiated = true;
							});
						});

						return () => $h`<div class="page"><div class="preloader" style="position: absolute;top: 50%; left: 50%;"></div></div>`;
					}
				}
			})
		});
		props.add!('app', app);
		props.addArgument!(app);
	};
}