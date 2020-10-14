import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'fas fa-chart-line fa-2x',
    link: '/pages/dashboard',
  },
  {
    title: 'Notificación de Fallas',
    icon: 'fa fa-bug fa-2x',
    link: '/pages/failure-notifications',
  },
  {
    title: 'Reporte de Rondas',
    icon: 'fa fa-route fa-2x',
    link: '/pages/round-report',
  },
  {
    title: 'Reporte de guia de maniobra',
    icon: 'fa fa-play-circle fa-2x',
    link: '/pages/maneuver-guide-report',
  },
  {
    title: 'Administración',
    group: true,
  },
  {
    title: 'Plantas',
    icon: 'fa fa-sitemap fa-2x',
    children: [
      {
        title: 'Listado de plantas',
        link: '/pages/plants'
      }
    ]
  },
  {
    title: 'Sistemas',
    icon: 'fa fa-object-group fa-2x',
    children: [
      {
        title: 'Listado de sistemas',
        link: '/pages/system-list',
      },
      {
        title: 'Tipos de sistemas',
        link: '/pages/systems-type',
      },
      // {
      //   title: 'Equipamiento',
      //   link: '/pages/equipment',
      // },
      {
        title: 'Tags de sistemas',
        link: '/pages/tags-system',
      },
      // {
      //   title: 'Unidades de medida',
      //   link: '/pages/measurement-units',
      // },
    ],
  },
  {
    title: 'Equipos',
    icon: 'fa fa-hdd fa-2x',
    children: [
      {
        title: 'Listado de equipos',
        link: '/pages/equipment'
      },
      {
        title: 'Unidades de medida',
        link: '/pages/measurement-units',
      },
      {
        title: 'Tags de equipo',
        link: '/pages/tags-equipment',
      }
    ]
  },
  {
    title: 'Rondas',
    icon: 'fa fa-clipboard-list fa-2x',
    children: [
      {
        title: 'Tarea',
        link: '/pages/tarea'
      },
      {
        title: 'Plantillas de rondas',
        link: '/pages/round-template',
      }
    ],
  },
  {
    title: 'Guía de Maniobra',
    icon: 'fa fa-clipboard-list fa-2x',
    children: [
      {
        title: 'Plantilla de maniobra',
        link: '/pages/maneuver-guide-template',
      },
    ],
  },
  {
    title: 'Fallas',
    icon: 'fa fa-bug fa-2x',
    children: [
      {
        title: 'Tipo de fallas',
        link: '/pages/failure-types',
      },
    ],
  },
  {
    title: 'Usuarios',
    icon: 'fa fa-users fa-2x',
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
    title: 'Calendario',
    icon: 'fa fa-calendar fa-2x',
    children: [
      {
        title: 'Calendario',
        link: '/pages/calendario',
        
      }
    ]
  },

  {
    title: 'Plan de mantenimiento',
    icon: 'fa fa-project-diagram fa-2x',
  },

];
