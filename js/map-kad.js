// Map with geojson data


// Tiles
var osm = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
});

var mbox = L.tileLayer('https://api.mapbox.com/styles/v1/univelopment/ciyvc75yl008h2rphu5kznnxd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidW5pdmVsb3BtZW50IiwiYSI6ImNpeXZjNjVwYzAwNGcyd3BuN3NheXFpcnUifQ.fYSQBkdKtiA96qk-t81c1A', {
  attribution: 'Tiles from &copy; <a href="http://mapbox.com">Mapbox</a>'
});

// Map object
var unimap = L.map('mapid', {
    center: [55.7658, 37.623603],
    zoom: 10,
    layers: [mbox]
});


// Define popup apperance
var popupAppearance = {
    className : 'popup-style'
};

// Define circle markers appearance

// Colour
function circleColor(variable_color_value, thrColOne, thrColTwo) {
  return variable_color_value > thrColOne  ? '#00441b' : // dark green
         variable_color_value >= thrColTwo ? '#238b45' :  // medium green
                                             '#74c476'; // light green
};

// '#253494' : // purple, 
// '#41b6c4' : // salad, 
// '#c51b8a' : // violet (pink)

// '#feb24c' : // light yellow
// '#fc4e2a' :  // orange
// '#b10026'; // dark red

// Size
function circleSize(variable_size, thrSizeOne, thrSizeTwo) {
    return variable_size > thrSizeOne  ? 11 :
           variable_size >= thrSizeTwo ? 8 :
                                         5;
};

// Define circle markers appearance
function circleAppCreator (variable_size, thrSizeOne, thrSizeTwo, variable_fill, thrColOne, thrColTwo) {
  return {
         fillColor: circleColor(variable_fill, thrColOne, thrColTwo),
         color: circleColor(variable_fill, thrColOne, thrColTwo),
         weight: 0.5,
         opacity: 1,
         fillOpacity: 0.35,
         radius: circleSize(variable_size, thrSizeOne, thrSizeTwo)
         }      
};


function pointToLayer(feature, latlng) {
  return L.circleMarker(latlng,
                              circleAppCreator(feature.properties.kad_area, 9000, 4000, 
                                               feature.properties.ege_state, 85, 65)
                              ).bindPopup(
                                '<h4>' + 
                                '<a title="Перейти на сайт мониторинга" target="_blank" rel="noopener noreferrer" href="' + 
                                feature.properties.me_link + '">' +
                                feature.properties.vuz_name + '</a>' + 
                                '</h4>' +
                                '<b>Адрес: </b>' + feature.properties.auto_add +
                                '<br>' +
                                '<b>Тип здания: </b>' + feature.properties.build_type +
                                '<br>' +
                                '<b>Кадастровая площадь здания: </b>' + feature.properties.kad_area_c + ' ' + 'м<span class="sup">2</span>' +
                                '<br>' +
                                '<b>Средний балл ЕГЭ: </b>' + feature.properties.ege_state, 
                                popupAppearance
                                )
};

// Data for selectors 
var uniID = [110145, 1651, 1810, 1723, 1654, 1668, 57, 58,
1729, 1639, 1798, 118, 111029, 1788, 1803, 1659, 1647, 159, 131, 132,
133, 2183, 2151, 110313, 143, 110314, 1758, 110315, 141, 1610, 144, 1739, 147,
148, 150, 151, 1725, 155, 1566, 158, 130, 160, 146, 1593, 134, 161, 59, 140,
162, 1766, 165, 1792, 1807, 1645, 1783, 1716, 1644, 1985, 1640, 212, 215, 219,
1781, 1787, 1595, 222, 1717, 223, 209, 1556, 1806, 1767, 1791];

