/* 
* Implemented services/mapbox.service,
* too lazy to retyped reused function with apikey.
*/

import { MapboxService } from './../shared/services/mapbox.service';
import { Component, AfterContentInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements AfterContentInit {
  map: mapboxgl.Map;

  constructor(private mapbox: MapboxService) {}

  ngAfterContentInit() {
    this.loadMap();
  }

  loadMap() {
    this.map = this.mapbox.loadMap(
      "map4",
      [0, 0],
      0
    );

    // Fixes size issue on load
    this.map.once("load", () => {
      this.map.resize();
    });

    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: {
        color: "orange"
      },
      mapboxgl: mapboxgl
    });

    this.map.addControl(geocoder, "top-left");
  }
}
