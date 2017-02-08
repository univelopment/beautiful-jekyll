// Map with geojson data


// Tiles
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var mbox = L.tileLayer('https://api.mapbox.com/styles/v1/univelopment/ciyvc8e52008i2rqm2nl6o4p8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidW5pdmVsb3BtZW50IiwiYSI6ImNpeXZjNjVwYzAwNGcyd3BuN3NheXFpcnUifQ.fYSQBkdKtiA96qk-t81c1A', {
  attribution:'&copy; <a href="http://mapbox.com">Mapbox</a>'
});



// Map object
var townmap = L.map('mapid', {
    center: [61.698653, 99.505405],
    zoom: 3,
    layers: [mbox]
});


// Define popup apperance
var popupAppearance = {
    className : 'popup-style'
};

// Define circle markers appearance

// Colour
function circleColor(variable_color, valueCol) {
    return variable_color === valueCol ? '#054950' :
                                         '#B95835';
};

// Other possible palettes
//  #BA5EF7

// Size
function circleSize(variable_size, thrSizeOne, thrSizeTwo) {
    return variable_size > thrSizeOne  ? 10 :
           variable_size >= thrSizeTwo ? 7 :
                                         5;
};

// Define circle markers appearance
function circleAppCreator(variable_fill, thrCol, variable_size, thrSizeOne, thrSizeTwo) {
    return {
           fillColor: circleColor(variable_fill, thrCol),
           color: circleColor(variable_fill, thrCol),
           weight: 0.5,
           opacity: 1,
           fillOpacity: 0.25,
           radius: circleSize(variable_size, thrSizeOne, thrSizeTwo)
           }
};



function pointToLayer(feature, latlng) {
  return L.circleMarker(latlng,
                              circleAppCreator(feature.properties.ind, 'yes',
                                feature.properties.pop_begin_2016, 45000, 15000)
                              ).bindPopup(
                                '<h4>' + feature.properties.place + '</h4>' +
                                '<b>Население: </b>' + feature.properties.pop_nice +
                                '<br>' +
                                '<b>Количество университетов: </b>' + feature.properties.count +
                                '<br>' +
                                '<b>Общее число студентов: </b>' + feature.properties.tot_stud_nice +
                                '<br>' +
                                '<b>Доля заочных среди них: </b>' + feature.properties.ext_frac +
                                '<br>' +
                                '<b>Университеты: </b>' + feature.properties.name, 
                                popupAppearance
                                )
};



// GeoJSON layer via jQuery
$.getJSON("data/m2_geo.geojson", function(data) {
      
      // Layers WITH universities
      var uni_state_main = L.geoJson(data, {
        filter: function(feature, layer) {
          return feature.properties.state_main_count_ind === "yes"; 
        },
        pointToLayer: pointToLayer
      }).addTo(townmap);


      var uni_state_subs = L.geoJson(data, {
        filter: function(feature, layer) {
          return feature.properties.state_sub_count_ind === "yes"; 
        },
        pointToLayer: pointToLayer
      }).addTo(townmap);

      var uni_priv_main = L.geoJson(data, {
        filter: function(feature, layer) {
          return feature.properties.priv_main_count_ind === "yes"; 
        },
        pointToLayer: pointToLayer
      }).addTo(townmap);

      var uni_priv_subs = L.geoJson(data, {
        filter: function(feature, layer) {
          return feature.properties.priv_sub_count_ind === "yes";
        },
        pointToLayer: pointToLayer
      }).addTo(townmap);

      // Layer WITHOUT universities
      var wuni = L.geoJson(data, {
        filter: function(feature, layer) {
          return feature.properties.ind == "no";
        },
        pointToLayer: pointToLayer
      }).addTo(townmap);

      // Add Layer control
      var baseLayer = {
         "OpenStreetMap": osm,
         "Mapbox: градации серого": mbox
      };
      
      // Add overlay
      var overlay = {
        "Головной государственный вуз": uni_state_main,
        "Филиал государственного вуза": uni_state_subs,
        "Головной частный вуза": uni_priv_main,
        "Филиал частного вуза": uni_priv_subs,
        "Нет вуза": wuni
      };

      L.control.layers(baseLayer, overlay).addTo(townmap);  
});


