import webpackMerge from 'webpack-merge';
import base from './base';
import optimization from './optimization';
import { dev_env } from '../constants/environments';

const prod = {
  optimization: optimization,
};

const config = dev_env ? base : webpackMerge(base, prod);

export default config;
