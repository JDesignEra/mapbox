/* 
* Implemented services/mapbox.service,
* too lazy to retyped reused function with apikey.
*/

import { Component, AfterContentInit } from '@angular/core';
import { MapboxService } from '../shared/services/mapbox.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterContentInit {
  map: mapboxgl.Map;
  currCoords: [number, number];

  constructor(private mapbox: MapboxService) {}

  ngAfterContentInit() {
    this.loadMap();
  }

  loadMap() {
    this.map = this.mapbox.loadMap(
      "map3",
      [0, 0],
      0,
      "mapbox://styles/mapbox/light-v10"
    );

    // Fixes size issue on load
    this.map.once("load", () => {
      this.map.resize();
      this.createCurrLocMarker();
    });

    this.map.on("click", (e) => {
      let coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];

      const marker = this.mapbox.createMarker(
        coords,
        this.map,
        {},
        `<h3> Current pos coordinates ${coords}</h3>`,
        {offset: 25}
      );

      // Show popup when created
      if (!marker.getPopup().isOpen()) {
        marker.togglePopup();
      }
    });
  }

  createCurrLocMarker() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.currCoords = [pos.coords.longitude, pos.coords.latitude];

        this.map.flyTo({
          center: this.currCoords,
          zoom: 12
        });

        const marker = this.mapbox.createMarker(
          this.currCoords,
          this.map,
          {},
          `<h3>Current pos coordinates ${this.currCoords}</h3>`,
          {offset: 25}
        );
        
        /*
        * Show popUp initially since,
        * there is no way to see the popup later with the map.onClick due to the listener
        */
        marker.togglePopup()
      });
    }
  }
}
