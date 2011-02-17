var startRider = function(){
 	navigator.network.isReachable("racetimer.heroku.com", function(reachability) {
    // navigator.notification.alert("test");

    var riderNumber = document.getElementById("rider_number").value;
    if(reachability == NetworkStatus.NOT_REACHABLE){
      navigator.notification.alert("Network is not up");
    }else {
      $.post("http://racetimer.heroku.com/rider.json", {number: riderNumber, start_time: new Date()}, function(data) {
       navigator.notification.alert("Posted...");
      });
    }
    
 	});
};

