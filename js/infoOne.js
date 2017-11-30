
function eraseData() {
    //$("#stockSPCB").html("");
    //$("#stockSPCBpt").html("");    
    //$("#currentTemp").html("");
    //$("#todaymax").html("");
    //$("#todaylow").html("");
    //$("#todayadd").html("");
    //$(".weatherImg").css("display","none");
    $("#ethRatept").html("");
    $("#ethRatept").html("");
    $("#ethRate").html("");
    $("#dateAndTime").html("");
    
    
}
//get SPCB

function getSPCB() {
/*
        $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPCB&interval=1min&apikey=3R7YTQM4HMSMH96V", function( data ) {
            var items = [];
            $.each( data["Time Series (1min)"], function( key, val ) {
            //alert(key + val["1. open"]);
                items.push(val["2. high"]);
            });       
   
            $("#stockSPCB").append("$" + items[0]);
        });
*/
      $.getJSON("https://api.iextrading.com/1.0/stock/spcb/price", function( data ) {

          if( $("#stockSPCB").val() != "$" + data.toFixed(2) ) {
              
              $("#stockSPCB").html("");
              $("#stockSPCB").append("$" + data.toFixed(2));
          }

    });  

    $.getJSON("https://api.iextrading.com/1.0/stock/spcb/quote?displayPercent=true", function( data ) {
        var fixedprcnt = data.changePercent;
        
        if($("#stockSPCBpt").val() != fixedprcnt.toFixed(2) + "%)") {  
            $("#stockSPCBpt").html("");    
            $("#stockSPCBpt").append(" (" + fixedprcnt.toFixed(2) + "%)");
        }
        
        if(data.changePercent < 0) {
            $("#stockSPCB").css("color","red");
            $("#stockSPCBpt").css("color","red");
            
        }
        
        else if(data.changePercent > 0) {
            $("#stockSPCB").css("color","green");
            $("#stockSPCBpt").css("color","green");
        }        
    });
    

    
       
    
}
          
//get weather
function getWeather() {
    /*
        $.getJSON("https://query.yahooapis.com/v1/public/yql?format=json&q=select+title%2C+units.temperature%2C+item.forecast%0Afrom+weather.forecast%0Awhere+woeid+in+%28select+woeid+from+geo.places+where+text%3D%22nyc%2Cny%22%29%0Aand+u+%3D+%27C%27%0Alimit+5%0A%7C%0Asort%28field%3D%22item.forecast.date%22%2C+descending%3D%22false%22%29%0A%3B", function( data ) {
      */
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?id=5128594&units=metric&appid=1fa14489c8702f6fbf81828eb1635055", function( data ) {
        
        var currentTemp = Math.round(data.main.temp);
        var maxTemp = data.main.temp_max;
        var lowTemp = data.main.temp_min;
        var description = data.weather[0].description;
        var icon = data.weather[0].icon;
        
            if( $("#currentTemp").text() != "Now: " + currentTemp + "°") {                
                $("#currentTemp").html("");
                $("#currentTemp").append("Now: " + currentTemp + "°");
                
            }

            if( $("#todaymax").text() != "Max: " + maxTemp + "°") {
                $("#todaymax").html("");
                $("#todaymax").append("Max: " + maxTemp + "°");    
            }
        
            if( $("#todaylow").text() != "Low: " + lowTemp + "°") {
                $("#todaylow").html("");
                $("#todaylow").append("Low: " + lowTemp + "°");    
            }

            if( $("#todayadd").text() != description) {
                $("#todayadd").html("");
                $("#todayadd").append(description);
                $(".weatherImg").attr("src","images/" + icon + ".png");
            }
            
        }); 
}

//get ETH
function getETH() {
        $.getJSON("https://api.coinmarketcap.com/v1/ticker/ethereum/", function( data ) {
            var ptch24 = data[0].percent_change_24h;
            
            if(data[0].percent_change_24h > 0){
                $("#ethRate").css("color","green");
            }
            else if(data[0].percent_change_24h < 0){
                $("#ethRate").css("color","red");
            }
            
            if(data[0].percent_change_24h > 0){
                $("#ethRatept").css("color","green");
            }
            else if(data[0].percent_change_24h < 0){
                $("#ethRatept").css("color","red");
            }            
            $("#ethRate").append("$" + data[0].price_usd);
            $("#ethRatept").append(" (" + ptch24 + "%)");
            
        });        
}

//Get Date&Time
function getDateTime() {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();

    var todaysdate = day + '/' + 
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + d.getFullYear();
    
    $("#dateAndTime").append(todaysdate + " " +time);
}
    
//Get news 
function getNews() {

var url = 'https://newsapi.org/v2/top-headlines?' +
          'sources=google-news-is&' +
          'apiKey=72b3e1c36d8149b08e85b8fceb0f7aef';

    
    $.ajax({
      dataType: "json",
      url: url,
      success: function(data) {

          var newsArray =  data.articles;          
          for (i = 0; i < newsArray.length; ++i) {
                var date = new Date(newsArray[i].publishedAt),
                    yr = date.getFullYear(),
                    month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1,
                    day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                    h = date.getHours(),
                    m = date.getMinutes();
                newDate = month + '/' + day + '/' + yr.toString().substring(2) + ' ' + "[" + h + ':' + m + "]";
              
              
                $("#ticker ul").append(
                   '<li>' + newDate + ' - ' + newsArray[i].title  + ' ' + '<span><a href= '+newsArray[i].url+'>קישור</a></span></li>'
                );
          }
          $('#ticker').vTicker('init', {speed: 500, 
            pause: 5000,
            showItems: 1,
            padding:4
          });
      } 
    });  
    
   
    
}

    
getDateTime();
getSPCB();
getWeather();
getETH();
getNews();



