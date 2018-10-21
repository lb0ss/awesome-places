import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Location } from "../../models/location";

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  location: Location;
  marker: Location;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.location = navParams.get('location');
  }

 onSetMarker(event: any) {
   console.log(event);
    this.marker = new Location(event.coords.lat, event.coords.lng);
 }
}
