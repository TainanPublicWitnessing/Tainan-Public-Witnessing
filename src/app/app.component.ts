import {Component} from "@angular/core";

/* services */
import {NavService} from "./nav.service";

/* root component */
@Component({
  selector:"app-root",
  templateUrl:"./app.component.html",
  styleUrls:["./app.component.css"]
})
export class AppComponent{
  
  constructor(
    public navService:NavService
  ){}
  
}
