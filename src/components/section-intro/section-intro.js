import ResizeObserver from 'resize-observer-polyfill';
import './section-intro.scss';

const sectionIntroEl = document.querySelector('.section-intro');

if (sectionIntroEl) {
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      // eslint-disable-next-line no-nested-ternary
      const contentSizes = entry.contentBoxSize
        ? entry.contentBoxSize[0] ? entry.contentBoxSize[0] : entry.contentBoxSize
        : entry.contentRect;

      sectionIntroEl.style.setProperty('--height', `${contentSizes.blockSize || contentSizes.height}px`);
    });
  });

  resizeObserver.observe(sectionIntroEl, { box: 'border-box' });
}
