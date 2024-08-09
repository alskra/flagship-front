import Alpine from 'alpinejs';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import '@components/target-groups/target-groups';
import './event-settings.scss';

Alpine.data('eventSettings', () => ({
  dpStart: null,
  dpEnd: null,
  dtf: new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Europe/Moscow',
  }),
  init() {
    this.$nextTick(() => {
      this.dpStart = new AirDatepicker(this.$refs.startDate, {
        position: 'right center',
        timepicker: true,
        isMobile: !this.$store.minLg,
        altField: this.$refs.startDate.nextElementSibling,
        minDate: new Date(),
        dateFormat: (date) => this.dtf.format(date),
        onSelect: ({ date }) => {
          this.dpEnd.update({
            minDate: date || new Date(),
          });
        },
      });

      this.dpEnd = new AirDatepicker(this.$refs.endDate, {
        position: 'right center',
        timepicker: true,
        isMobile: !this.$store.minLg,
        altField: this.$refs.endDate.nextElementSibling,
        minDate: new Date(),
        dateFormat: (date) => this.dtf.format(date),
        onSelect: ({ date }) => {
          this.dpStart.update({
            maxDate: date,
          });
        },
      });
    });

    this.$watch('$store.minLg', (val) => {
      [this.dpStart, this.dpEnd].forEach((item) => {
        item.update({ isMobile: !val });
      });
    });
  },
}));
