import Alpine from 'alpinejs';
import './table-data.scss';

Alpine.data('tableData', () => ({
  data: null,
  sortBy: null,
  sortOrder: 1,
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

      return this.sortOrder * (a1 - b1);
    });

    this.$refs.body.innerHTML = '';
    this.$refs.body.append(...this.data);
  },
  init() {
    this.data = Array.from(this.$root.querySelectorAll('tbody tr'));
  },
  sortBtn: {
    ':class'() {
      return {
        'is-active': this.$el.dataset.sort === this.sortBy,
        'is-reverse': this.sortOrder - 1,
      };
    },
    '@click'() {
      const sortBy = this.$event.currentTarget.dataset.sort;

      if (this.sortBy === sortBy) {
        this.sortOrder = -this.sortOrder;
      } else {
        this.sortOrder = 1;
      }

      this.sortBy = sortBy;
      this.doSort();
    },
  },
}));
