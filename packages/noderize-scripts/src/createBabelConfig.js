export default ({
	                targets,
	                babel: { presets = [], plugins = [] }
                } = {}) => ({
	presets: [
		[
			"@babel/preset-env",
			{
				targets
			}
		],
		"@babel/preset-stage-2",
		"@babel/preset-flow",
		...presets
	],
	plugins: ["@babel/plugin-proposal-decorators", "@babel/plugin-transform-runtime", ...plugins]
});