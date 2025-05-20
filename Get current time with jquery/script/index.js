$(document).ready(function () {

    // making 2 variable month and day
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    // make single object
    var newDate = new Date()
    newDate.setDate(newDate.getDate())
    // make current time
    $('#Date').html(dayName[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthName[newDate.getMonth()] + ' ' + newDate.getFullYear())

    setInterval(function () {
        // Create a newDate() object and extract the seconds of the current time
        var seconds = new Date().getSeconds()
        $("#sec").html((seconds < 10 ? "0" : "") + seconds)
    }, 1000)

    setInterval(function () {
        // Create a newDate() object and extract the minutes of the current time
        var minutes = new Date().getMinutes()
        // Add a leading zero to the minutes value
        $("#min").html((minutes < 10 ? "0" : "") + minutes)
    }, 1000)

    setInterval(function () {
        // Create a newDate() object and extract the hours of the current time
        var hours = new Date().getHours();
        // Add a leading zero to the hours value
        $("#hours").html((hours < 10 ? "0" : "") + hours)
    }, 1000)
})