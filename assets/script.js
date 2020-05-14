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

  //call function to display 5-day forecast
  displayForecast(userCity);

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

// function to display 5 day forecast
function displayForecast(userCity) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userCity +
      "&units=imperial&appid=ef720fca1b9f6063f3226146f04c9dfc&lat",
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var results = response.list;

    // for loop to display 5 day forecast?
  });
}
