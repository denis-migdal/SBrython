//TODO
const fs = require('fs');
const glob = require("glob");

const encoder = new TextEncoder();

function getRuntimes(path) {

	let files = glob.sync("**/*.ts", {cwd: path});

	const runtimes = {};

	for(let i = 0; i < files.length; ++i) {
		const filepath = files[i];

		if(filepath === "lists.ts")
			continue;

		const pos = filepath.lastIndexOf("/");
		const file = filepath.slice(pos+1).slice(0,-3);
		runtimes[file] = `./${filepath}`;
	}

	return runtimes;
}

function importRuntimes(runtimes) {

	let result = "";

	let runtime_id = 0;
	for(let runtime_name in runtimes) {

		const runtime = runtimes[runtime_name];

		//TODO if not found...
		result += `import RUNTIME_${runtime_id} from "${runtimes[runtime_name]}";\n`;
		++runtime_id;
	}

	result += "\n\n";

	result += "const RUNTIME = {\n";
	runtime_id = 0;
	for(let runtime_name in runtimes) {
		result += `	"${runtime_name}": RUNTIME_${runtime_id},\n`;
		++runtime_id;
	}
	result += "}\n\n";
	result += "export default RUNTIME;\n";

	return result;
}

function save(dirpath, content) {
	const path = `${dirpath}/lists.ts`;

	const file_exists = fs.existsSync(path);
	const file = fs.openSync(path, file_exists ? "r+" : "w");

	const file_content = file_exists ? fs.readFileSync(file, "utf8") : null;
	if( file_content !== content) {
		if(file_exists)
			fs.ftruncateSync(file);
		fs.writeSync(file, encoder.encode(content), {position: 0}); // ftruncate doesn't reset position...
	}
	fs.closeSync(file);
}

function generateList(path) {

	save(path, importRuntimes( getRuntimes(path) ));
}

module.exports = function() {

	console.time("Building core runtime list");

	generateList("./src/core_runtime/");

	console.timeEnd("Building core runtime list");
}