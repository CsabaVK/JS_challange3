mapboxgl.accessToken = 'pk.eyJ1IjoiY3NhYmF2ayIsImEiOiJja3B2cTZlMXkxNXlkMm9ubzB4MnhxcDk3In0.3M9wkYBEsiTQnQaP5TpeNw';

//WORKING---------------------------------------------------------------------------------------
//rand long lat
var randomLong = Math.round((Math.random() * 360 - 180) * 1000) / 1000;
var randomLat = Math.round((Math.random() * 160 - 90) * 1000) / 1000;


//WORKING---------------------------------------------------------------------------------------
//check if water or land --!regenerate
//onwater.io //token: Nz9XmvuxxP4RikZvjVpF
let onwater = {}
let xhr2 = new XMLHttpRequest()
xhr2.open('GET', `https://api.onwater.io/api/v1/results/${randomLat},${randomLong}?access_token=Nz9XmvuxxP4RikZvjVpF`)
xhr2.responseType = 'text'

var waterorland;
xhr2.addEventListener('load', function () {
  if (xhr2.status === 200) {
    //console.log("wateronio success")
    onwater = JSON.parse(xhr2.responseText)
    waterorland = onwater.water
    console.log(waterorland)
    if (waterorland == true) {
      //console.log("inside if runs")
      displaywol();
    }
    //console.log(waterorland)
  } else {
    console.log(xhr.status)
    console.log("no success")
  }
}, false)
xhr2.send()

//WORKING---------------------------------------------------------------------------------------
//new location
function newlocation() {
  waterorland = true;
  displaywol();
}

var decider;
//WORKING---------------------------------------------------------------------------------------
//regenerate if positon is water
async function displaywol() {
  console.log(waterorland)
  decider = false;

  while (decider != true) {
    if (waterorland == true) {
      randomLong = Math.round((Math.random() * 360 - 180) * 1000) / 1000;
      randomLat = Math.round((Math.random() * 160 - 60) * 1000) / 1000;

      let response = await fetch(`https://api.onwater.io/api/v1/results/${randomLat},${randomLong}?access_token=Nz9XmvuxxP4RikZvjVpF`);
      let data = await response.json()
      console.log(response.status)
      plocation.textContent = "Loading... (" + response.status + ")"
      //console.log(data.water)
      if (data.water == false) {
        waterorland = false
        openweatherrun();
        mapload();
        distance();
        airmap();
      }
      //document.querySelector("#td").innerHTML = `${inusa}`
    } else if (waterorland == false) {
      break;
    } else if (waterorland = "undefined") {
      console.log(waterorland)
      break;
    } else {
      console.log(waterorland)
      break;
    }
  }
}


//WORKING---------------------------------------------------------------------------------------
//mapbox
function mapload() {
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/csabavk/ckpvx3te02n6e17pe02u1fv6i',
    center: [randomLong, randomLat],
    zoom: 3
  });
  //searchbar on mapbox
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }),
    'bottom-left'
  );
}
mapload();


//WORKING---------------------------------------------------------------------------------------
//openweather
const plocation = document.querySelector('#location span')
const pweather = document.querySelector('#weather span')
const ptemperature = document.querySelector('#temperature span')
const pwind = document.querySelector('#wind span')
const plocaltime = document.querySelector('#localtime span')

