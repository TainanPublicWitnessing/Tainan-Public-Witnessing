import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/** rxjs */
import { Subscription } from 'rxjs';

/** managers */
import { SubscribeManager } from "src/app/_managers/SubscribeManager.class";

/** services */
import { ReportService } from 'src/app/_services/report.service';
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private userService: UserService
  ){}

  /** consts */
  COMMANDS = [
    "export shift-statistic [yyyyMM]",
    "export users",
    "trans users"
  ];

  /** managers */
  subscribeManager: SubscribeManager = new SubscribeManager();

  /** variables */
  command_form = this.formBuilder.group({
    command: ["",Validators.required]
  });

  output: string = "";
  commands: string[] = [];

  /** subscriptions */
  subscriptions: Subscription[] = [];

  ngOnInit(){
    this.subscribeManager.pushSubscriptions(

      this.command_form.controls.command.valueChanges.subscribe(value=>{
        this.commands = this.COMMANDS.filter(command=>{
          return command.includes(value);
        });
      })

    );
  }

  ngOnDestroy(){
    this.subscribeManager.unsubscribeAll();
  }

  runCommand(){
    let params = this.command_form.value.command.split(" ");
    let command = params.shift();
    
    switch(command){
      case "export": this.export(params); break;
      case "trans": this.trans(params); break;
      default: this.syntaxError();
    }
  }

  syntaxError(){
    this.command_form.controls.command.setErrors({syntax_error: true});
  }

  export(params: string[]){
    switch(params[0]){
      case "shift-statistic": this.exportShiftStatisticAsCSV(params[1]); break;
      case "users": this.exportUsersAsCSV(); break;
      default: this.syntaxError();
    }
  }

  trans(params: string[]){
    switch(params[0]){
      case "users": this.transUsers(); break;
      default: this.syntaxError();
    }
  }

  exportShiftStatisticAsCSV(yyyyMM){
    this.reportService.getMonthlyStatisticAsCSV(yyyyMM).then(result=>{
      this.output = result;
    });
  }

  exportUsersAsCSV(){
    this.userService.getUsersAsCSV().then(result=>{
      this.output = result;
    });
  }

  transUsers(){
    this.userService.transUsers();
  }
}
