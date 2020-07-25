/* 
* Implemented services/mapbox.service,
* too lazy to retyped reused function with apikey.
*/

import { Component, AfterContentInit } from '@angular/core';
import { MapboxService } from '../shared/services/mapbox.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements AfterContentInit{
  map: mapboxgl.Map;

  constructor(private mapbox: MapboxService) {}

  ngAfterContentInit() {
    this.loadMap();
    this.createMarker(103.84676, 1.37995);
  }

  loadMap() {
    this.map = this.mapbox.loadMap('map1', [103.84676, 1.37995]);

    // Fixes size issue on load
    this.map.once("load", () => {
      this.map.resize();
    });
  }

  createMarker(lng: number, lat: number) {
    const marker = this.mapbox.createMarker(
      [lng, lat],
      this.map,
      {draggable: true}
    );

    marker.on('drag', () => {
      console.log(marker.getLngLat());
    });
  }
}
