

export function mergeClassnameWithOptions(
	classname: string,
	options: any,
	classnames: string[][]
) {
	let classnamesOptions: string[] = [];

	classnames.forEach(classname => {
		if(options[classname[0]] == true) classnamesOptions.push(classname[1])
	});

	return classname + (classnamesOptions.length ? ' '+classnamesOptions.join(' ') : '');
}