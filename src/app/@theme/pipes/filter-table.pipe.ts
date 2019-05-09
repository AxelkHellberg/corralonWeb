import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(value: any, filterTableSettings: any = {}): any {
    filterTableSettings = Object.entries(filterTableSettings);
    let result = value;
    filterTableSettings.forEach(item => {
      if (item[1]) {
        result = result.filter(val => val[item[0]] === item[1]);
      }
    });
    return result;
  }

}
