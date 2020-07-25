# NPM Installed
```cmd
npm i mapbox-gl --save
npm i @mapbox/mapbox-gl-geocoder --save
npm i @mapbox/mapbox-gl-directions --save
```

# NOTES
ICA working files are mostly in `src/app/tab-ica`, and ICA page when served is in the ICA tab page (`localhost:8100/tabs/ICA`). Local .geojson file for part of the ICA requirements is located in `src/assets/data/libraries-geojson.geojson`.

### mapbox.service
Added `shared/services/mapbox.service` as I was too lazy to retype both the codes for create a new Mapbox map with api key, and the code to create a new Mapbox marker. Therefore, I decided to create a function for it just to type lesser characters.

### SCSS / CSS
All CSS code are in `global.scss` instead of their individual .scss file. I had to override some the mapbox css style due to the css conflicts for both geocder and directions css, especially the inputs for both the geocoder and directions css style overlaps one another which causes some UI bug.

##### Github Profile
[Joel [ JDesignEra ]](https://github.com/JDesignEra)