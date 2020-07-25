import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabRoutes: {[key: string]: string} = {};

  // Too lazy to retype html for per tab, instead using logic to populate tabs
  constructor(private router: Router) {
    this.router.config[0]["_loadedConfig"]["routes"][0]["children"].map(item => {
      var label = item["path"].toLowerCase().split("_");

      for (let i = 0; i < label.length; i++) {
        label[i] = label[i].charAt(0).toUpperCase() + label[i].substring(1);
      }

      label = label.join(" ");

      this.tabRoutes[item["path"]] = label;
    });
  }
}
