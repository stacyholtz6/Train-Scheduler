//Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAnbyGg3J43mKeZr6sXaE4O5tvKvnEuMPI",
  authDomain: "train-scheduler-f84a0.firebaseapp.com",
  databaseURL: "https://train-scheduler-f84a0.firebaseio.com",
  projectId: "train-scheduler-f84a0",
  storageBucket: "train-scheduler-f84a0.appspot.com",
  messagingSenderId: "223695039594",
  appId: "1:223695039594:web:7a569ce00480c93b90ee13"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// initial varibles
var trainName = "";
var Traindestination = "";
// number???
var firstTrainTime = "";
// fequency number???
var Trainfrequency = "";

// fields in table.... 
// next arrival number???
var nextArrival = "";
// minutes away number???
var minutesAway = "";

// onclick to add train to the firebase after user fills out the form. 
$("#add-train").on("click", function (event) {
  event.preventDefault();
  trainName = $("#train-name-input").val().trim();
  Traindestination = $("#destination-input").val().trim();
  firstTrainTime = $("#train-time-input").val().trim();
  Trainfrequency = $("#frequency-input").val().trim();
  console.log('trainName', trainName);
  console.log('destination', Traindestination);
  console.log('firstTrainTime', firstTrainTime);
  console.log('frequency', Trainfrequency);

  // add them to firebase database
  firebase.database().ref().push({
    name: trainName,
    destination: Traindestination,
    frequency: Trainfrequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// take the data from the database and put it in the train table
// currently will be ordered by the date added - not quite what I wanted - only puts in one train..... 
firebase.database().ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function (snapshot) {
  $("#train-name-display").text(snapshot.val().name);
  $("#destination-display").text(snapshot.val().destination);
  $("#frequency-display").text(snapshot.val().frequency);
  // still need to figure out nextArrival & minutesAway -- Moment.js
})

// need to append the table to get a list of the trians added
// needt to figure out how to use moment.js


// var name = "";
// var email = "";
// var age = 0;
// var comment = "";

// $("#add-user").on("click", function (event) {
//   event.preventDefault();
//   name = $("#name-input").val().trim();
//   email = $("#email-input").val().trim();
//   age = $("#age-input").val().trim();
//   comment = $("#comment-input").val().trim();
//   console.log('name', name);
//   console.log('email', email);
//   console.log(' age', age);
//   console.log(' comment', comment);

//   firebase.database().ref().push({
//     name: name,
//     email: email,
//     age: age,
//     comment: comment,
//     dateAdded: firebase.database.ServerValue.TIMESTAMP
//   })
// })

// // add a new listener to add all members to the well - give list of all members in the database
// firebase.database().ref().on("child_added", function (snapshot) {
//   $(".well").append("<p>" + snapshot.val().name + "</p>");
//   $(".well").append("<p>" + snapshot.val().email + "</p>");
//   $(".well").append("<p>" + snapshot.val().age + "</p>");
//   $(".well").append("<p>" + snapshot.val().comment + "</p>");
//   $(".well").append("<hr>");
// });

// // take data in database and put it in the most recent user area
// // orders all of the keys by the property dateAdded.....
// firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
//   $("#name-display").text(snapshot.val().name);
//   $("#email-display").text(snapshot.val().email);
//   $("#age-display").text(snapshot.val().age);
//   $("#comment-display").text(snapshot.val().comment);
// })