
import Page0 from "../app/page";


import Page1 from "../app/layout";

const clientInit = { init: () => {}, after: () => {} };


const otherPaths = [{"pathname":"","filename":"app/page.ts"},{"pathname":"/file/:file","filename":"app/file/[file]/page.ts"},{"pathname":"/files/:file","filename":"app/files/[file]/route.ts"},{"pathname":"/files","filename":"app/files/route.ts"}];
let base_props = { router: { paths: otherPaths, assign: function(path){ location.assign(path) }, navigate: function(path, options){ _navigate(path, options) }, back: function(){ location.back() } }, route: {path: "/", params: {} }}
if(!window.all_possible_paths) window.all_possible_paths = otherPaths;
function start(){
let cscript = document.currentScript;
const pages = window.pages || [];
if(!window.pages) window.pages = pages;

if(typeof Page0.title === "string") document.title = Page0.title;

const _navigate = (path, options = {}) => {
	let pathname = path;
	if(typeof options !== "object") options = {};

	if(path.startsWith('./')) pathname = path.replace('./', location.pathname+'/');

	pathname = pathname.replace(/\/\//g, '/');

	if(options.refresh == true){
		return location.pathname = pathname;
	}

	let tries = 0;
	const _startScriptLoad = (notIndex) => {
		tries++;
		document.getElementById('current_script')?.remove();

		let script = document.createElement('script');
		let onlyjs = pathname+'?onlyjs=true';
		let index = pathname+"/index.js".replace(/\/\//g, '/');
		script.src = onlyjs;
		script.id = "current_script";
		script.onload = () => {
			cscript.remove();
			document.body.innerHTML = '';
			window.loadFunction();
			if(options.push !== false) history.pushState(null, false, pathname);
		}
		script.onerror = (e) => {
			e.preventDefault();
			if(tries < 5) _startScriptLoad(true);
		}
		document.head.appendChild(script);
	}

	if(options.inherit == false){
		delete window.lastPage;
	}

	if(options.reinit == true){
		delete window.initted;
		delete window.initResponse;
	}

	window.previousPathname = location.pathname;
	_startScriptLoad();
}

const buildProps = (props: any) => (
	{ ...base_props, wrap(object){ return {...this, ...object}; }, addArgument(...args){if(!Array.isArray(base_props.args)) base_props.args = [];base_props.args.push(...args);return buildProps();}, add(prop, value){base_props[prop] = value; return buildProps();}, ...props }
)


if(typeof Page0.title === "function") document.title = Page0.title(buildProps({page: made0}));
if(Array.isArray(Page0.links)){
	Page0.links.forEach(url => {
		let link = document.createElement('link');
		if(typeof url == 'string'){
			link.rel = 'stylesheet';
			link.href = url
		} else {
			if(url.rel) link.rel = url.rel;
			if(url.href) link.href = url.href;
		}
		document.head.appendChild(link);
	});
}

if(Array.isArray(Page0.scripts)){
	Page0.scripts.forEach(url => {
		let script = document.createElement('script');
		script.src = url;
		document.head.appendChild(script);
	});
}

window.loadFunction = () => {
	if(!window.after && window.loaderOn) window.loader.remove();	
	const initResponse = window.initResponse ? window.initResponse : typeof clientInit.init == "function" ? clientInit.init(buildProps()) || {} : {};
	if(!window.initResponse) window.initResponse = initResponse;

	if(typeof Page1.beforeBuildStart == "function") Page1.beforeBuildStart(buildProps());
if(typeof Page0.beforeBuildStart == "function") Page0.beforeBuildStart(buildProps());
	
	let page0 = new Page0();
page0._beforeInit();
page0.initState(buildProps());
let page1 = new Page1();
page1._beforeInit();
page1.initState(buildProps());

	if(window.lastPage && Page0.inheritState !== false) page0._inheritState(window.lastPage);

	let made0 = page0.make(buildProps({init: initResponse, page: null}));
let made1 = page1.make(buildProps({init: initResponse, page: made0}));

	if(Page0.layouts === false){
		made0.to(document.body);
		page0.afterBuild(buildProps({page: made0}), ...(Array.isArray(buildProps().args) ? buildProps().args : []));
	} else {
		page0.afterBuild(buildProps({page: made0}), ...(Array.isArray(buildProps().args) ? buildProps().args : []));
made1.to(document.body)
		
	}

	

	pages.push(page0)
pages.push(page1);
	window.lastPage = page0;

	if(typeof clientInit.after == "function" && !window.initted) clientInit.after(buildProps({page: made0}));
	if(window.after && window.loaderOn) window.loader.remove();
	window.initted = true;
}

window.popStateListener = (e) => {
	if(window.previousPathname){
		_navigate(window.previousPathname, { push: false });
	} else {
		_navigate(location.pathname, { push: false });
	}
};
if(!window.popStateListenerListening) window.addEventListener('popstate', window.popStateListener);
window.popStateListenerListening = true;

window.addEventListener('load', window.loadFunction);
}
start()
	