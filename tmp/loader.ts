
	import Loader from "../app/loading.ts"
	(function(){

let loaderOn = "app/loading.ts", loader, after = false;


if(loaderOn){
	try{
		if(typeof Loader == "function"){
			loader = Loader({ route: {path: "/", params: {} }});
			if(typeof loader.to == "function"){
				loader.to(document.body);
			} else if(!loader instanceof HTMLElement){
				throw new TypeError('Loader from app/loading.ts is not a returning a function that returns a widget!');
			} else {
				if(loader?.removeAfterLoad) after = true;
				(document.body || document.rootElement || document)
				.appendChild(loader);
			}
		} else {
			throw new TypeError('Loader from app/loading.ts is not a returning a function that returns a widget!');
		}
	} catch(e){
		document.write(e);
		throw e;
	}
}
window.loader = loader;
window.loaderAfter = after;
window.loaderOn = loaderOn;
})();