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
  
  $("#add-route-btn").click(function() {
    
    // disable the default behavior of element "form"
    event.preventDefault();

    // what to do after clicking the button
    var inRouteName = $("#route-name-input").val().trim();
    var inDestination = $("#destination-input").val().trim();
    var inFirstDepart = $("#first-depart-input").val().trim();
    var inFrequency = $("#frequency-input").val().trim();
  
    var newRoute = {
        route: inRouteName,
        destination: inDestination,
        start: inFirstDepart,
        frequency: inFrequency
    };
     
    console.log(newRoute.route);
    console.log(newRoute.destination);
    console.log(newRoute.start);
    console.log(newRoute.frequency);
    
    database.ref().push(newRoute);
    alert("Route successfully added");
  })
  
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


      $("#train-table > tbody").append(
        "<tr><td>"
        + newRouteName + "</td><td>"
        + newDesination + "</td><td>" 
        + newFrequency +  "</td><td>" 
        // + newNextDeparture + "</td><td>"
        + "00:00" + "</td><td>"
        // + newWait+ "</td><td>"
         + "0 Minutes" + "</td><td>"
      );
  });
});