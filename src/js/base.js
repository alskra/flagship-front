// Styles
import '@css/base.scss';

// Modules
import 'ninelines-ua-parser';
import '@js/postcss-polyfills';
import Viewport from '@js/viewport';

// AlpineJS
import '@js/alpine';

// Base components
import '@components/content/content';
import '@components/icon-svg/icon-svg';
import '@components/line-clamp/line-clamp';
import '@components/text-style/text-style';
import '@components/block-style/block-style';
import '@components/btn/btn';
import '@components/form-field/form-field';
import '@components/form-label/form-label';

// eslint-disable-next-line import/prefer-default-export
export const viewport = new Viewport({ vhProperty: false });

// eslint-disable-next-line no-alert
alert(document.documentElement.className);