var uniName = [
'Академия социального управления', 
'Академия хорового искусства имени В.С. Попова', 
'Всероссийская академия внешней торговли', 
'Всероссийский государственный университет кинематографии имени С.А.Герасимова', 
'Всероссийский государственный университет юстиции', 
'Высшее театральное училище им. М.С.Щепкина',
'Государственный академический университет гуманитарных наук',
'Государственный институт русского языка им. А.С. Пушкина',
'Государственный музыкально-педагогический институт имени М.М. Ипполитова-Иванова', 
'Государственный университет по землеустройству', 
'Дипломатическая академия Министерства иностранных дел Российской Федерации', 
'Литературный институт имени А.М. Горького', 
'Московская государственная академия акварели и изящных искусств Сергея Андрияки', 
'Московская государственная академия ветеринарной медицины и биотехнологии', 
'Московская государственная академия водного транспорта', 
'Московская государственная академия хореографии', 
'Московская государственная консерватория имени П.И. Чайковского', 
'Московская государственная художественно-промышленная академия им. С.Г. Строганова', 
'Московский авиационный институт (национальный исследовательский университет)', 
'Московский автомобильно-дорожный государственный технический университет', 
'Московский архитектурный институт', 
'Московский городской педагогический университет', 
'Московский городской психолого-педагогический университет', 
'Московский городской университет управления Правительства Москвы', 
'Московский государственный гуманитарно-экономический институт', 
'Московский государственный институт индустрии туризма имени Ю.А. Сенкевича',
'Московский государственный институт международных отношений',
'Московский государственный институт музыки имени А.Г. Шнитке',
'Московский государственный лингвистический университет', 
'Московский государственный медико-стоматологический университет имени А.И. Евдокимова', 
'Московский государственный строительный университет', 
'Московский государственный технический университет гражданской авиации', 
'Московский государственный технический университет имени Н.Э. Баумана', 
'Московский государственный технологический университет "СТАНКИН"',
'Московский государственный университет геодезии и картографии', 
'Московский государственный университет дизайна и технологии', 
'Московский государственный университет имени М.В.Ломоносова', 
'Московский государственный университет пищевых производств', 
'Московский государственный университет путей сообщения', 
'Московский государственный университет технологий и управления', 
'Московский государственный юридический университет имени О.Е. Кутафина', 
'Московский педагогический государственный университет', 
'Московский политехнический университет', 
'Московский технический университет связи и информатики', 
'Московский технологический университет', 
'Московский физико-технический институт',
'Национальный исследовательский технологический университет "МИСиС"', 
'Национальный исследовательский университет "МИЭТ"',
'Национальный исследовательский университет "МЭИ"', 
'Национальный исследовательский университет «Высшая школа экономики»', 
'Национальный исследовательский ядерный университет "МИФИ"', 
'Первый Московский государственный медицинский университет имени И.М. Сеченова',
'Российская академия живописи, ваяния и зодчества Ильи Глазунова',
'Российская академия музыки имени Гнесиных', 
'Российская академия народного хозяйства и государственной службы', 
'Российская государственная академия интеллектуальной собственности',
'Российская государственная специализированная академия искусств', 
'Российская школа частного права', 
'Российский государственный аграрный университет - МСХА имени К.А. Тимирязева',
'Российский государственный гуманитарный университет', 
'Российский государственный социальный университет', 
'Российский государственный университет нефти и газа имени И. М. Губкина', 
'Российский государственный университет правосудия', 
'Российский государственный университет физической культуры, спорта, молодежи и туризма',
'Российский национальный исследовательский медицинский университет имени Н.И. Пирогова', 
'Российский университет дружбы народов', 
'Российский университет театрального искусства – ГИТИС', 
'Российский химико-технологический университет имени Д.И. Менделеева',
'Российский экономический университет имени Г.В. Плеханова', 
'Театральный институт имени Бориса Щукина',
'Московский государственный академический художественный институт имени В.И. Сурикова', 
'Финансовый университет', 
'Школа-студия имени Вл. И. Немировича-Данченко'
];


// Populate university selector
var selector = document.getElementById('uni-type');

for (i = 0; i < uniID.length; i++) {
  selector.innerHTML += ('<option value=' + uniID[i] + '>' + uniName[i] + '</option')
};


