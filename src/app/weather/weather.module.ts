import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherService } from './service/weather.service';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './pipe/search-filter.pipe';

const routes: Routes = [
  { path: '', component: WeatherComponent },
];

@NgModule({
  declarations: [
    WeatherComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule { }
