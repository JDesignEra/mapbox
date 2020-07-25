/* 
* Implemented services/mapbox.service,
* too lazy to retyped reused function with apikey.
*/

import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  constructor() { }

  loadMap(
    container: string,
    center: [number, number],
    zoom: number = 12,
    style: string = 'mapbox://styles/mapbox/streets-v11?optimize=true',
  ) {
    (mapboxgl as any).accessToken = environment.mapboxKey;
    
    return new mapboxgl.Map({
      container: container,
      center: center,
      zoom: zoom,
      style: style
    });
  }

  createMarker(
    coords: [number, number],
    addTo: mapboxgl.Map,
    markerOpts?: {},
    popupHtml?: string,
    popupOpts?: {}
  ) {
    return new mapboxgl
      .Marker(markerOpts ? markerOpts : {})
      .setLngLat(coords)
      .setPopup(popupHtml ? new mapboxgl.Popup(popupOpts ? popupOpts : {}).setHTML(popupHtml) : null)
      .addTo(addTo);
  }
}
