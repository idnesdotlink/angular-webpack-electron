import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import dir_name from '../configs/dir_name';
const config = {
  filename: (!dir_name) ? '[name].css' : `${dir_name}/[name].css`
};
const miniCssExtractPlugin = new MiniCssExtractPlugin(config);
export default miniCssExtractPlugin;