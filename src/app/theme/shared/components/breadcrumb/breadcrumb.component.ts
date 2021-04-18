import {Component, Input, OnInit} from '@angular/core';
import {NavigationItem} from '../../../layout/admin/navigation/navigation';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { MenuService } from 'src/app/shared/services/menu.service';
import { LocalService } from 'src/app/shared/services/local.service';
import { NaxExtNavigation } from 'src/app/navext/nax-evt-navigation';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() type: string;

  public navigation: any;
  breadcrumbList: Array<any> = [];
  public navigationList: any;

  constructor(
    private _router: Router, 
    public nav: NavigationItem,
    public navext: NaxExtNavigation,
    private titleService: Title,
    private LocalStorage : LocalService
    ) {
    this.setBreadcrumb();
    this.type = 'theme2';
  }

  ngOnInit() {
  }

  setBreadcrumb() {
    let routerUrl: string;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        this.breadcrumbList.length = 0;
        const activeLink = router.url;
        this.filterNavigation(activeLink);
      }
    });
  }

  filterNavigation(activeLink) {
    let result: any;
    let title = 'Bienvenido';
    this.navigation = JSON.parse(this.LocalStorage.getJsonValue('navigation'));

    this.navigation.forEach(function (a) {
      if (a.type === 'item' && 'url' in a && a.url === activeLink) {
        result = [{
          'url': ('url' in a) ? a.url : false,
          'title': a.title,
          'breadcrumbs': ('breadcrumbs' in a) ? a.breadcrumbs : true,
          'type': a.type
        }];
        title = a.title;

      } else {
        if (a.type === 'group' && 'children' in a) {
          if(a.children !== null){
            a.children.forEach(function (b) {
              if (b.type === 'item' && 'url' in b && b.url === activeLink) {
                result = [
                  {
                    'url': ('url' in b) ? b.url : false,
                    'title': b.title,
                    'breadcrumbs': ('breadcrumbs' in b) ? b.breadcrumbs : true,
                    'type': b.type
                  }
                ];
                title = b.title;
              } else if (b.type === 'collapse' && 'url' in b && b.url === activeLink) {
                result = [{
                  'url': ('url' in b) ? b.url : false,
                  'title': b.title,
                  'breadcrumbs': ('breadcrumbs' in b) ? b.breadcrumbs : true,
                  'type': b.type
                }];
                title = b.title;
              }
              else {
                if (b.type === 'collapse' && 'children' in b) {
                  if(b.children !== null){
                    b.children.forEach(function (c) {
                      if (c.type === 'item' && 'url' in c && c.url === activeLink) {
                        result = [
                          {
                            'url': ('url' in b) ? b.url : false,
                            'title': b.title,
                            'breadcrumbs': ('breadcrumbs' in b) ? b.breadcrumbs : true,
                            'type': b.type
                          },
                          {
                            'url': ('url' in c) ? c.url : false,
                            'title': c.title,
                            'breadcrumbs': ('breadcrumbs' in c) ? c.breadcrumbs : true,
                            'type': c.type
                          }
                        ];
                        title = c.title;
                      }
                    });
                  }
                }
              }
            });
          }
        }
        else if (a.type === 'collapse' && 'children' in a) {
          if(a.children !== null){
            a.children.forEach(function (b) {
              if (b.type === 'item' && 'url' in b && b.url === activeLink) {
                result = [
                  {
                    'url': ('url' in b) ? b.url : false,
                    'title': b.title,
                    'breadcrumbs': true,
                    'type': a.type
                  }
                ];
                title = b.title;
              } else if (b.type === 'collapse' && 'url' in b && b.url === activeLink) {
                result = [{
                  'url': ('url' in b) ? b.url : false,
                  'title': b.title,
                  'breadcrumbs': ('breadcrumbs' in b) ? b.breadcrumbs : true,
                  'type': b.type
                }];
                title = b.title;
              }
              else {
                if (b.type === 'collapse' && 'children' in b) {
                  if(b.children !== null){
                    b.children.forEach(function (c) {
                      if (c.type === 'item' && 'url' in c && c.url === activeLink) {
                        result = [
                          {
                            'url': ('url' in b) ? b.url : false,
                            'title': b.title,
                            'breadcrumbs': ('breadcrumbs' in b) ? b.breadcrumbs : true,
                            'type': b.type
                          },
                          {
                            'url': ('url' in c) ? c.url : false,
                            'title': c.title,
                            'breadcrumbs': ('breadcrumbs' in c) ? c.breadcrumbs : true,
                            'type': c.type
                          }
                        ];
                        title = c.title;
                      }
                    });
                  }
                }
              }
            });
          }
        }
      }
    });

    if (result === undefined) {
      this.navigation = this.navext.get();
      this.navigation.forEach(function (a) {
        a.submenuitems.forEach(function (b) {
          if (b.link === activeLink || activeLink.includes(b.link)) {
            b.submenuitems.forEach(function (c) {
              c.submenuitems.forEach(d => {
                if (a.FormParent !== '') {
                  if (d.description === '') {
                    result = [
                      {
                        'url': false,
                        'title': a.FormParent,
                        'breadcrumbs': true,
                        'type': 'item'
                      },
                      {
                        'url': ('link' in c) ? c.link : false,
                        'title': c.description,
                        'breadcrumbs': true,
                        'type': 'item'
                      },
                      {
                        'url': ('link' in b) ? b.link : false,
                        'title': b.description,
                        'breadcrumbs': true,
                        'type': 'item'
                      }
                    ];
                  }
                  else {
                    result = [
                      {
                        'url': false,
                        'title': a.FormParent,
                        'breadcrumbs': true,
                        'type': 'item'
                      },
                      {
                        'url': ('link' in d) ? d.link : false,
                        'title': d.description,
                        'breadcrumbs': true,
                        'type': 'item'
                      },
                      {
                        'url': ('link' in c) ? c.link : false,
                        'title': c.description,
                        'breadcrumbs': true,
                        'type': 'item'
                      },
                      {
                        'url': ('link' in b) ? b.link : false,
                        'title': b.description,
                        'breadcrumbs': true,
                        'type': 'item'
                      }
                    ];
                  }
                } else {
                  if (d.description === '') {
                    result = [
                      /*{
                        'url':  false,
                        'title': a.FormParent,
                        'breadcrumbs': true,
                        'type': 'item'
                      },*/
                      {
                        'url': ('link' in c) ? c.link : false,
                        'title': c.description,
                        'breadcrumbs': true,
                        'type': 'item'
                      },
                      {
                        'url': ('link' in b) ? b.link : false,
                        'title': b.description,
                        'breadcrumbs': true,
                        'type': 'item'
                      }
                    ];
                  }
                  else {
                    result = [
                      /*{
                        'url':  false,
                        'title': a.FormParent,
                        'breadcrumbs': true,
                        'type': 'item'
                      },*/
                      {
                        'url': ('link' in d) ? d.link : false,
                        'title': d.description,
                        'breadcrumbs': true,
                        'type': 'item'
                      },
                      {
                        'url': ('link' in c) ? c.link : false,
                        'title': c.description,
                        'breadcrumbs': true,
                        'type': 'item'
                      },
                      {
                        'url': ('link' in b) ? b.link : false,
                        'title': b.description,
                        'breadcrumbs': true,
                        'type': 'item'
                      }
                    ];
                  }
                }

              });
              title = b.description;
            });
          }
        });
      });

      if (result === undefined) {
        if (activeLink.indexOf('/auth') > 0 || activeLink.indexOf('/home')) { } else {
          result = [
            {
              'url': false,
              'title': 'Inicio',
              'breadcrumbs': true,
              'type': 'item'
            }
          ]
        }
      }
    }

    this.navigationList = result;
    this.titleService.setTitle(title + ' | FE-BTW');
  }

}
