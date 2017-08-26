$(document).ready(function() {
   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDu5BpM_qG-YXpMQv_Pcf4kio-d1u6rCQM",
    authDomain: "frosted-flakes.firebaseapp.com",
    databaseURL: "https://frosted-flakes.firebaseio.com",
    projectId: "frosted-flakes",
    storageBucket: "frosted-flakes.appspot.com",
    messagingSenderId: "1087145818169"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  var update = function(){
    var now = moment();
    $("#time").html(moment(now).format("hh:mm"));
  }

  update();

  setInterval(update, 10000);
  
  $("#add-route-btn").click(function() {
    
    // disable the default behavior of element "form"
    event.preventDefault();

    // jQuery input connections
    var inRouteName = $("#route-name-input").val().trim();
    var inDestination = $("#destination-input").val().trim();
    var inFirstDepart = $("#first-depart-input").val().trim();
    var inFrequency = $("#frequency-input").val().trim();
    
    if(inRouteName === "" || inDestination === "" || inFirstDepart === "" || inFrequency === ""){
        alert("Please complete all fields");
    }
    else{
        var newRoute = {
            route: inRouteName,
            destination: inDestination,
            start: inFirstDepart,
            frequency: inFrequency
        };

        database.ref().push(newRoute);
        alert("Route successfully added");
    }
  })
  
  // make this into a standalone function to run with update
  database.ref().on("child_added", function(snapshot, prevChildKey) {
    var newTrain = snapshot.val();
    console.log("Route: " + newTrain.route);
    console.log("Destination: " + newTrain.destination);
    console.log("Start Time: " + newTrain.start);
    console.log("Frequency: " + newTrain.frequency);
    var newRouteName = newTrain.route;
    var newDesination = newTrain.destination;
    var newFirstDepart = newTrain.start;
    var newFrequency = newTrain.frequency;
    //calculations
 
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstDepartConverted = moment(newFirstDepart, "hh:mm").subtract(1, "years");
    console.log(firstDepartConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var timeDiff = moment().diff(moment(firstDepartConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDiff);

    // Time apart (remainder)
    var overTime = timeDiff % newFrequency;
    console.log(overTime);

    // Minute Until Train
    var newWait = newFrequency - overTime;
    console.log("MINUTES TILL TRAIN: " + newWait);

    // Next Train
    var newNextDeparture = moment().add(newWait, "minutes").format("hh:mm");
    console.log("DEPARTURE TIME: " + moment(newNextDeparture).format("hh:mm"));

      $("#train-table > tbody").append(
        "<tr><td>"
        + newRouteName + "</td><td>"
        + newDesination + "</td><td>" 
        + newFrequency +  "</td><td>" 
        + newNextDeparture + "</td><td>"
        + newWait+ "</td><td>"
      );
  });
});
