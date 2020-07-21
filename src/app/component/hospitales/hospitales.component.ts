import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})



export class HospitalesComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit() {
    console.log('Hello ' + localStorage.getItem('test_variable'));
  }

}
