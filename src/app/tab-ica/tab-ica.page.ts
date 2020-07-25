import { HttpClient } from '@angular/common/http';
import { MapboxService } from './../shared/services/mapbox.service';
import { Component, AfterContentInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-tab-ica',
  templateUrl: './tab-ica.page.html',
  styleUrls: ['./tab-ica.page.scss'],
})
export class TabIcaPage implements AfterContentInit {
  map: mapboxgl.Map;
  searchTxt: string;
  searchList: string[];
  mArray: any[] = [];

  constructor(private mapbox: MapboxService, private http: HttpClient) {}

  ngAfterContentInit() {
    this.loadMap();
    this.loadData();
  }

  loadMap() {
    this.map = this.mapbox.loadMap(
      "map7",
      [103.8198, 1.3521],
      11
    );

    // Fixes size issue on load
    this.map.once("load", () => {
      this.map.resize();
    });
  }

  loadData() {
    /*
    * Donwload from https://data.gov.sg/dataset/libraries?resource_id=f6422e78-d829-4b36-b91a-0eed9cff3f7d
    * Modified the properties.name manually in the .geojson file,
    * as it's name value doesn't work/nonsensical in this use case.
    * .geometry.coordinates has an object length of 3, where mapbox coordinates uses an object length of 2,
    * but this shouldn't be an issue as the first 2 number of the object are still [lng, lat].
    */
    this.http.get('./../assets/data/libraries-geojson.geojson').subscribe(data => {
      const datas = data["features"];

      datas.forEach(item => {
        const marker = this.mapbox.createMarker(
          item.geometry.coordinates,
          this.map,
          {},
          this.reformatHtml(item.properties.Name, item.properties.Description),
          {anchor: "left"}
        );

        this.mArray.push({
          "coords": item.geometry.coordinates,
          "name": item.properties.Name,
          "marker": marker,
        });
      });
    });
  }

  populateSearch(e: any) {
    const val = e.target.value.trim();
    
    if (val) {
      // Populate searchList
      this.searchList = this.mArray.filter(item => {
          return (item["name"].toLowerCase().indexOf(val.toLowerCase()) > -1);
        }).map(item => {
          return item["name"];
        });

      /*
      * Empty out search list and flyTo map if it has only 1 matches, 
      * and it matches the searchbar value.
      */
      if (this.searchList && this.searchList.length == 1 && this.searchList[0] == val) {
        const idx = this.mArray.map(item => {
            return item["name"];
          }).indexOf(val);

        if (idx > -1) {
          this.map.flyTo({
            center: this.mArray[idx]["coords"],
            zoom: 13
          });
          
          // Open popup if is not opened.
          const marker = this.mArray[idx]["marker"];
          const popup = marker.getPopup();

          if (!popup.isOpen()) {
            marker.togglePopup();
          }
        }

        this.searchList = null;
      }
    }
    else {
      this.searchList = null;
    }
  }

  searchListClick(e: any) {
    this.searchTxt = `${e.target.innerHTML}`.trim();
  }

  changeMapStyle(e: any) {
    const val = e.target.value.trim();
    this.map.setStyle(`mapbox://styles/mapbox/${val}`);
  }

  reformatHtml(title:string,html: string) {
    let s: any = html.replace(/<[^>]+>/g, "");  // Remove HTML tags.
    s = s.substring(11, s.length).split("  ");  // Remove starting "Attributes" text and split
    

    for (let i = 0; i < s.length; i++) {
      const item = s[i].trim();

      // Remove array with only a "header" without any "value"
      if (item.indexOf(" ") < 0 && item == item.toUpperCase()) {
        s.splice(i, 1);
      }
    }
    
    // Format into desired HTML code
    let formatted: string = `<h5 style="text-align: center; font-weight: 700; text-decoration: underline; margin: 1.5rem 0;">
        ${title}
      </h5>`;

    s.forEach(i => {
      const item = i.trim();

      if (item) {
        let v = item.split(" ");
        
        const k = v.splice(0, 1)[0];
        v = v.join(" ");

        if (v.substring(0, 7) == "http://" || v.substring(0, 8) == "https://") {
          v = `<a href="${v}" target="_blank">${v}</a>`;
        }

        formatted += `<p style="margin: 1rem 0; text-align: center;">
            <span style="font-family: 2rem; font-weight: 700;">${k}</span>
            <br/>${v}
          </p>`;
      }
    });

    return formatted;
  }
}
