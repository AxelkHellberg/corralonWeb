import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.scss']
})
export class RoundDetailComponent implements OnInit {

  nodes = [{
    name: 'Cargador Evequoz 220VCC',
    children: [{
      name: 'U. Consumo',
      children: [{
        name: 'Unidad: VOLT',
      }, {
        name: 'Valor normal: 230',
      }, {
        name: 'Valor de alarma: 240',
      }, {
        name: 'Valor de falla: 250',
      }, {
        name: 'Valor ingresado: 252',
      }],
    }, {
      name: 'I. Consumo',
      children: [{
        name: 'Unidad: AMP',
      }, {
        name: 'Valor normal: 20',
      }, {
        name: 'Valor de alarma: 22',
      }, {
        name: 'Valor ingresado: 20',
      }],
    }],
  }];
  nodesTag = [
    {
      id: 1,
      title: 'Cargador Evequoz  220VCC',
      className: 'root1Class',
      hasChildren: true,
    },
    {
      id: 2,
      title: 'Cargador MAGSA 24VCC',
      className: 'root2Class',
      hasChildren: true,
    }
  ];

  options = [
    { value: 'true', label: 'Leído' },
    { value: 'false', label: 'No Leído' },
  ];

  option: { [key: string]: any; } = {}

  constructor() { }

  ngOnInit() {
  }

}
