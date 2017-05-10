import BindThis from './bindThis';

const reactComponentMethods = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'render',
  'unstable_handleError',
  'isMounted',
  'setProps',
  'replaceProps',
  'forceUpdate',
  'setState',
  'replaceState',
  'getDOMNode'
];

export function bindComponentThis(excludes?: Array<string | symbol>) {
  return BindThis({
    exclude: excludes && excludes.length ? excludes.concat(reactComponentMethods) : reactComponentMethods
  });
}
