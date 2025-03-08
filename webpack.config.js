import buildConfigs from "./build/WebpackFramework/index.js";

export default buildConfigs("./src/",
                            "./dist/${version}/",
                            {
                                "@SBrython": "src/"
                            });

/* 
const buildSkeleton = require('./build/skeleton');
const RULES = require('./build/rules');

module.exports = (env, argv) => buildSkeleton('./src/', './dist/',
			[
				RULES.TypeScript,
			],
			{
				production: argv.mode === 'production',
			});
*/