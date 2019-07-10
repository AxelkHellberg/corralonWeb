import { LocalDataSource } from 'ng2-smart-table';
import { Deferred } from 'q';

export interface SmartTableSettings {
  mode?:             'inline' | 'external' | 'click-to-edit';
  selectMode?:       'single' | 'multi';
  hideHeader?:       boolean;
  hideSubHeader?:    boolean;
  actions?:          Actions | boolean;
  filter?:           Filter;
  edit?:             Edit;
  add?:              Add;
  delete?:           Delete;
  attr?:             Attr;
  noDataMessage?:    string;
  columns?:          Columns;
  pager?:            Pager;
  rowClassFunction?: () => string;
}

export interface Actions {
  columnTitle?: string;
  add?:         boolean;
  edit?:        boolean;
  delete?:      boolean;
  custom?:      any[];
  position?:    'left' | 'rigth';
}

export interface Add {
  inputClass?:          string;
  addButtonContent?:    string;
  createButtonContent?: string;
  cancelButtonContent?: string;
  confirmCreate?:       boolean;
}

export interface Attr {
  id?:    string;
  class?: string;
}

export interface Columns {
  [key: string]: Column;
}

export interface Column {
  title: string;
  type: 'html' | 'text' | 'custom';
  width?: string;
  editable?: boolean;
  [key: string]: any;
}

export interface Delete {
  deleteButtonContent?: string;
  confirmDelete?:       boolean;
}

export interface Edit {
  inputClass?:          string;
  editButtonContent?:   string;
  saveButtonContent?:   string;
  cancelButtonContent?: string;
  confirmSave?:         boolean;
}

export interface Filter {
  inputClass?: string;
}

export interface Pager {
  display?: boolean;
  perPage?: number;
}


export interface ConfirmData {
  confirm: any;
  newData?: any;
  data?: any;
  source: LocalDataSource;
}
