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

export function BindComponentThis(excludes?: Array<string | symbol>, { execConstructor = true }: { execConstructor?: boolean } = {}) {
  return BindThis({
    exclude: excludes && excludes.length ? excludes.concat(reactComponentMethods) : reactComponentMethods,
    execConstructor
  });
}

export default BindComponentThis;
