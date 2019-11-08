// Your web app's Firebase configuration
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

// // add a new listener to add all members to the well
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