// https://www.typescriptlang.org/docs/handbook/project-references.html

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

module.exports = function(config, src, {workers} = {}) {

	config.module.rules.push({
		test: /\.tsx?$/,
		use: [{
				loader: 'swc-loader',
				//loader: 'ts-loader',
				options: {
					//transpileOnly: true, // Build time : 20sec to 10sec...
					//experimentalWatchApi: true,
				},
			},],
		exclude: [ /node_modules/ ]
	});

	config.plugins.push(
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				build: true,
				mode: 'write-references',
			}
		}),
		new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
	);

	config.resolve = {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [
			src,
			'./node_modules',
		],
		alias: {},
		fallback: {
            "fs": false,
            "path": false,
            "crypto": false
        },
	}

	const WORKER_PREFIX = 'TS.Worker.';

	config.entry.main.push( `${src}/index.ts` );

	for(let worker_name in workers) {
		config.entry[`${WORKER_PREFIX}${worker_name}`] = workers[worker_name][0];
	}

	config.output.filename = (chunk) => {

		let {runtime} = chunk;

		if( runtime === "main" )
			return `index.js`;

		let worker_name = runtime.slice(WORKER_PREFIX.length);
		return `${workers[worker_name][1]}/index.js`;
	}
};