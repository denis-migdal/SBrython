import webpack from 'webpack';

import buildConfigs from "./build/WebpackFramework/index.js";
import genBry2SBry  from "./build/gen/bry2sbry.js";
import genTypes     from "./build/gen/types.js";
import genAST2JS    from "./build/gen/ast2js.js";
import genRuntime   from "./build/gen/runtime.js";

import CircularDependencyPlugin from 'circular-dependency-plugin';

export default async function(...args) {
	
	const cfg = await buildConfigs("./src/",
                            "./dist/${version}/",
                            {
                                "@SBrython": "src/"
                            })(...args);

	const cfg_debug = {...cfg};

	const entries = await cfg_debug.entry();
	cfg_debug.entry = entries;

	const Benchmark = entries.Benchmark;
	delete entries.Benchmark;
	const  LibEntryName = 'libs/SBrython-prod';
	const RLibEntryName = 'libs/SBrython-runtime-prod';
	const  Lib       = entries[ LibEntryName];
	const RLib       = entries[RLibEntryName];
	delete entries[ LibEntryName]
	delete entries[RLibEntryName]

	cfg.plugins = [...cfg_debug.plugins];

	// only require it once.
	cfg_debug.plugins.push({
		apply: (compiler) => {
			compiler.hooks.compile.tap("MyPlugin_compile", async () => {
				await Promise.all([
					genBry2SBry(),
					genTypes(),
					genAST2JS(),
					genRuntime(),
				]);
			});
		},
	}, new CircularDependencyPlugin({
		// exclude detection of files based on a RegExp
		exclude: /node_modules/,
		// include specific files based on a RegExp
		include: /src/,
		// add errors to webpack instead of warnings
		failOnError: true,
		// allow import cycles that include an asyncronous import,
		// e.g. via import(/* webpackMode: "weak" */ './file.js')
		allowAsyncCycles: false,
		// set the current working directory for displaying module paths
		cwd: process.cwd(),
	  })
	);


	cfg.entry   = {
		skeleton: entries.skeleton,
		Benchmark,
		[ LibEntryName]:  Lib,
		[RLibEntryName]: RLib
	};
	cfg.output.clean = false;

	cfg_debug.plugins.push(new webpack.DefinePlugin({
		__DEBUG__: "true"
	}));

	cfg.plugins.push(new webpack.DefinePlugin({
		__DEBUG__: "false"
	}));

	return [cfg_debug, cfg];
}