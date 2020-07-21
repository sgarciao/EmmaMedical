import { Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() layout;
  @Input() menuData;

  pageInfo = {
    title:  '',
    data: {
      urls: [{title: '', url: ''},
             {title: '', url: ''}
            ]
    }
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd && !event.url.includes('login')))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        //this.titleService.setTitle(event['title']);
        //this.pageInfo = event;
        //Buscar menu
        let encontroSubMenu= false;
        if(event.menu != null){
          for(let menu of event.menu) {
            if( menu.value == localStorage.getItem('menu')){
              this.setMenu(menu);
              for(let submenu of menu.submenu){
                if( submenu.value == localStorage.getItem('submenu')){
                  this.setSubMenu(submenu);
                  encontroSubMenu = true;
                  break;
                }
              }
              break;
            }
          }
        }
        if(!encontroSubMenu) {
          //Opcion default del componente
        this.setMenu(event.menu[0]);
        this.setSubMenu(event.menu[0].submenu[0]);
        //this.router.navigateByUrl(event.menu[0].submenu[0].url);
        localStorage.setItem('menu', event.menu[0].value);
        localStorage.setItem('submenu', event.menu[0].submenu[0].value);
        }
      });
  }
  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges ){
    if(changes.menuData.currentValue != null ) {
       //Menu padre
    this.setMenu(changes.menuData.currentValue.menu);
    //Menu Hijo
    this.setSubMenu(changes.menuData.currentValue.submenu);
    }
  }
  setMenu(menu: any){
    this.pageInfo.data.urls[0].title = menu.title;
    this.pageInfo.data.urls[0].url = (menu.url == null) ? menu.path : menu.url;

  }
  setSubMenu(submenu: any){
    this.pageInfo.data.urls[1].title = submenu.title;
    this.pageInfo.data.urls[1].url = (submenu.url == null) ? submenu.path : submenu.url;
    this.pageInfo.title = submenu.title;
  }
}
