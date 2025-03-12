import webpack from 'webpack';

import buildConfigs from "./build/WebpackFramework/index.js";

export default async function(...args) {
	
	const cfg = await buildConfigs("./src/",
                            "./dist/${version}/",
                            {
                                "@SBrython": "src/"
                            })(...args);

	const cfg_debug = {...cfg};

	const entries = await cfg_debug.entry();
	cfg_debug.entry = entries;

	console.warn(Object.keys(entries));
	console.warn(entries.main);

	const Benchmark = entries.Benchmark;
	delete entries.Benchmark;

	cfg.plugins = [...cfg_debug.plugins];
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