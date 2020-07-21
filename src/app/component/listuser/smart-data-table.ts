
import {TooltipComponent } from './TooltipComponent'

export let settingsUsers = {
  hideSubHeader: true,
  defaultStyle: false,
  width: '100px',
  columns: {
    name: {
      title: 'Usuario',
      filter: true,
      width: '20%',
      type: 'html'
    },
    middlename: {
      title: 'Nombre',
      filter: true,
      width: '20%',
      type: 'html'
    },
    position: {
      title: 'Puesto',
      filter: true,
      width: '20%',
      type: 'html'
    },
    creation_date: {
      title: 'Fecha Creacion',
      filter: true,
      width: '20%',
      type: 'html'
    },
    status: {
      title: 'Estatus',
      filter: true,
      width: '20%',
      type: 'html'
    }
  },

  actions: {
    add: false,
    edit: false,
    delete: false,
    columnTitle: "",      
    position:  'right',
  },
  attr: { class: 'fixed_header' },
  pager: { perPage: 5, totalKey: 100, float: 'right;' }
  
};