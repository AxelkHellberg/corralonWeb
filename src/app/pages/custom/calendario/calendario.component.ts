import { Component, OnInit } from '@angular/core';







@Component({
  selector: 'ngx-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

date = new Date;
    constructor() {
        
    }

  ngOnInit() {
}
selectDate(date: any)
{
  console.log(date);
}

  }


