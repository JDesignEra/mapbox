/* 
* Implemented services/mapbox.service,
* too lazy to retyped reused function with apikey.
*/

import { MapboxService } from './../shared/services/mapbox.service';
import { Component, AfterContentInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements AfterContentInit {
  map: mapboxgl.Map;

  constructor(private mapbox: MapboxService) {}
  
  ngAfterContentInit() {
    this.loadMap();
  }

  loadMap() {
    this.map = this.mapbox.loadMap(
      "map5",
      [0, 0],
      0
    );

    // Fixes size issue on load
    this.map.once("load", () => {
      this.map.resize();
    });

    this.map.addControl(
      new MapboxDirections({accessToken: mapboxgl.accessToken}),
      "top-left"
    );
  }
}
