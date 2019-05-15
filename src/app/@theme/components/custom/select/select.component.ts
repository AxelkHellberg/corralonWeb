import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  rowData: any;
  selectData = {
    selected: '',
    selectItems: [
      {
        text: '',
        value: '',
      },
    ],
    placeholder: '',
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  setConfig(column: string) {
    setTimeout(() => {
      this.selectData = this.rowData[column];
      this.changeDetectorRef.detectChanges();
    }, 200);
  }

}
