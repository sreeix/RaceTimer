var startRider = function(){
 	navigator.network.isReachable("racetimer.heroku.com", function(reachability) {
    var riderNumber = document.getElementById("rider_number").value;
    if(reachability == NetworkStatus.NOT_REACHABLE){
      navigator.notification.alert("Network is not up. Storing stuff locally, Synch when you have network. Make sure you synch the starts before ends");
      window.localStorage.setItem( riderNumber+"~startTime"+,  new Date().toString()));
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
      navigator.notification.alert("Network is not up. Storing stuff locally, Synch when you have network. Make sure you synch the starts before ends");
      window.localStorage.setItem( riderNumber+"~endTime"+,  new Date().toString()));

    }else {
      navigator.notification.alert("PUT... "+ new Date().toString());
      $.post("http://racetimer.heroku.com/rider/"+riderNumber+".json", {end_time: (new Date().toString())} ,function(data) {
        
        navigator.notification.alert("Time taken ... "+ data.time_taken + " seconds");
      });
    }
 	});
};


var synch = function(){
  for(var i =0; i< window.localStorage.length; i++){
    var key = window.localStorage.key(i);
    var value = window.localStorage.getItem(key);
    var keyItems = key.split("~")
    
    if(keyItems[1] =='startTime'){
      $.post("http://racetimer.heroku.com/rider.json", {number: keyItems[0], start_time: value}, function(data) {
       navigator.notification.alert("Posted... "+ new Date().toString());
      });
    }else {
       $.post("http://racetimer.heroku.com/rider/"+keyItems[0]+".json", {end_time: value} ,function(data) {
          navigator.notification.alert("Time taken ... "+ data.time_taken + " seconds");
        }); 
    }
    window.localStorage.removeItem(key);
  }
};
