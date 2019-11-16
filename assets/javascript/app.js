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

var database = firebase.database();

// button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // grab user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrainTime = $("#train-time-input").val().trim();
  var trainFequency = $("#frequency-input").val().trim();

  // creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: firstTrainTime,
    frequency: trainFequency
  };

  // send the train data to firebase
  database.ref().push(newTrain);

  // error checking
  console.log('trainName', trainName);
  console.log(' trainDestination', trainDestination);
  console.log('firstTrainTime', firstTrainTime);
  console.log('trainFequency', trainFequency);

  // clear the inputs
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");

});

// add new train to train table - use moment to get the values for next arrival & minutes away
database.ref().on("child_added", function (childSnapshot) {

  // store everything into variable
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // console log for error checking
  console.log('trainName', trainName);
  console.log('trainDestination', trainDestination);
  console.log('firstTrainTime', firstTrainTime);
  console.log('trainFrequency', trainFrequency);
  console.log('childSnapshot.val()', childSnapshot);

  // pushes firstTrainTime back one yer to make sure it comes before current time
  var convertedTrainTime = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  console.log('convertedTrainTime', convertedTrainTime);

  // figure out the difference between the times
  var diffTime = moment().diff(moment(convertedTrainTime), "minutes");
  console.log('diffTime', diffTime);

  // figure out the time apart (remainder %)
  var remainder = diffTime % trainFrequency;
  console.log(' remainder', remainder);

  // find minutes until next trail
  var minutesAway = trainFrequency - remainder;
  console.log('minutesAway', minutesAway);

  // next train arrival
  var nextTrain = moment().add(minutesAway, "minutes");
  console.log('nextTrain', nextTrain);

  // create the new row in the table
  var newRow = $("<tr id='remove'>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text((nextTrain).format("HH:mm")),
    $("<td>").text(minutesAway),
    $("<td>").html("<i class='fas fa-trash-alt trash' data-key=" + childSnapshot.key + "></i>")
  )
  // append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// this deletes it from firebase - have to find the unique key assigned to each train
$("#train-table").on("click", ".trash", function () {
  var key = $(this).attr("data-key");
  database.ref(key).remove();
  console.log('key', key);
});

// remove the row from the table when the trash icon is clicked
$(document).on("click", ".trash", function () {
  $(this).closest("tr").remove();
  return false;
});

