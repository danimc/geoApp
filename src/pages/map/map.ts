import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng} from '@ionic-native/google-maps';
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
  providers: [GoogleMaps]
})

export class MapPage {

  public map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleMaps: GoogleMaps,
    private platform: Platform) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.platform.ready().then(()=>{
      this.map = this.googleMaps.create('map');
      this.map.one(GoogleMapsEvent.MAP_READY).then((data:any)=>{
        //centrar mapa basado en la ubicacion
        let myPosition: LatLng = new LatLng(20.5979767, -103.2626793);
        this.map.animateCamera({target: myPosition, zoom: 15})
      })
    }).catch(err =>{
      console.log("error", err);
    }) 
  }

}
