import Alpine from 'alpinejs';
import './table-data.scss';

Alpine.data('tableData', () => ({
  data: null,
  sortBy: null,
  reverse: false,
  doSort() {
    this.data.sort((a, b) => {
      let a1;
      let b1;

      if (this.sortBy === 'targetGroup') {
        a1 = parseInt(a.dataset[this.sortBy], 10);
        b1 = parseInt(b.dataset[this.sortBy], 10);
      }

      if (this.sortBy === 'datetime') {
        a1 = new Date(a.dataset[this.sortBy]);
        b1 = new Date(b.dataset[this.sortBy]);
      }

      return a1 - b1;
    });

    // eslint-disable-next-line no-console
    console.log(this.data);
    this.$refs.body.innerHTML = '';
    this.$refs.body.append(...this.data);
  },
  init() {
    this.data = Array.from(this.$root.querySelectorAll('tbody tr'));
  },
  sortBtn: {
    '@click'() {
      this.sortBy = this.$event.currentTarget.dataset.sort;
      // eslint-disable-next-line no-console
      console.log(this.sortBy);
      this.doSort();
    },
  },
}));
