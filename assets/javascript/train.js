$(document).ready(function() {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCEI-ZjXFyHa5Xoqcofnu-Z6Fgi4GBka4A",
        authDomain: "btrainschedule.firebaseapp.com",
        databaseURL: "https://btrainschedule.firebaseio.com",
        projectId: "btrainschedule",
        storageBucket: "",
        messagingSenderId: "450464600084",
        appId: "1:450464600084:web:9d20ba4954c16cd3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

var database = firebase.database();
    $('.btn').on('click', function(event) {

        event.preventDefault();
        var trainNameVar = $("#train-name").val().trim();
        var destinationVar = $("#destination").val().trim();
        var firstTrainVar = $("#first-train").val().trim();
        var frequencyVar = $("#frequency").val().trim();    

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainVarConverted = moment(firstTrainVar, "hh:mm").subtract(1, "years");
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainVarConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequencyVar;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequencyVar - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrainVar = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrainVar).format("hh:mm"));


        database.ref().push({
            Train: trainNameVar,
            Destination: destinationVar,
            First_Train: firstTrainVar,
            Frequency: frequencyVar,
            //Next_Train: nextTrainVar,
            Minutes_Away: tMinutesTillTrain,
       
        });
         $('#train_name').text("");
        $('#destination').text("");
        $('#first_train').text("");
        $('#frequency').text("");
 
    // });

    database.ref().on('child_added', function(snapshot) {
    var s = snapshot.val();


        newRow = $("tr")
             
        var newRow = "<tr><td>"+ s.Train + "</td>"  +
                   "<td>" + s.Destination + "</td>"  +
                   "<td>" + s.Frequency + "</td>"  +
                   "<td>" + s.nextTrainVar +  "</td>"   +
                   "<td>" + s.tMinutesTillTrain +"</td></tr>" 

       
       $("tbody").prepend(newRow);
       

    });

});
});