const withImages = require('next-images');
const { withPlugins } = require('next-compose-plugins');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, 'styles/antd.less'), 'utf-8'));

const config = {
	distDir: 'build', // changes from .next to _next to enable serving static assets with nginx's minimal configuration
	trailingSlash: false,
	lessLoaderOptions: {
		javascriptEnabled: true,
		modifyVars: themeVariables, // make your antd custom effective
	},
	images: {
		domains:["res.cloudinary.com"]
	},
	env: {
		NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
	},
	webpack: function (config) {
		config.module.rules.push({
			test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 100000,
					name: '[name].[ext]',
				},
			},
		});
		config.plugins.push(
			new FilterWarningsPlugin({
				exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
			})
		);

		return config;
	},
};

module.exports = withPlugins([withImages, withCss, withLess], config);
