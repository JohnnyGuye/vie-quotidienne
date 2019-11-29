import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {

  times: any[] = []
  days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  
  constructor() {
    

  }

  ngAfterViewInit() {
    let start = { day: 1, hours: 23, minutes: 30 };
    let end = { day: 3, hours: 10, minutes: 0 };
  
    let current = { 
        day: start.day, hours: start.hours, minutes: start.minutes };
    
    console.log( start, current, end );
    let count = 0;
    while( count++ < 100
        && (current.day < end.day 
          || (current.day == end.day && current.hours < end.hours) 
          || (current.day == end.day && current.hours == end.hours && current.minutes <= end.minutes)) ) {
    
      this.times.push({ day: current.day, hours: current.hours, minutes: current.minutes });
      
      current.minutes += 30;
      if( current.minutes >= 60 ) {
          current.minutes %= 60;
          current.hours += 1;
      }
      
      if( current.hours >= 24 ) {
          current.hours %= 24;
          current.day += 1;
      }
      
    }
    
    console.log( this.times )
  }
}
