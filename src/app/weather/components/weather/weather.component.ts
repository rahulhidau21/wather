import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../../service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  term:any;
  activeTerm:any;
  data:any = [];  
  showSerach:boolean = false;
  todayData:any;
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(
    private weatherService : WeatherService
  ) { }

  ngOnInit(): void {
    this.getTopCities();
  }

  getTopCities(){
    var cities = localStorage.getItem('cities');
    if(cities == undefined || cities == 'cities' || cities == ''){
      this.weatherService.getTopCities().subscribe(
        data =>{
          this.data = data;
          localStorage.setItem('cities',JSON.stringify(this.data));
        },
        error =>{
          console.log(error)
        }
      );
    }else{
      this.data = JSON.parse(cities);
    }
  }

  filterCities(){
    this.showSerach = true;
  }

  closeSearch(){
    this.showSerach = false;
    this.term = '';
    this.activeTerm = {};
  }

  selectTerm(item:any){
    this.activeTerm = item;
    this.showSerach = false;
    this.term = item.LocalizedName;
    this.weatherService.getForeCast(item.Key, 5).subscribe(res=>{
      this.todayData = res; 
      var todayData:any = res;
      var date = new Date(todayData.DailyForecasts[0].Date);
      var date1 = new Date(todayData.DailyForecasts[1].Date);
      var date2 = new Date(todayData.DailyForecasts[2].Date);
      var date3 = new Date(todayData.DailyForecasts[3].Date);
      this.todayData = { 
        date: this.days[date.getDay()] + ','+date.getDate()+' '+this.months[date.getMonth()],
        temperature: todayData.DailyForecasts[0].Temperature.Maximum,
        city: this.activeTerm.LocalizedName,
        country: this.activeTerm.Country.LocalizedName,
        upcomingDay1: {
          day: this.days[date1.getDay()],
          temperature: todayData.DailyForecasts[1].Temperature.Maximum,
        },
        upcomingDay2: {
          day: this.days[date2.getDay()],
          temperature: todayData.DailyForecasts[2].Temperature.Maximum,
        },
        upcomingDay3: {
          day: this.days[date3.getDay()],
          temperature: todayData.DailyForecasts[3].Temperature.Maximum,
        },
      };
    });
  }

}