// GeoJSON layer via Jquery
$.getJSON("data/24_07_kad_ar.geojson", function(data) {
  
  // Object that stores layers. Each university has its own layer
  var layerContainer = {};
  
  // Populate the object
  for (i = 0; i < uniID.length; i++) {
    layerContainer[uniID[i]] = L.geoJson(data, {
        filter: function(feature, layer) {
          return feature.properties.id_me === uniID[i]
        },
        pointToLayer: pointToLayer
      }).addTo(unimap);
  }
  
  // Selecting universities
  selector.onchange = function() {
    // To display everything
    if (selector.value === "all") {

      for (i = 0; i < 74; i++) {
        layerContainer[Object.keys(layerContainer)[i]].addTo(unimap)
      };
    
    // For selective display
    } else {

        for (i = 0; i < 74; i++) {
          if (selector.value != Object.keys(layerContainer)[i]) {
            layerContainer[Object.keys(layerContainer)[i]].removeFrom(unimap)
          } else {
            layerContainer[Object.keys(layerContainer)[i]].addTo(unimap)
          };
        };

    };
  };
}); 


// Add Layer control
var baseLayer = {
   "OpenStreetMap": osm,
   "Mapbox: градации серого": mbox
};


L.control.layers(baseLayer, null).addTo(unimap);

// Legend
var legend = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  onAdd: function (map) {
      // Define element and its text content
      var div = L.DomUtil.create('div', 'legend'),
          kad_ar_labels = ['&#60;4000', '[4000;9000]', '&#62;9000'],
          ege_s_labels = ['&#60;65', '[65;85]', '&#62;85'];
          div.innerHTML = 

                        '<h5 class="leg-header text-center">' + 'Кадастровая площадь здания,' + ' м<span class="sup">2</span>'+ '</h5>' +

                        '<div class="flex-container-outer">' +

                          '<div class="color-guide flex-container">' +
                            '<div class="leg-circle" style="border-radius: 5px; width: 10px; height: 10px;">' + '</div>' +
                          '</div>' +

                          '<div class="text-guide flex-container">' +
                            '<div class="leg-text">' + kad_ar_labels[0] + '</div>' +
                          '</div>' +

                          '<div class="color-guide flex-container">' +
                            '<div class="leg-circle" style="border-radius: 8px; width: 16px; height: 16px;">' + '</div>' +
                          '</div>' + 

                          '<div class="text-guide flex-container">' +
                            '<div class="leg-text">' + kad_ar_labels[1] + '</div>' +
                          '</div>' +

                          '<div class="color-guide flex-container">' + 
                            '<div class="leg-circle" style="border-radius: 11px; width: 22px; height: 22px;">' + '</div>' +
                          '</div>' +

                          '<div class="text-guide flex-container">' +
                            '<div class="leg-text">' + kad_ar_labels[2] + '</div>' +
                          '</div>' +

                        '</div>' +

                        '<h5 class="leg-header text-center">' + 'Средний балл ЕГЭ' + '</h5>' +

                        '<div class="flex-container-outer">' +

                            '<div class="color-guide flex-container">' +
                              '<div class="leg-box" style="background-color: #74c476;">' + '</div>' +
                            '</div>' +

                            '<div class="text-guide flex-container">' +
                              '<div class="leg-text">' + ege_s_labels[0] + '</div>' +
                            '</div>' + 

                             '<div class="color-guide flex-container">' +
                              '<div class="leg-box" style="background-color: #238b45;">' + '</div>' +
                            '</div>' +

                            '<div class="text-guide flex-container">' +
                              '<div class="leg-text">' + ege_s_labels[1] + '</div>' +
                            '</div>' + 

                            '<div class="color-guide flex-container">' +
                              '<div class="leg-box" style="background-color: #00441b;">' + '</div>' +
                            '</div>' +

                            '<div class="text-guide flex-container">' +
                              '<div class="leg-text">' + ege_s_labels[2] + '</div>' +
                            '</div>' + 

                          '</div>'
      return div;
  } 
});

var legInstance = new legend();

// Adding new control for mobile device

// Define variable that stores state of the device size
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
              unimap.addControl(legInstance);
              buttonClicked = true;
            } else {
              unimap.removeControl(legInstance);
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
  unimap.addControl(legButtonInstance);
  unimap.setZoom(12);
} else {
  unimap.addControl(legInstance);
};