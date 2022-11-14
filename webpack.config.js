/* eslint-env amd, node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = env => {
	const production = env && env.NODE_ENV === 'production';
	const analyze = env && env.analyze ? [new BundleAnalyzerPlugin()] : [];
	const miniCssExtractPlugin = production
		? [
			new MiniCssExtractPlugin({
				chunkFilename: '[id].css',
				filename: '[name].[contenthash].css',
			}),
		]
		: [];
	const compression = production
		? [
			new CompressionPlugin({
				filename: '[path].gz[query]',
				algorithm: 'gzip',
				test: /\.js$|\.css$|\.html$/u,
				minRatio: 1,
			}),
			new CompressionPlugin({
				filename: '[path].br[query]',
				algorithm: 'brotliCompress',
				test: /\.(js|css|html|svg)$/u,
				compressionOptions: { level: 11 },
				minRatio: 1,
			}),
		]
		: [];
	const plugins = [
		new ESLintPlugin(),
		new CleanWebpackPlugin(),
		...analyze,
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			chunks: ['main'],
		}),
		...miniCssExtractPlugin,
		...compression,
	];

	return {
		entry: {
			main: [
				'./src/index.tsx',
			],
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].[contenthash].js',
		},
		devtool: production ? 'source-map' : 'inline-cheap-source-map',
		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/u,
					exclude: /node_modules/u,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										modules: false,
										useBuiltIns: 'usage',
										corejs: '3',
									},
								],
								'@babel/preset-typescript',
								[
									'@babel/preset-react',
									{
										runtime: 'automatic',
									},
								],
							],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-proposal-object-rest-spread',
								'@babel/plugin-syntax-dynamic-import',
							],
						},
					},
				},
				{
					test: /\.(css|less)$/u,
					use: [
						production ? MiniCssExtractPlugin.loader : 'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2,
							},
						},
						'less-loader',
					],
				},
				{
					test: /\.(png|svg|jpg|gif)$/u,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 2048,
							},
						},
					],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/u,
					use: 'file-loader',
				},
			],
		},
		resolve: {
			extensions: [
				'.ts',
				'.tsx',
				'.js',
				'.jsx',
				'.mjs',
			],
			alias: {
				'~': path.resolve(__dirname, 'src/'),
			},
		},
		devServer: {
			//https: true,
			static: {
				directory: path.join(__dirname, 'dist'),
			},
			historyApiFallback: true,
			port: 8080,
			host: 'localhost',
			allowedHosts: 'all',
		},
		plugins,
		optimization: {
			minimizer: [
				new TerserPlugin({
					parallel: true,
				}),
			],
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /node_modules/u,
						chunks: 'initial',
						name: 'vendor',
						enforce: true,
					},
				},
			},
		},
	};
};

module.exports = config;