// Manage filter control button
window.addEventListener('load', function () {
    // Add button title
    var filterButton = document.getElementsByClassName('leaflet-control-layers-toggle');
    filterButton[0].innerHTML += 'Фильтры';
    filterButton[0].setAttribute("id", "filter-button");
    
    // Add button description
    var filterDesc = document.getElementsByClassName('leaflet-control-layers-list');

    // Layer switch
    var layerDescr = document.createElement("div");       
    var layerText = document.createTextNode("Выберите подложку:");  
    layerDescr.appendChild(layerText);   
    layerDescr.setAttribute("class", "filter-header"); // To manipulate styles of headers
    filterDesc[0].insertBefore(layerDescr, filterDesc[0].childNodes[0]);

    // Data switch
    var dataDescr = document.createElement("div");       
    var dataText = document.createTextNode("Выбрать города, где есть хотя бы один:");  
    dataDescr.appendChild(dataText);     
    dataDescr.setAttribute("class", "filter-header"); // To manipulate styles of headers
    filterDesc[0].insertBefore(dataDescr, filterDesc[0].childNodes[3]);
});


// Legend
var legend = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  onAdd: function (map) {
      // Define element and its text content
      var div = L.DomUtil.create('div', 'legend');
          div.innerHTML = 
                        '<h5 class="leg-header text-center">' + 'Население' + '</h5>' +

                        '<div class="flex-container-outer">' +

                          '<div class="color-guide flex-container">' +
                            '<div class="leg-circle" style="border-radius: 5px; width: 10px; height: 10px;">' + '</div>' +
                          '</div>' +

                          '<div class="text-guide flex-container">' +
                            '<div class="leg-text">' + '&#60;15000' + '</div>' +
                          '</div>' +

                          '<div class="color-guide flex-container">' +
                            '<div class="leg-circle" style="border-radius: 7px; width: 14px; height: 14px;">' + '</div>' +
                          '</div>' + 

                          '<div class="text-guide flex-container">' +
                            '<div class="leg-text">' + '[15000; 45000]' + '</div>' +
                          '</div>' +

                          '<div class="color-guide flex-container">' + 
                            '<div class="leg-circle" style="border-radius: 10px; width: 20px; height: 20px;">' + '</div>' +
                          '</div>' +

                          '<div class="text-guide flex-container">' +
                            '<div class="leg-text">' + '&#62;45000' + '</div>' +
                          '</div>' +

                        '</div>' +

                        '<h5 class="leg-header text-center">' + 'Есть ли в городе университет?' + '</h5>' +

                        '<div class="flex-container-outer">' +

                            '<div class="color-guide flex-container">' +
                              '<div class="leg-box" style="background-color: #054950;">' + '</div>' +
                            '</div>' +

                            '<div class="text-guide flex-container">' +
                              '<div class="leg-text">' + 'Да' + '</div>' +
                            '</div>' + 

                             '<div class="color-guide flex-container">' +
                              '<div class="leg-box" style="background-color: #B95835;">' + '</div>' +
                            '</div>' +

                            '<div class="text-guide flex-container">' +
                              '<div class="leg-text">' + 'Нет' + '</div>' +
                            '</div>'

                        '</div>'
      return div;
  } 
});

// Initialise it
var legInstance = new legend();

// Adding new control for mobile device

// Define variable that stores state of the button (clicked or not)
var buttonClicked = false;

var legendButton = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  onAdd: function (map) {
      // Define element and its text content
      var div = L.DomUtil.create('div', 'legBt');
          div.innerHTML = '<span>Легенда</span>'
          div.onclick = function() {
            if (buttonClicked === false) {
              townmap.addControl(legInstance);
              buttonClicked = true;
            } else {
              townmap.removeControl(legInstance);
              buttonClicked = false;
            }
            
          }
      return div;
  }
});

// Initialise legend button
var legButtonInstance = new legendButton();

// Define legend display based on screen size
var width = window.innerWidth;

if (width < 550) {
  townmap.addControl(legButtonInstance);
  townmap.setZoom(2);
} else {
  townmap.addControl(legInstance);
};

