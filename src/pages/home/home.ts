import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from "../../models/place";
import { PlacesProvider } from '../../providers/places';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  addPlacePage = AddPlacePage;
  places: Place[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private placesProvider: PlacesProvider
    ) {
  }

  ionViewWillEnter() {
    this.places = this.placesProvider.loadPlaces();
  }

}
