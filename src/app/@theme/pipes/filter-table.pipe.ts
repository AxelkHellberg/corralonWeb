import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(value: any, filterTableSettings: any = {}): any {
    filterTableSettings = Object.entries(filterTableSettings);
    let result = value;
    filterTableSettings.forEach(filterConfig => {
      if (filterConfig[1]) {
        result = result.filter(data => {
          const _data = this.extractContent(data[filterConfig[0]]);
          const filterData = this.extractContent(filterConfig[1]);
          if (_data === filterData) {
            return _data === filterData;
          } else if (moment(_data,  'DD/MM/YYYY hh:mm').isValid()) {
            console.log(this.filterByDate(data[filterConfig[0]], filterConfig[1]));
            return this.filterByDate(data[filterConfig[0]], filterConfig[1]);
          }
        });
      }
    });
    return result;
  }

  extractContent(html: string) {
    const span = document.createElement('span');
    span.innerHTML = html;
    return span.textContent || span.innerText;
  }

  filterByDate(date: any, dateRange: any) {
    let { start, end } = dateRange;

    date = moment(date, 'DD/MM/YYYY').toDate();
    start = moment(start, 'DD/MM/YYYY').toDate();
    end = end && moment(end, 'DD/MM/YYYY').toDate();

    return end && !(moment(date).isBefore(start) || moment(date).isAfter(end)) ||
           moment(date).isSame(start);
  }

}
