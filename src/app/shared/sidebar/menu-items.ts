import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    pathClient: '',
    pathAdmin: '',
    title: 'Menú',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    value: 0,
    submenu: []
  },
  {
    path: '',
    pathClient: '',
    pathAdmin: '',
    title: 'Configuración',
    icon: 'mdi mdi-bullseye',
    class: 'has-arrow',
    extralink: false,
    value: 0,
    submenu: [
      {
        path: '',
        pathClient: '',
        pathAdmin: '',
        title: 'Entidades',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        value: 1,
        submenu: []
      },
      {
        path: '',
        pathClient: '',
        pathAdmin: '',
        title: 'Hospitales',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        value: 2,
        submenu: []
      },
      {
        path: '',
        pathClient: '',
        pathAdmin: '',
        title: 'Especialistas',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        value: 3,
        submenu: []
      }
    ]
  },
  {
    path: '',
    pathClient: '',
    pathAdmin: '',
    title: 'Investigación',
    icon: 'mdi mdi-bullseye',
    class: 'has-arrow',
    extralink: false,
    value: 1,
    submenu: [
      {
        path: '',
        pathAdmin: '',
        pathClient: '',
        title: 'Tratamientos',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        value: 1,
        submenu: []
      }
    ]
  },
  {
    path: '',
    pathAdmin: '',
    pathClient: '',
    title: 'Reportes',
    icon: 'mdi mdi-bullseye',
    class: 'has-arrow',
    extralink: false,
    value: 2,
    submenu: [
      {
        path: '',
        pathAdmin: '',
        pathClient: '',
        title: 'Tratamientos',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        value: 1,
        submenu: []
      },
      {
        path: '',
        pathAdmin: '',
        pathClient: '',
        title: 'Dashboards',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        value: 2,
        submenu: []
      },
      {
        path: '',
        pathAdmin: '',
        pathClient: '',
        title: 'Indicadores',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        value: 3,
        submenu: []
      }
    ]
  },
  {
    path: '',
    pathAdmin: '',
    pathClient: '',
    title: 'Directorios',
    icon: 'mdi mdi-bullseye',
    class: 'has-arrow',
    extralink: false,
    value: 3,
    submenu: [
      {
        path: '',
        pathAdmin: '',
        pathClient: '',
        title: 'Entities',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        value: 1,
        submenu: []
      },
      {
        path: '',
        pathAdmin: '',
        pathClient: '',
        title: 'Hospitales',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        value: 2,
        submenu: []
      },
      {
        path: '',
        pathAdmin: '',
        pathClient: '',
        title: 'Especialistas',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        value: 3,
        submenu: []
      }
    ]
  }
];
