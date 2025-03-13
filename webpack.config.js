import webpack from 'webpack';

import buildConfigs from "./build/WebpackFramework/index.js";
import genBry2SBry  from "./build/genBry2SBry.js";

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

	cfg.plugins = [...cfg_debug.plugins];

	// only require it once.
	cfg_debug.plugins.push({
		apply: (compiler) => {
			compiler.hooks.compile.tap("MyPlugin_compile", async () => {
				await genBry2SBry();
				//genCoreModuleList();
				//genCoreRuntimeList();
			});
		},
	});


	cfg.entry   = {
		skeleton: entries.skeleton,
		Benchmark
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