// **** PSUEDO-CODE ***
// INDENTIFY MAJOR COMPONENTS - SEARCH HISTORY FORM, MAIN CARD, 5-DAY FORECAST
// -------SEARCH HISTORY FORM------
// WHEN THE USER SEARCHERS FOR A CITY BY CLICKING THE SEARCH BUTTON OR PRESSING ENTER
// PREVENT EVENT DEFAULT
// GET CITY INPUT AND ASSIGN IT TO A VARIABLE
//
// PREPEND EACH SEARCH
// -------MAIN CARD-------
// WHEN THE USER SEARCHERS FOR A CITY BY CLICKING THE SEARCH BUTTON OR PRESSING ENTER
// LOAD MAIN CARD--- LOAD CITY NAME, DATE, WEATHER ICON, LOAD TEMP, HUM, WINDSPEED, AND UV INDEX FROM API
// ------5-DAY FORECAST-----
// WHEN THE USER SEARCHERS FOR A CITY BY CLICKING THE SEARCH BUTTON OR PRESSING ENTER
// lOAD 5-DAY CARDS--- DYNAMICALLY LOAD DATE AND WEATHER ICONS --- RETREIVE TEMP AND HUMIDITY FROM API AND DISPLAY

// create on submit for form
$("#searchBtn").on("click", function () {
  event.preventDefault();
  var userCity = $("#city-search").val().trim();

  $(".card-header").text(userCity);

  // call function to display main card
  displayMain(userCity);

  //call function to display day 1 of 5 day forecast
  displayDay1(userCity);

  //call function to display day 2 of 5 day forecast
  displayDay2(userCity);

  // //call function to display day 3 of 5 day forecast
  displayDay3(userCity);

  // //call function to display day 4 of 5 day forecast
  displayDay4(userCity);

  // //call function to display day 5 of 5 day forecast
  displayDay5(userCity);

  // call search history function
  searchHistory();
});

function displayMain(userCity) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userCity +
    "&appid=ef720fca1b9f6063f3226146f04c9dfc";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var temp = parseFloat(response.main.temp);
    var humidity = parseInt(response.main.humidity);
    var windSpeed = parseFloat(response.wind.speed);
    var lat = parseFloat(response.coord.lat);
    var lon = parseFloat(response.coord.lon);
    var iconcode = response.weather[0].icon;

    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
    // ajax function to get UV index
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/uvi?appid=ef720fca1b9f6063f3226146f04c9dfc&lat=" +
        lat +
        "&lon=" +
        lon,
      method: "GET",
    }).then(function (response) {
      var uvIndex = response.value;
      $("#display-uv").text("UV Index: " + uvIndex);
    });

    // calculate temperature
    var fTemp = Math.floor(temp - 273.15) * 1.8 + 32;

    // display elements
    $("#display-temp").text("Temperature: " + fTemp);
    $("#display-hum").text("Humidity: " + humidity);
    $("#display-wind").text("Wind Speed: " + windSpeed);
    var image = $("<img>").attr("src", iconurl);
    $(".card-header").append(image);
  });
}

function searchHistory() {
  var searchHistoryArr = [];
  searchHistoryArr.push($("#city-search").val().trim());
  $("#city-search").val("");

  $.each(searchHistoryArr, function (index, value) {
    $("#search-history")
      .append("<li (" + index + ")'>" + value + "</li>")
      .addClass("search-history-item");
  });

  //   for(var i=0; i<searchHistoryArr.length;i++) {
  //       localStorage.setItem("city", JSON.stringify(split("")))
  //   }
}

// function to display day 1 forecast
function displayDay1(userCity) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userCity +
      "&units=imperial&appid=ef720fca1b9f6063f3226146f04c9dfc&lat",
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var temp = response.list[0].main.temp;
    var humidity = response.list[0].main.humidity;
    var iconcode = response.list[0].weather[0].icon;
    var date = response.list[0].dt_txt;

    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

    date = moment(date).format("MM/DD/YYYY");

    $(".card-title1").append(date);
    var image = $("<img>").attr("src", iconurl);
    $("#weather-icon1").append(image);
    $("#temp1").text("Temperature: " + temp);
    $("#humidity1").text("Humidity " + humidity);
  });
}

// function to display day 2
function displayDay2(userCity) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userCity +
      "&units=imperial&appid=ef720fca1b9f6063f3226146f04c9dfc&lat",
    method: "GET",
  }).then(function (response) {
    var temp = response.list[7].main.temp;
    var humidity = response.list[7].main.humidity;
    var iconcode = response.list[7].weather[0].icon;
    var date = response.list[7].dt_txt;

    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

    date = moment(date).format("MM/DD/YYYY");

    $(".card-title2").append(date);
    var image = $("<img>").attr("src", iconurl);
    $("#weather-icon2").append(image);
    $("#temp2").text("Temperature: " + temp);
    $("#humidity2").text("Humidity " + humidity);
  });
}

// function to display day 3
function displayDay3(userCity) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userCity +
      "&units=imperial&appid=ef720fca1b9f6063f3226146f04c9dfc&lat",
    method: "GET",
  }).then(function (response) {
    var temp = response.list[15].main.temp;
    var humidity = response.list[15].main.humidity;
    var iconcode = response.list[15].weather[0].icon;
    var date = response.list[15].dt_txt;

    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

    date = moment(date).format("MM/DD/YYYY");

    $(".card-title3").append(date);
    var image = $("<img>").attr("src", iconurl);
    $("#weather-icon3").append(image);
    $("#temp3").text("Temperature: " + temp);
    $("#humidity3").text("Humidity " + humidity);
  });
}

// function to display day 4
function displayDay4(userCity) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userCity +
      "&units=imperial&appid=ef720fca1b9f6063f3226146f04c9dfc&lat",
    method: "GET",
  }).then(function (response) {
    var temp = response.list[23].main.temp;
    var humidity = response.list[23].main.humidity;
    var iconcode = response.list[23].weather[0].icon;
    var date = response.list[23].dt_txt;

    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

    date = moment(date).format("MM/DD/YYYY");

    $(".card-title4").append(date);
    var image = $("<img>").attr("src", iconurl);
    $("#weather-icon4").append(image);
    $("#temp4").text("Temperature: " + temp);
    $("#humidity4").text("Humidity " + humidity);
  });
}

//function display day 5
function displayDay5(userCity) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userCity +
      "&units=imperial&appid=ef720fca1b9f6063f3226146f04c9dfc&lat",
    method: "GET",
  }).then(function (response) {
    var temp = response.list[31].main.temp;
    var humidity = response.list[31].main.humidity;
    var iconcode = response.list[31].weather[0].icon;
    var date = response.list[31].dt_txt;

    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

    date = moment(date).format("MM/DD/YYYY");

    $(".card-title5").append(date);
    var image = $("<img>").attr("src", iconurl);
    $("#weather-icon5").append(image);
    $("#temp5").text("Temperature: " + temp);
    $("#humidity5").text("Humidity " + humidity);
  });
}
