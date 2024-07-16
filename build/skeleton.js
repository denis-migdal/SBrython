//const copyAssets = require('./copyAssets');
//const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const genCoreModuleList = require('./genCoreModuleList');

module.exports = function (src, dst, rules = [], options = {}) {

	let {assets, production} = options;

	let prod = production ? 'prod' : 'dev';
	console.log('Build mode:', prod);

	dst = `${dst}/${prod}`;

	let ROOT = process.cwd();

	let config = {
		module: {
			rules: [],
		},
		entry: {
			main: [],
		},
		output: {
			path: `${ROOT}/${dst}`,
			publicPath: '',
			clean: {
				//dry: true
			},
			compareBeforeEmit: true
		},
		target: "web",
        plugins: [{
            apply: (compiler) => {
                compiler.hooks.compile.tap("MyPlugin_compile", () => {
                	genCoreModuleList();
                });
            },
        }],
		//watch: WATCH, no needs (--watch / --no-watch)
		watchOptions: {
			ignored: [	'**/node_modules',
						'**/.git',
						`${__dirname}/../build`,
						`${__dirname}/../dist`,
						`${__dirname}/../doc`,
						`${__dirname}/../.gitignore`,
						`${__dirname}/../.gitmodules`,
						`${__dirname}/../package-lock.json`,
						`${__dirname}/../package.json`,
						`${__dirname}/../README.md`,
						`${__dirname}/../tsconfig.json`,
						`${__dirname}/../webpack.config.js`]
		},
		devtool: "inline-source-map", //"source-map"
		stats: {
 			"errorDetails": true
		},
	};

	for(let rule of rules)
		rule(config, src, options);

	//if(assets)
	//	copyAssets(config, assets);

	return config;
	//return smp.wrap( config );
}