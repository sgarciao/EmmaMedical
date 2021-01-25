import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  //////////////DATOS DE USUARIO
  username:               string;
  branch_office_name:     string;
  uname_s: string;
  constructor(
    private routes: Router,
    private modalService: NgbModal,
    private service: AuthService) {}

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];
  logout(e) {
    e.stopPropagation();
    e.preventDefault();
    this.service.logout(this.username).subscribe();
    return false;
  }
  ngOnInit(){
    this.uname_s = sessionStorage.getItem("user_name_show");
    this.username = sessionStorage.getItem('user_id');
    console.log("Usuario.... " + this.username);
    if (this.username != null || this.username == ""){
      if (this.username.length > 23 ){
        this.username = this.username.substring(0, 23) + '...';
      }else{
        this.username;
      }
    }
    this.branch_office_name = localStorage.getItem('branch_office_name');
  }
  ngAfterViewInit() {

  }
  userProfile(){
    this.routes.navigate(['/user-profile']);
  }
}
