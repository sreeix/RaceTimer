
if( typeof navigator.network == "undefined"){
  navigator.network = {
    isReachable : function(machine, f){
      f.apply(NetworkStatus.NOT_REACHABLE);
    }
  }
}

if( typeof navigator.notification == "undefined"){
  navigator.notification = {
    alert : function(f){
      window.alert(f);
    }
  }
}

if (typeof navigator == "undefined") {
  navigator = {
    network:{
      isReachable: function(f){
        f.apply(true);
    }},
    notification: {
      alert: function(mes){
        alert(mes);
    }}
  };
};
var rider = {
  start : function(){
    navigator.network.isReachable("racetimer.heroku.com", function(reachability) {
        var riderNumber = document.getElementById("rider_number").value;
        navigator.notification.alert('Connection type: ' + reachability);
            
        if(reachability == NetworkStatus.NOT_REACHABLE){
          navigator.notification.alert("Network is not up. Storing stuff locally, Synch when you have network. Make sure you synch the starts before ends");
          window.localStorage.setItem( riderNumber+"~startTime",  new Date().toString());
        } else {
          $.post("http://racetimer.heroku.com/rider.json", {number: riderNumber, start_time: (new Date().toString())}, function(data) {
           navigator.notification.alert("Posted... "+ new Date().toString());
          });
        }
    });

  },
  finish : function(){
    navigator.network.isReachable("racetimer.heroku.com", function(reachability) {
      var riderNumber = document.getElementById("rider_number").value;
      
      if(reachability == NetworkStatus.NOT_REACHABLE){
        navigator.notification.alert("Network is not up. Storing stuff locally, Synch when you have network. Make sure you synch the starts before ends");
        window.localStorage.setItem( riderNumber+"~endTime",  new Date().toString());

      }else {
        navigator.notification.alert("PUT... "+ new Date().toString());
        $.post("http://racetimer.heroku.com/rider/"+riderNumber+".json", {end_time: (new Date().toString())} ,function(data) {
          navigator.notification.alert("Time taken ... "+ data.time_taken + " seconds");
        });
      }
   	});
  },
  synch :function(){
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
  }
    
};



