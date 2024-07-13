// npm run build
// npm run watch

const buildSkeleton = require('./build/skeleton');
const RULES = require('./build/rules');

module.exports = (env, argv) => buildSkeleton('./src/', './dist/',
			[
				RULES.TypeScript,
			],
			{
				production: argv.mode === 'production',
			});