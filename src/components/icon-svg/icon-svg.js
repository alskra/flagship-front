import 'construct-style-sheets-polyfill';
import ResizeObserver from 'resize-observer-polyfill';
import style from './icon-svg.scss?module';

const requireIcon = require.context(
  '@images/icons/svg?raw',
  false,
  /\.svg$/,
);

const icons = {};

requireIcon.keys().forEach((iconPath) => {
  const iconName = iconPath
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');

  icons[iconName] = requireIcon(iconPath).default || requireIcon(iconPath);
});

const template = document.createElement('template');
const styleSheet = new CSSStyleSheet();

styleSheet.replaceSync(style);

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const contentBoxSize = (entry.contentBoxSize && entry.contentBoxSize[0]) || entry.contentBoxSize;
    const iconWidth = (contentBoxSize && contentBoxSize.inlineSize) || entry.contentRect.width;
    const iconHeight = (contentBoxSize && contentBoxSize.blockSize) || entry.contentRect.height;
    // eslint-disable-next-line max-len
    const viewBox = `0 0 ${(iconWidth / (iconHeight || 1)) * entry.target.svgViewBoxHeight} ${entry.target.svgViewBoxHeight}`;

    entry.target.svgEl.setAttribute('viewBox', viewBox);
  });
});

class IconSvg extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  get name() {
    return this.getAttribute('name');
  }

  get svgEl() {
    return this.shadowRoot.querySelector('svg') || document.createElement('svg');
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [styleSheet];
    this.shadowRoot.append(this.svgEl);
  }

  update() {
    template.innerHTML = icons[this.name];
    this.svgEl.replaceWith(template.content);
    this.svgEl.style.aspectRatio = `${this.svgEl.getAttribute('viewBox').split(/\s+/).slice(2).join('/')}`;

    if ([].includes(this.name)) {
      this.svgViewBoxHeight = +this.svgEl.getAttribute('viewBox').split(/\s+/).pop();
      resizeObserver.observe(this);
    } else {
      resizeObserver.unobserve(this);
    }
  }

  disconnectedCallback() {
    if ([].includes(this.name)) {
      resizeObserver.unobserve(this);
    }
  }

  attributeChangedCallback(name) {
    if (name === 'name') {
      this.update();
    }
  }
}

customElements.define('icon-svg', IconSvg);

export default IconSvg;
export { icons };
