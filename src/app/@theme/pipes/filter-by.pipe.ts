import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(value = [], filterName: string, filterValue: any): any {
    if (filterName && filterValue) {
      return value.filter(val => val[filterName] === filterValue);
    }
    return value;
  }

}
