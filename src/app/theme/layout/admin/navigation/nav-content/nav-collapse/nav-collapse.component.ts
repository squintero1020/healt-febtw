import {Component, Input, OnInit} from '@angular/core';
import {NavigationItem} from '../../navigation';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {DattaConfig} from '../../../../../../app-config';
import {formatNumber, Location} from '@angular/common';

@Component({
  selector: 'app-nav-collapse',
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)', display: 'block'}),
        animate('250ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ],
})
export class NavCollapseComponent implements OnInit {
  public visible;
  @Input() item: NavigationItem;
  public dattaConfig: any;
  public themeLayout: string;

  constructor(private location: Location) {
    this.visible = false;
    this.dattaConfig = DattaConfig.config;
    this.themeLayout = this.dattaConfig['layout'];
  }

  ngOnInit() {
    // at reload time active and trigger link
    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig['layout'] === 'vertical') {
          parent.classList.add('pcoded-trigger');
        }
        parent.classList.add('active');
      } else if(up_parent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig['layout'] === 'vertical') {
          up_parent.classList.add('pcoded-trigger');
        }
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig['layout'] === 'vertical') {
          last_parent.classList.add('pcoded-trigger');
        }
        last_parent.classList.add('active');
      }
    }
    else{
      let finally_url = '';
      let url = current_url.split('/');
      let i = 0;
      url.forEach(a => {
        if(i < 3)
          if(a !== '')
            finally_url += '/'+a;
        i++;
      });
      const link = "a.nav-link[ href='" + finally_url + "' ]";
      const ele = document.querySelector(link);
      if (ele !== null && ele !== undefined) {
        const parent = ele.parentElement;
        const up_parent = parent.parentElement.parentElement;
        const last_parent = up_parent.parentElement;
        if (parent.classList.contains('pcoded-hasmenu')) {
          if (this.dattaConfig['layout'] === 'vertical') {
            parent.classList.add('pcoded-trigger');
          }
          parent.classList.add('active');
        } else if(up_parent.classList.contains('pcoded-hasmenu')) {
          if (this.dattaConfig['layout'] === 'vertical') {
            up_parent.classList.add('pcoded-trigger');
          }
          up_parent.classList.add('active');
        } else if (last_parent.classList.contains('pcoded-hasmenu')) {
          if (this.dattaConfig['layout'] === 'vertical') {
            last_parent.classList.add('pcoded-trigger');
          }
          last_parent.classList.add('active');
        }
      }
    }
  }

  navCollapse(e) {
    this.visible = !this.visible;

    let parent = e.target;
    if (this.themeLayout === 'vertical') {
      parent = parent.parentElement;
    }

    const sections = document.querySelectorAll('.pcoded-hasmenu');
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] !== parent) {
        sections[i].classList.remove('pcoded-trigger');
      }
    }

    let first_parent = parent.parentElement;
    let pre_parent = parent.parentElement.parentElement;
      if (first_parent.classList.contains('pcoded-hasmenu')) {
        do {
          first_parent.classList.add('pcoded-trigger');
          // first_parent.parentElement.classList.toggle('pcoded-trigger');
          first_parent = first_parent.parentElement.parentElement.parentElement;
        } while (first_parent.classList.contains('pcoded-hasmenu'));
      } else if (pre_parent.classList.contains('pcoded-submenu')) {
        do {
          pre_parent.parentElement.classList.add('pcoded-trigger');
          pre_parent = pre_parent.parentElement.parentElement.parentElement;
        } while (pre_parent.classList.contains('pcoded-submenu'));
      }
      parent.classList.toggle('pcoded-trigger');
  }

}
