
import fs from "fs";
import path from "path";

// @ts-ignore
let url = new URL(import.meta.url).pathname;

export function GET(req: Request, route: any){
	let pathname = path.join(url, '../../../'+route.params.file);
	let content = "";
	if(fs.lstatSync(pathname).isDirectory()){
		content = JSON.stringify(fs.readdirSync(pathname));
	} else {
		content = fs.readFileSync(pathname).toString();
	}
	return content;
}