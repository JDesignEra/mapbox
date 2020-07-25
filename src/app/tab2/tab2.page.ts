/* 
* Implemented services/mapbox.service,
* too lazy to retyped reused function with apikey.
*/

import { Component, AfterContentInit } from '@angular/core';
import { MapboxService } from '../shared/services/mapbox.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterContentInit {
  map: mapboxgl.Map;

  constructor(private mapbox: MapboxService) {}

  ngAfterContentInit() {
    this.loadMap();
    this.createMarkers()
  }

  loadMap() {
    this.map = this.mapbox.loadMap(
      "map2",
      [-96, 37.8],
      3,
      "mapbox://styles/mapbox/light-v10"
    );

    // Fixes size issue on load
    this.map.once("load", () => {
      this.map.resize();
    });
  }

  createMarkers() {
    let geoJson = {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: "Mapbox",
          description: "Washington, D.C."
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: "Mapbox",
          description: "San Francisco, California"
        }
      }]
    };

    // Used dictionary of arrays instead of declaring 2 seperate arrays.
    let cArray = {
      "coords": [],
      "titles": []
    };
    let data = geoJson.features;

    data.forEach(item => {
      let coords = item.geometry.coordinates;
      let title = item.properties.description;

      console.log(`coordinates: ${coords}`);
      cArray["coords"].push(coords)

      console.log(`Titles: ${title}`);
      cArray["titles"].push(title);
    });

    console.log(`Coordinates Array: ${cArray["coords"]}`);
    console.log(`Array of titles: ${cArray["titles"]}`);
    
    for (let i = 0; i < cArray["coords"].length; i++) {
      const marker = this.mapbox.createMarker(
        cArray["coords"][i],
        this.map,
        {},
        `<h3>${cArray["titles"][i]}</h3>`,
        {offset: 25}
      );
    }
  }
}
