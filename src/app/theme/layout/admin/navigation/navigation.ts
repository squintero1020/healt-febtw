import { Injectable } from "@angular/core";

export interface NavigationItem {
  id: string;
  title: string;
  type: "item" | "collapse" | "group";
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}


var rolId: number = 0;

rolId = Number(localStorage.getItem("rolId"));



const NavigationItemsBasic = [
  {
    id: "navigation",
    title: "Navigation",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "facturas",
        title: "CCDOC",
        type: "item",
        icon: "feather icon-file-text",
        url: "/ccdoc",
      },
    ],
  },
];

const NavigationItems = [
  {
    id: "navigation",
    title: "Navigation",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "facturas",
        title: "CCDOC",
        type: "item",
        icon: "feather icon-file-text",
        url: "/ccdoc",
      },
      {
        id: "conf-Inicial",
        title: "Configuración inicial",
        type: "collapse",
        icon: "feather icon-settings",
        children: [
          {
            id: "usuarios",
            title: "Usuarios",
            type: "item",
          icon: "feather icon-user",
            url: "/usuarios",
          },
          {
            id: "grupos",
            title: "Grupos",
            type: "item",
            icon: "feather icon-users",
            url: "/grupos",
          },
          {
            id: "acciones",
            title: "Acciones",
            type: "item",
            icon: "feather icon-check-square",
            url: "/acciones",
          },
          {
            id: "flujos",
            title: "Flujos",
            type: "item",
            icon: "feather icon-fast-forward",
            url: "/flujos",
          },
          {
            id: "proveedores",
            title: "Proveedores",
            type: "item",
            icon: "feather icon-box",
            url: "/proveedores",
          },
          // {
          //   id: "confCorrClientes",
          //   title: "Configuración Correo",
          //   type: "item",
          //   icon: "feather icon-mail",
          //   url: "/confCorrClientes",
          // },
        ],
      },
    ],
  },
];

@Injectable()
export class NavigationItem {
  get() {
    console.log(rolId);
    if(rolId === 1)
      return NavigationItems;
    else
      return NavigationItemsBasic;
  }
}
