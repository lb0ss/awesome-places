import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from "../../models/place";
import { PlacesProvider } from '../../providers/places';
import { PlacePage } from '../place/place';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Place[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private placesProvider: PlacesProvider
    ) {
  }

  ngOnInit() {
    this.placesProvider.fetchPlaces()
      .then(
        (places: Place[]) => 
          this.places = places
        );
  }

  ionViewWillEnter() {
    this.places = this.placesProvider.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place,index: index});
    modal.present();
  }

}
