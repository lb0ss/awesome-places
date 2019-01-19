import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Place } from '../../models/place';
import { PlacesProvider } from '../../providers/places';

@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place: Place;
  index: number
  constructor(
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private placesProvider: PlacesProvider
    ) {
      this.place = this.navParams.get('place');
      this.index = this.navParams.get('index');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onDelete() {
    console.log("ondelete clicked");
    this.placesProvider.deletePlace(this.index);
    this.onLeave();
  }

}
