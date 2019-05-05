import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Notificación de Fallas',
    icon: 'nb-shuffle',
    link: '#',
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
        link: '#',
      },
      {
        title: 'Plantas',
        link: '#',
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
        link: '#',
      },
      {
        title: 'Equipamiento',
        link: '#',
      },
      {
        title: 'Unidades de medida',
        link: '#',
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
        link: '#',
      },
      {
        title: 'Perfiles',
        link: '#',
      },
    ],
  },
  {
    title: 'Plan de mantenimiento',
    icon: 'nb-star',
    link: '#',
  },
];
