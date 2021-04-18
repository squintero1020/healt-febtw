import { Injectable } from '@angular/core';

export interface NaxEvtNavigation {
    FormParent: string;
    link: string;
    description: string;
    submenuitems?: Navigation[];
}

export interface Navigation extends NaxEvtNavigation {
    submenuitems?: NaxEvtNavigation[];
}

const settings = [
    {
        FormParent: 'Inicio',
        submenuitems: [
            {
                link: '/app/Usuarios/crearusuario',
                description: 'Crear Usuario',
                submenuitems: [
                    {
                        link: '/app/Usuarios',
                        description: 'Usuarios',
                        submenuitems: [
                            {
                                link: '',
                                description: ''
                            }
                        ]
                    }
                ]
            },
            {
                link: '/app/Usuarios/verusuario',
                description: 'Ver Usuario',
                submenuitems: [
                    {
                        link: '/app/Usuarios',
                        description: 'Usuarios',
                        submenuitems: [
                            {
                                link: '',
                                description: ''
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

@Injectable()
export class NaxExtNavigation {
    get() {
        return settings;
    }
}