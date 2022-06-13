import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  private url = 'http://dataservice.accuweather.com';
  private API_KEY = 'xeaOMGMoABKXZTxTxS3CuMNkXHBQ6lJw';

  getTopCities() {
    return this.http.get(this.url+'/locations/v1/topcities/150?apikey=' + this.API_KEY);
  }

  getForeCast(locationKey:any, day:any = 1){
    return this.http.get(this.url+'/forecasts/v1/daily/'+day+'day/'+locationKey+'?apikey=' + this.API_KEY); 
  }

}
