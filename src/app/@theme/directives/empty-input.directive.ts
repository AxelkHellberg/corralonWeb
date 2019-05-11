import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[emptyInput]'
})
export class EmptyInputDirective {

  @Output() onEmpty = new EventEmitter<string>();

  constructor() { }

  @HostListener('keyup', ['$event'])
  getInputValues(event: any) {
    if (event.target.value === '') {
      this.onEmpty.emit(event.target.value);
    }
  }

}
