import CircularDependencyPlugin from 'circular-dependency-plugin';
const circularDependencyPlugin = new CircularDependencyPlugin({
  exclude: /[\\\/]node_modules[\\\/]/
});

export default circularDependencyPlugin;