<script>
<p id="demo"></p>
var xValues=[];
var windSpeed=[];
var airTemperature=[];
var humidity=[];

function change_myselect(sel) {
  const dbParam = JSON.stringify({table:sel,limit:20});
  const xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onload = function() {
  
    myObj = xmlhttp.response;
    text = "<table border='1'>"
    for (x in myObj) {
		xValues[x]=myObj[x].station_name;
		windSpeed[x]=myObj[x].wind_speed;
		airTemperature[x]=myObj[x].air_temperature;
		humidity[x]=myObj[x].humidity;
      text += "<tr><td>" + myObj[x].station_name + "</td>";
      text += "<td>" + myObj[x].wind_speed + "</td>";
      text += "<td>" + myObj[x].air_temperature + "</td>";
      text += "<td>" + myObj[x].humidity + "</td></tr>";
		
		console.log(xValues[x],windSpeed[x],airTemperature[x],humidity[x]);

    }
    text += "</table>"    
    document.getElementById("demo").innerHTML = text;
	new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      data: windSpeed,
      borderColor: "red",
      fill: false
    },{
      data: airTemperature,
      borderColor: "green",
      fill: false
    },{
      data: humidity,
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});
  }
  xmlhttp.open('GET', 'https://data.cityofchicago.org/resource/k7hf-8y75.json', true);
  xmlhttp.responseType = 'json';
  xmlhttp.send();
}
</script>
