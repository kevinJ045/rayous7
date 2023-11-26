

import fs from "fs";
import path from "path";

// @ts-ignore
let url = new URL(import.meta.url).pathname;

export function GET(){
	let pathname = path.join(url, '../../');
	let dir = fs.readdirSync(pathname);
	return JSON.stringify(dir.map(filename => ({
		title: filename,
		isFile: !fs.lstatSync(path.join(pathname, filename)).isDirectory()
	})));
}