import Alpine from 'alpinejs';

Alpine.data('editable', (value) => ({
  isEdited: false,
  value,
  valueEdit: value,
  expired: null,
  editable: {
    '@dblclick'() {
      // eslint-disable-next-line no-console
      // console.log('double click');
      this.isEdited = true;
    },
    '@click.outside'() {
      // eslint-disable-next-line no-console
      // console.log('click');
      this.isEdited = false;
    },
    '@touchstart'() {
      if (this.$event.touches.length === 1) {
        if (!this.expired) {
          this.expired = this.$event.timeStamp + 400;
        } else if (this.$event.timeStamp <= this.expired) {
          // remove the default of this event ( Zoom )
          this.$event.preventDefault();
          this.isEdited = true;
          // then reset the variable for other "double Touches" event
          this.expired = null;
        } else {
          // if the second touch was expired, make it as it's the first
          this.expired = this.$event.timeStamp + 400;
        }
      }
    },
  },
  afterSubmit() {
    this.value = this.valueEdit;
    this.isEdited = false;
  },
  init() {
    this.$watch('isEdited', (val) => {
      if (val === true) {
        setTimeout(() => this.$refs.fieldEdit.focus(), 20);
      } else {
        this.valueEdit = this.value;
      }
    });
  },
  field: {
    'x-show'() {
      return !this.isEdited;
    },
    'x-text'() {
      return this.value;
    },
  },
  fieldEdit: {
    'x-show'() {
      return this.isEdited;
    },
    '@keyup.escape'() {
      this.isEdited = false;
    },
  },
}));
