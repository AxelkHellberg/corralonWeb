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
        result = result.filter(val => {
          return this.extractContent(val[item[0]]) === this.extractContent(item[1]);
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

}
