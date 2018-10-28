import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController, LoadingController } from 'ionic-angular';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from "../../models/location";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PlacesProvider } from '../../providers/places';

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 34.052235,
    lng: -118.243683
  };
  locationIsSet = false;
  imageUrl = '';

  constructor(
    private modalCtrl: ModalController,
    private geoLocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private placesProvider: PlacesProvider
    ) {}

  onSubmit(form: NgForm) {
    this.placesProvider.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 34.052235,
      lng: -118.243683
    };
    this.imageUrl = '';
    this.locationIsSet = false;
    console.log(form.value);
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: "Getting your Location..."
    });
    loader.present()
    this.geoLocation.getCurrentPosition()
      .then( 
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could not get location, please select manually',
            duration: 2500
          });
          toast.present();
        }
      )
  }
  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }
  onTakePhoto() {
    this.camera.getPicture({
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      allowEdit: true
    })
    .then(
      imageData => {
        console.log(imageData);
        this.imageUrl = imageData;
      }
    )
    .catch(
      err => {
        console.log(err)
      }
    )
    
  }
}