function openweatherrun() {
  let openWeatherData = {}
  let xhr = new XMLHttpRequest()
  xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${randomLat}&lon=${randomLong}&appid=${owk}`)
  xhr.responseType = 'text'

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      plocation.textContent = "Loading..."
      openWeatherData = JSON.parse(xhr.responseText)
      populateWeatherInfo()
    } else {
      plocation.textContent = "error"
      //p.textContent = "error" + xhr.status
    }
  }, false)

  xhr.send()
  //pull name,,temp,,wind,,time
  function populateWeatherInfo() {
    const location = openWeatherData.name
    const tempk = openWeatherData.main.temp
    //(tempf - 32) * 5/9  //F to C
    const tempc = Math.round(tempk - 273.15)
    const wind = Math.round(openWeatherData.wind.speed)
    const country = openWeatherData.sys.country
    const weather = openWeatherData.weather[0].description

    const time = new Date((openWeatherData.dt + openWeatherData.timezone) * 1000)
    var hrs = time.getHours()
    if (hrs < 10) {
      hrs = '0' + hrs
    }
    var minutes = time.getMinutes()
    if (minutes < 10) {
      minutes = '0' + minutes
    }

    const strloc = `${location}, ${country}`
    const strwet = `${weather}`
    const strtemp = `${tempc} C`
    const strwind = `${wind} mph`
    const strlt = `${hrs}:${minutes}`
    plocation.textContent = strloc
    pweather.textContent = strwet
    ptemperature.textContent = strtemp
    pwind.textContent = strwind
    plocaltime.textContent = strlt
  }
}
openweatherrun();

//TODO---------------------------------------------------------------------------------------
//Landing site picture

// const nasap = document.querySelector('#nasapic span')
// let nasapic = {}
// let xhr3 = new XMLHttpRequest()
// xhr3.open('GET', `https://api.nasa.gov/planetary/earth/imagery?lon=${randomLong}&lat=${randomLat}&api_key=18E77fmBP8xCUkudwtUE3ppQdU44sZMSsCRf0Xl4`)
// xhr.responseType = 'image'

// xhr.addEventListener('load', function(){
//   if (xhr.status === 200) {
//     nasap.textContent = "Loading..."
//     nasapic = JSON.parse(xhr.responseText)
//   }
//   else {
//     plocation.textContent = "error"
//     //p.textContent = "error" + xhr.status
//   }
// }, false)
// xhr.send()

// var img = new Image();   // Create new img element
// img.addEventListener('load', function() {
//   // execute drawImage statements here
// }, false);
// img.src = 'https://api.nasa.gov/planetary/earth/imagery?lon=${randomLong}&lat=${randomLat}&api_key=18E77fmBP8xCUkudwtUE3ppQdU44sZMSsCRf0Xl4'; // Set source path
// document.getElementById('nasapic').src = img 

async function nasaearthRequest() {
  let response = await fetch(`https://api.nasa.gov/planetary/earth/imagery?lon=${randomLong}&lat=${randomLat}&api_key=18E77fmBP8xCUkudwtUE3ppQdU44sZMSsCRf0Xl4`);
  console.log(response);
  let data = await response.json()
  console.log(data)
  document.querySelector("#nasaearth").innerHTML += `<img src="${data.url}">`
  document.querySelector("#nasaearth span").innerHTML = ""
}
//nasaearthRequest();


//WORKING---------------------------------------------------------------------------------------
//picture of the day
async function nasapotd() {
  let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=18E77fmBP8xCUkudwtUE3ppQdU44sZMSsCRf0Xl4`);
  //console.log(response);
  let data = await response.json()
  //console.log(data)
  document.querySelector("#nasaearth").innerHTML = ""
  document.querySelector("#nasaearth").innerHTML += `<img src="${data.url}" style="width: 44vw; height: 22vw;" class="rounded">`
}
nasapotd()



//WORKING---------------------------------------------------------------------------------------
//Asteroid data
async function nasaasteroids() {
  let response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=18E77fmBP8xCUkudwtUE3ppQdU44sZMSsCRf0Xl4`);
  let data = await response.json()
  var asteroid = data.name;
  var noasteroid;
  if (asteroid = "") {
    noasteroid = "None"
  } else {
    noasteroid = "Yes"
  }
  document.querySelector("#asteroid").innerHTML = `${noasteroid}`
  document.querySelector("#astname").innerHTML = `${data.name}`
  document.querySelector("#astdang").innerHTML = `${data.is_potentially_hazardous_asteroid}`
}
nasaasteroids()


//WORKING---------------------------------------------------------------------------------------
//Elevation //Airmap
async function airmap() {
  let response = await fetch(`https://api.airmap.com/elevation/v1/ele/?points=${randomLat},${randomLong}`);
  let data = await response.json()
  //console.log("line 242")
  console.log(data)
  var elevation = data.data[0];
  //console.log(data.data[0] + "--no");
  if (elevation == null) {
    elevation = "Unknown"
    console.log("this runns")
    document.querySelector("#elevation").innerHTML = ""
  }
  document.querySelector("#elevation").innerHTML = `${data.data[0]} M`
}
airmap()


//TODO // HALF-WORKING  ---------------------------------------------------------------------------------------
// distance calculation
//Kennedy Space Center, Cape Canaveral, Florida
var fllong = -80.6489808; //fl = Florida
var fllat = 28.5728722;

async function distance() {
  let response = await fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${fllat},${fllong}&destinations=${randomLat},${randomLong}
&key=D9jGnYskyQ6TqTC0xFZU4CBvkJijt`);
  let data = await response.json()
  console.log(data.rows[0].elements[0].distance.text)
  var inusa = data.rows[0].elements[0].distance.text
  if (inusa === "0 m") {
    inusa = "Out of USA"
  }
  document.querySelector("#td").innerHTML = `${inusa}`
}
distance()

// var rad = function(x) {
//   return x * Math.PI / 180;
// };

// var getDistance = function(p1, p2) {
//   var R = 6378137; // Earth’s mean radius in meter
//   var dLat = rad(p2.lat() - p1.lat());
//   var dLong = rad(p2.lng() - p1.lng());
//   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
//     Math.sin(dLong / 2) * Math.sin(dLong / 2);
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   var d = R * c;
//   return d; // returns the distance in meter
// };
// console.log();