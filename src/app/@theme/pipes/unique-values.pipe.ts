import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueValues'
})
export class UniqueValuesPipe implements PipeTransform {

  transform(value: any, filterBy: string): any {
    return filterBy && Array.from(new Set(value.map(item => item[filterBy]))) || value;
  }

}
