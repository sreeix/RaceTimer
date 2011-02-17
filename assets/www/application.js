var startRider = function(){
 	navigator.network.isReachable("racetimer.heroku.com", function(reachability) {
    var riderNumber = document.getElementById("rider_number").value;
    if(reachability == NetworkStatus.NOT_REACHABLE){
      navigator.notification.alert("Network is not up");
    }else {
      $.post("http://racetimer.heroku.com/rider.json", {number: riderNumber, start_time: (new Date().toString())}, function(data) {
       navigator.notification.alert("Posted... "+ new Date().toString());
      });
    }
 	});
 	
};

var finishRider = function(){
  navigator.network.isReachable("racetimer.heroku.com", function(reachability) {
    var riderNumber = document.getElementById("rider_number").value;
    if(reachability == NetworkStatus.NOT_REACHABLE){
      navigator.notification.alert("Network is not up");
    }else {
      navigator.notification.alert("PUT... "+ new Date().toString());
      $.post("http://racetimer.heroku.com/rider/"+riderNumber+".json", {end_time: (new Date().toString())} ,function(data) {
        
        navigator.notification.alert("Time taken ... "+ data.time_taken + " seconds");
      });
    }
 	});
};

