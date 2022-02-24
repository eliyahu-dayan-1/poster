import prodConfig from './prod';
import devConfig from './dev';

export default (process.env.NODE_ENV === 'production') ? prodConfig : devConfig;
