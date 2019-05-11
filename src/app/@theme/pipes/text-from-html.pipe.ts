import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFromHtml'
})
export class TextFromHtmlPipe implements PipeTransform {

  transform(value: any): any {
    return this.extractContent(value);
  }

  extractContent(html: string) {
    const span = document.createElement('span');
    span.innerHTML = html;
    return span.textContent || span.innerText;
  }

}
