import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { ChartDrawer } from "../classes/charts";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {

  // @ViewChild('chartcontainer')
  // chartcontainer: ElementRef;
  // 
  // @ViewChild('chartsvg')
  // chartsvg: ElementRef
  // 
  // chartDrawer: ChartDrawer = null
  // 
  constructor() {
  
  }
  
  ngAfterViewInit() {
  
    // this.chartDrawer = new ChartDrawer( this.chartcontainer.nativeElement, this.chartsvg.nativeElement );
    // 
    // this.chartDrawer.drawGrid();
    // this.chartDrawer.drawLine( [
    //   80, 65, 65, 40, 55, 34, 54, 50, 60, 64, 55, 27, 24, 30
    // ]);
    console.log( "lol" );
    
    
  }

}
