import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [GoogleMaps, Geolocation]
})

export class MapPage {

  public map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleMaps: GoogleMaps,
    private platform: Platform,
    private geolocation: Geolocation) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.platform.ready().then(()=>{
      this.map = this.googleMaps.create('map');
      this.map.one(GoogleMapsEvent.MAP_READY).then((data:any)=>{
        //centrar mapa basado en la ubicacion
        this.geolocation.getCurrentPosition().then(posicion => {
          let myPosition = new LatLng(posicion.coords.latitude, posicion.coords.longitude);
          this.map.animateCamera({target: myPosition, zoom: 15});
          this.map.addMarker({
            position: myPosition,
            title: "Tu estas Aqui"
          });
        })             
      })
    }).catch(err =>{
      console.log("error", err);
    }) 
  }

}
