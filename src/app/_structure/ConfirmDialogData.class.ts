export class ConfirmDialogData{

  constructor(title: string, message: string, fields: any){
    this.title = title;
    this.message = message;
    this.fields = fields;
  }

  /** variables */
  title: string;
  message: string;
  fields: any;
}