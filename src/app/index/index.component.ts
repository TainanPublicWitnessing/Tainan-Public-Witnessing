import { Component, OnInit } from '@angular/core';
import {NavService} from '../nav.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private navService: NavService
  ){}

  /* events */

  ngOnInit(){
    this.navService.current_page = "首頁";
  }

}
