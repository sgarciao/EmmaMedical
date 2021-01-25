import { Component, AfterViewInit, OnInit, Output, EventEmitter  } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AuthService]
})
export class SidebarComponent implements OnInit {
  @Output() refreshBreadcrumb: EventEmitter<any> =  new EventEmitter();
  showMenu = '';
  showSubMenu = '';

  username: string;
  branch_office_name: string;
  esEmpleado;
  user_name_prof: string;

  public sidebarnavItems: any[];
  sidebarnavItemsTemp: any[];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthService
  ) {}

  // this is for the open close
  addExpandClass(element: any) {
     if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
     // this.showMenu = element;
  }
  addActiveClass(menu: any, submenu: any) {
      this.showSubMenu = submenu.title;
    let data = {
      menu: menu,
      submenu: submenu,
    };
    this.refreshBreadcrumb.emit(data);
    localStorage.setItem('menu', menu.value);
    localStorage.setItem('submenu', submenu.value);
    localStorage.setItem('titleMenu', this.showSubMenu);

  }
  logout(e) {
    e.stopPropagation();
    e.preventDefault();
    let user_id = sessionStorage.getItem('user_id');
    this.service.logout(user_id).subscribe();
    return false;
  }
  // End open close
  ngOnInit() {
    //esperando valor del localstorage
    this.esEmpleado = localStorage.getItem('esEmpleado');
    //this.sidebarnavItemsTemp = [];
    this.sidebarnavItems = [];
    if(this.esEmpleado != null) {
      if( this.esEmpleado == 1) {
        console.log("Empleado");
        //menu administrador
        this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem).map((item) => {
          item.path = item.pathAdmin;
          item.submenu = item.submenu.map((subitem) => {
            subitem.path = subitem.pathAdmin;
            return subitem;
          });
          return item;
        });
      } else {
        //menu cliente
        this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem).map((item) => {
          item.path = item.pathClient;
          item.submenu = item.submenu.map((subitem) => {
            subitem.path = subitem.pathClient;
            return subitem;
          });
          return item;
        });
        this.sidebarnavItems.splice(1, 1);//se elimina Menu configuracion
      }
    }
    this.username = localStorage.getItem('user');

    this.user_name_prof = localStorage.getItem("user_name_prof");

    console.log("user name: " + this.user_name_prof);
    if (this.username.length != null)
    if (this.username.length > 23 ){
      this.username = this.username.substring(0, 23) + '...';
    }else{
      this.username;
    }
    this.branch_office_name = localStorage.getItem('branch_office_name');
    this.showSubMenu = localStorage.getItem('titleMenu');
  }
}
