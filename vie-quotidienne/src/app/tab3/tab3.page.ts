import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sets = [ 
      { key: "0", value: "Set par défaut"},
      { key: "1", value: "Semaine de cours"},
      { key: "2", value: "Voyage à Toronto"},
      { key: "3", value: "Préparation au marathon"},
      { key: "4", value: "Tournée Européenne"}
    ];
    
  currentSet = 0;
  
  constructor() {}

}
