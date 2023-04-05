import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
 @Input() title:string = "";
  @Input() data:any[] = []
  //output is from child to parent ( when we want to send something ) but input is when we want to get data 
  @Output() selectedValue = new EventEmitter()
  constructor(){ }

    ngOnInit(): void{

    }
    detectChanges(event:any){
      //we send the event to selected value
      this.selectedValue.emit(event)

    }
 

}
