// Styles
import 'modern-normalize';
import '@css/fonts.scss';
import '@css/root.scss';
import '@css/base.scss';
import '@css/icons.scss';
import '@css/grid.scss';
import '@css/utilities.scss';

// Modules
import 'ninelines-ua-parser';
import '@js/postcss-polyfills';
import Viewport from '@js/viewport';

// AlpineJS
import '@js/alpine';

// Base Components
import '@components/content/content';
import '@components/btn/btn';
import '@components/form-field/form-field';
import '@components/form-label/form-label';
import '@components/icon-svg/icon-svg';
import '@components/line-clamp/line-clamp';
import '@components/text-style/text-style';
import '@components/block-style/block-style';

// eslint-disable-next-line import/prefer-default-export
export const viewport = new Viewport({ vhProperty: false });
