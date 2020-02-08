import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReportService } from '../_service/report.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ){}

  /** consts */
  COMMANDS = [
    "export shift-statistic [yyyyMM]"
  ];

  /** variables */
  command_form = this.formBuilder.group({
    command: ["",Validators.required]
  });
  output: string = "";
  commands: string[] = [];

  /** subscriptions */
  subscriptions: Subscription[] = [];

  ngOnInit(){
    /** subscribes */
    this.subscriptions.push(

      this.command_form.controls.command.valueChanges.subscribe(value=>{
        this.commands = this.COMMANDS.filter(command=>{
          return command.includes(value);
        });
      })

    );
  }

  ngOnDestroy(){
    /** unsubscribe */
    this.subscriptions.forEach(subscription=>{
      subscription.unsubscribe();
    });
  }

  runCommand(){
    let params = this.command_form.value.command.split(" ");
    let command = params.shift();
    
    switch(command){
      case "export": this.export(params); break;
      default: this.syntaxError();
    }
  }

  syntaxError(){
    this.command_form.controls.command.setErrors({syntax_error: true});
  }

  export(params: string[]){
    switch(params[0]){
      case "shift-statistic": this.exportShiftStatisticAsCSV(params[1]); break;
      default: this.syntaxError();
    }
  }

  exportShiftStatisticAsCSV(yyyyMM){
    this.reportService.getMonthlyStatisticAsCSV(yyyyMM).then(result=>{
      this.output = result;
    });
  }
}
