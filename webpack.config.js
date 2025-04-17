import webpack from 'webpack';

import buildConfigs from "./build/WebpackFramework/index.js";
import genBry2SBry  from "./build/gen/bry2sbry.js";
import genTypes     from "./build/gen/types.js";
import genAST2JS    from "./build/gen/ast2js.js";
import genOperators from "./build/gen/operators.js";
import genRuntime   from "./build/gen/runtime.js";


import CircularDependencyPlugin from 'circular-dependency-plugin';

export default async function(...args) {

	// cf https://github.com/webpack/webpack/issues/11557#issuecomment-2778661210

	const cfg = await buildConfigs("./src/",
		"./dist/${version}/",
		{
			"@SBrython": "src/"
		})(...args);

	const entries = cfg.entry = await cfg.entry();

	const names = [ 'libs/SBrython-prod', 'libs/SBrython-runtime-prod', 'Benchmark'];
	for(const name in entries)
		entries[name].layer = `__DEBUG__=${ ! names.includes(name)}`;

	// only require it once.
	cfg.plugins.push({
		apply: (compiler) => {
			compiler.hooks.compile.tap("MyPlugin_compile", async () => {
			await Promise.all([
				genBry2SBry(),
				genTypes(),
				genAST2JS(),
				genOperators(),
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
		failOnError: false,
		// allow import cycles that include an asyncronous import,
		// e.g. via import(/* webpackMode: "weak" *//* './file.js')
		allowAsyncCycles: false,
		// set the current working directory for displaying module paths
		cwd: process.cwd(),
		})
	);

	cfg.experiments.layers = true;

	cfg.plugins.push(new webpack.DefinePlugin({
		__DEBUG__: webpack.DefinePlugin.runtimeValue(
			ctx => ctx.module.layer === '__DEBUG__=true'
		)
	}));

	return cfg;
}