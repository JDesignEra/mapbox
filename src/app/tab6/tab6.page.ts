import { MapboxService } from './../shared/services/mapbox.service';
import { Component, AfterContentInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements AfterContentInit {
  map: mapboxgl.Map;

  constructor(private mapbox: MapboxService) { }
  
  ngAfterContentInit() {
    this.loadMap();
  }

  loadMap() {
    this.map = this.mapbox.loadMap(
      "map6",
      [-120, 50],
      2,
      "mapbox://styles/mapbox/dark-v10"
    );

    // Fixes size issue on load
    this.map.once("load", () => {
      this.map.resize();

      this.map.addSource("earthquakes", {
        type: "geojson",
        data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
      });

      this.map.addLayer({
        id: "earthquales-heat",
        type: "heatmap",
        source: "earthquakes",
        maxzoom: 9,
        paint: {
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            0,
            0,
            6,
            1
          ],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33, 102, 172, 0)",
            0.2,
            "rgb(103, 169, 207)",
            0.4,
            "rgb(209, 229, 240)",
            0.6,
            "rgb(253, 219, 199)",
            0.8,
            "rgb(239, 138, 98)",
            1,
            "rgb(179, 24, 43)",
          ],
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            2,
            9,
            20
          ],
          "heatmap-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            1,
            9,
            0
          ]
        }
      }, "waterway-label");

      this.map.addLayer({
        id: "earthquakes-point",
        type: "circle",
        source: "earthquakes",
        minzoom: 7,
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            ["interpolate", ["linear"], ["get", "mag"], 1, 1, 6, 4],
            16,
            ["interpolate", ["linear"], ["get", "mag"], 1, 5, 6, 50]
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            1,
            "rgba(33, 102, 172, 0)",
            2,
            "rgb(1-3, 169, 207)",
            3,
            "rgb(209, 229, 240)",
            4,
            "rgb(253, 219, 199)",
            5,
            "rgb(239, 138, 98)",
            6,
            "rgb(178, 24, 43)"
          ],
          "circle-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            0,
            8,
            1
          ]
        }
      }, "waterway-label");
    });
  }
}
