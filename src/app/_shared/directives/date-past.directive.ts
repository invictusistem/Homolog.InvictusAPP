import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[datePastCheck]'})
export class DatePastDirective {

    private hasView = false;

    //new Date(this.paramentrosEventos[index + 1].datainicio).valueOf() >=
      //              new Date(evento.dataFim).valueOf()) {

    constructor(
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef) { }
  
    @Input() set datePastCheck(data: Date) {

        data = new Date(data)
        let dateNow = new Date()
        //console.log(data)
        //console.log(dateNow)

        if(new Date(data).valueOf() < new Date().valueOf()){

            this.viewContainer.createEmbeddedView(this.templateRef);

        }else{

            this.viewContainer.clear();

        }

       

    //   if (!condition && !this.hasView) {
    //     this.viewContainer.createEmbeddedView(this.templateRef);
    //     this.hasView = true;
    //   } else if (condition && this.hasView) {
    //     
    //     this.hasView = false;
    //   }
    }
  }