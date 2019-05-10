import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
  },
  {
    title: 'Notificación de Fallas',
    icon: 'nb-shuffle',
    link: '/pages/failure-notifications',
  },
  {
    title: 'Reporte de Rondas',
    icon: 'nb-compose',
    link: '#',
  },
  {
    title: 'Administración',
    group: true,
  },
  {
    title: 'Rondas',
    children: [
      {
        title: 'Plantillas de rondas',
        link: '/pages/round-template',
      },
      {
        title: 'Plantas',
        link: '/pages/plants',
      },
    ],
  },
  {
    title: 'Guía de Maniobra',
    children: [
      {
        title: 'Plantilla de maniobra',
        link: '#',
      },
    ],
  },
  {
    title: 'Sistemas',
    children: [
      {
        title: 'Listado de sistemas',
        link: '#',
      },
      {
        title: 'Tipos de sistemas',
        link: '/pages/systems-type',
      },
      {
        title: 'Equipamiento',
        link: '#',
      },
      {
        title: 'Unidades de medida',
        link: '/pages/measurement-units',
      },
    ],
  },
  {
    title: 'Fallas',
    children: [
      {
        title: 'Listado de fallas',
        link: '#',
      },
      {
        title: 'Tipo de fallas',
        link: '#',
      },
    ],
  },
  {
    title: 'Usuarios',
    children: [
      {
        title: 'Todos los usuarios',
        link: '/pages/users',
      },
      {
        title: 'Perfiles',
        link: '/pages/profiles',
      },
    ],
  },
  {
    title: 'Plan de mantenimiento',
    icon: 'nb-star',
    link: '#',
  },
];