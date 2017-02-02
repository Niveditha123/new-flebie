import Dashboard from '../../components/dashboard.jsx';
import Styles from '../scss/dashboard.scss';
import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(
  <Dashboard data={{hello:"world"}} />,
  document.getElementById('root')
);


$(document).ready(function () {
  $("#slotTime").height( $("#slotTime")[0].scrollHeight );
  $('#connectionAlert').hide();
  $('#shoppingcart').hide();
  $('#callus').hide();
  $('#userDisplay').show();
  var todaysDate = moment(new Date(), 'YYYY-MM-DD');
  todaysDate = todaysDate.format('YYYY-MM-DD');
  initializeScheduleCalendar();
  $("#slotDate").val(moment(new Date(), 'YYYY-MM-DD').add('days', 1).format('YYYY-MM-DD'));
  setTimeSelection( $('#slotDate').val(), restrictBookingAfter2PMOnCurrentDate, noTimeSlotLeftForToday );
  $("#fromDate").val(todaysDate);
  $("#toDate").val(moment(new Date(), 'YYYY-MM-DD').add('days', 1).format('YYYY-MM-DD'));
  //var dateFilterHTML = "<option value='"+moment().format('DD/MM/YYYY')+"'>TODAY</option>"+"<option value='"+moment().add(1, 'day').format('DD/MM/YYYY')+"'>TOMORROW</option>"+"<option value='"+moment().add(2, 'day').format('DD/MM/YYYY')+"'>"+moment().add(2, 'day').format('DD/MM/YYYY')+"</option>"+"<option value='ALL' >ALL</option>";
  //$("#dateFilter").html(dateFilterHTML);
  initializeFromCalendar();
  initializeToCalendar();
  getOrdersOfStatus();
  setInterval(getOrdersOfStatus, 10000);
  localStorage.removeItem('shoppingCart');

});

var getOrdersAsCSV = function () {
  var jsonData = localStorage.getItem('csvData');
  //console.log("Json data is: "+jsonData);
  requiredJsonData = [];
  for (var i in jsonData) {
    requiredJson = {"orderId": jsonData[i].orderId};
    requiredJsonData.push(requiredJson);
  }
  JSONToCSVConvertor(JSON.parse(jsonData), 'OrdersReport', 'Orders');
};

var assignFlebieForSlot = function(flebieObject)
{
  var flebie = flebieObject.value;
  var objectid = flebieObject.parentNode.parentNode.firstChild.firstChild.innerHTML;

  var status = flebieObject.parentNode.parentNode.childNodes[4].innerHTML;

  if(flebie != '' && flebie != 'Select a flebie' && status != 'PENDING')
  {
    $.ajax({
      url: "/setSlot?flebie=" + flebie + '&objectid=' + objectid, success: function (result) {
        //console.log("Slot set for the flebie");
        if($('th')[1].innerHTML == 'STATUS')
        {
          flebieObject.parentNode.parentNode.childNodes[1].innerHTML = 'ASSIGNED';
        }
        else
        {
          flebieObject.parentNode.parentNode.childNodes[4].innerHTML = 'ASSIGNED';
        }


      }, failure: function (error) {
        //console.log("Error while fetching timeslot is:" + error.message);

      }
    }).done(
        function () {
          $('#connectionAlert').hide();
        }
    )
        .fail(
            function () {
              $('#connectionAlert').show();
            }
        );
  }


};



var getOrdersOfStatus = function()
{

  var status = $('select[id="statusFilter"]').val();
  console.log("Status is: "+status);
  var date = $('select[id="dateFilter"]').val();
  var fromDate = $("#fromDate").val();
  var toDate = $("#toDate").val();
  var urlToUse = '';
  if (date == 'ALL') {
    urlToUse = "http://localhost:8081/api/v0.1/order/getOrdersBetweenDates?startPosition=0&maxResult=10&statuses=" + status + '&startDate=' + fromDate + '&endDate=' + toDate;
  }
  else {
    //urlToUse = "/getOrders?orderstatus="+status+"&date="+date;
    urlToUse = "http://localhost:8081/api/v0.1/order/getOrdersBetweenDates?startPosition=0&maxResult=10&statuses=" + status + '&startDate=' + fromDate + '&endDate=' + toDate;
  }
  $.ajax({
    url: urlToUse,
    success: function (result) {
      var orders = result;
      

      var sorted_order_dates = [];
      for (var i in orders) {
        var r1 = moment(orders[i].scheduleDate, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DDTHH:mm:ssZ');
        sorted_order_dates.push(new Date(r1));
      }
      sorted_order_dates = sorted_order_dates.sort(date_sort_asc);
      console.log("sorted order dates are: "+sorted_order_dates[0].toString());
      var sorted_order_rows = [];
      sorted_order_rows = orders;
      /*for (var j in sorted_order_dates) {
        for (var i in orders) {
          var r1 = orders[i].scheduleTime;
        
          var dateobj = new Date(r1);
          

          if (( dateobj.toUTCString() == sorted_order_dates[j].toUTCString() ) && ( $.inArray(orders[i], sorted_order_rows) == -1)) {
            console.log("Entered here");
            sorted_order_rows.push(orders[i]);
            break;
          }

        }
      }*/
      console.log("sorted order rows are: "+sorted_order_rows);
      var order_rows = [];
      for (var i in sorted_order_rows) {
        status = sorted_order_rows[i].status;
        if (status == 'SUCCESS') {
          status = 'UNASSIGNED';
        }

        var cashToBeCollected = 0;


        if(sorted_order_rows[i].paymentType == 'COD')
        {
          cashToBeCollected = sorted_order_rows[i].price;
        }
        console.log('sorted order rows are: '+JSON.stringify(sorted_order_rows));
        order_rows += "<tr><td><a class='btn btn-info' href='http://localhost:8081/api/v0.1/order/getOrder?orderId=" + sorted_order_rows[i].orderId + "'>" + sorted_order_rows[i].orderDetails.firstName + "</a></td><td>" + sorted_order_rows[i].orderDetails.address + "</td><td>" + sorted_order_rows[i].orderDetails.phoneNumber + "</td><td>" + status + "</td><td>" + sorted_order_rows[i].scheduleTime + "</td><td>" + sorted_order_rows[i].orderDetails.emailId+ "</td></tr>";

        //delete sorted_order_rows[i].cost;
        delete sorted_order_rows[i].orderId;
        delete sorted_order_rows[i].price;
      }
      
      $('#bodyoftable').html(order_rows);
      localStorage.removeItem('csvData');
      localStorage.setItem('csvData', JSON.stringify(sorted_order_rows));


    }, failure: function (error) {
      //console.log("Error while fetching timeslot is:" + error.message);

    }
  }).done(
      function () {
        $('#connectionAlert').hide();
      }
  )
      .fail(
          function () {
            $('#connectionAlert').show();
          }
      );
};

var sampleCollected = function (i) {
  var orderId = $("tbody>tr:nth-child(" + (i + 1) + ")>td:nth-child(1)>a").text();
  //console.log("Order id is: "+orderId);

  $.ajax({
    url: "/sampleCollected?orderId=" + orderId,
    success: function (result) {
      if (result.status == 'success') {
        //console.log("css path is: "+"tbody>tr:nth-child("+i+")>td:nth-child(5)");
        $("tbody>tr:nth-child("+(i+1)+")>td:nth-child(5)").html("COLLECTED");
        $("tbody>tr:nth-child("+(i+1)+")>td:nth-child(11)").html("<button class='btn btn-info' onclick='sampleSubmitted("+i+");'>SUBMITTED</button>");

      }

    }, failure: function (error) {
      $('#message').text('Status updation failed');

    }

  }).done(
      function () {
        $('#connectionAlert').hide();
      }
  )
      .fail(
          function () {
            $('#connectionAlert').show();
          }
      );
};


var sampleSubmitted = function (i) {
  var orderId = $("tbody>tr:nth-child(" + (i + 1) + ")>td:nth-child(1)>a").text();
  //console.log("Order id is: "+orderId);
  $.ajax({
    url: "/sampleSubmitted?orderId=" + orderId,
    success: function (result) {
      if (result.status == 'success') {
        $("tbody>tr:nth-child("+(i+1)+")>td:nth-child(5)").html("SUBMITTED");
        $("tbody>tr:nth-child("+(i+1)+")>td:nth-child(11)").html("<button class='btn btn-info' onclick='completed("+i+");'>COMPLETED</button>");


      }

    }, failure: function (error) {
      $('#message').text('Status updation failed');

    }

  }).done(
      function () {
        $('#connectionAlert').hide();
      }
  )
      .fail(
          function () {
            $('#connectionAlert').show();
          }
      );
};


var completed = function (i) {
  var orderId = $("tbody>tr:nth-child(" + (i + 1) + ")>td:nth-child(1)>a").text();
  //console.log("Order id is: "+orderId);

  $.ajax({
    url: "/setAsCompleted?orderId=" + orderId,
    success: function (result) {
      if (result.status == 'success') {
        $("tbody>tr:nth-child("+(i+1)+")>td:nth-child(5)").html("COMPLETED");
        $("tbody>tr:nth-child("+(i+1)+")>td:nth-child(11)").html("<button class='btn btn-info' onclick=''>---</button>");
      }
    }, failure: function (error) {
      $('#message').text('Status updation failed');

    }

  }).done(
      function () {
        $('#connectionAlert').hide();
      }
  )
      .fail(
          function () {
            $('#connectionAlert').show();
          }
      );
};

var refreshSection = function(responseText)
{
  //console.log(responseText);
};

var createNewOrder = function()
{
  localStorage.removeItem('shoppingCart');
  localStorage.removeItem('orderIdInShoppingCart');
  location.href = '/test/list';
};
var initializeFromCalendar = function () {
  $("#fromDate").datepicker(
      {
        dateFormat: "yyyy-mm-dd",
        defaultDate: 0,
        constrainInput: true,
        numberOfMonths: [1, 1],
        showAnim: "fadeIn"
      }
  );

};
var initializeToCalendar = function () {

  $("#toDate").datepicker(
      {
        dateFormat: "yyyy-mm-dd",
        defaultDate: 0,
        constrainInput: true,
        numberOfMonths: [1, 1],
        showAnim: "fadeIn"
      }
  );

};

var initializeScheduleCalendar = function () {

  $("#slotDate").datepicker(
      {
        minDate: 1,
        dateFormat: "yyyy-mm-dd",
        defaultDate: 1,
        constrainInput: true,
        numberOfMonths: [1, 1],
        showAnim: "fadeIn"
      });
};

var restrictBookingAfter2PMOnCurrentDate = function(string1) // Method to populate timeslots dropdown incase of booking after 2:00 PM on the current day
{
  console.log("Restricting booking after 2 pm");
  var optionString = "No booking allowed after 2:00 PM on the same day";
  $('#slotTime').val(optionString);
};



var noTimeSlotLeftForToday = function(string1) // Method to populate timeslots dropdown, when no timeslots are available for that day
{
  console.log("No time slot available for today");
  var optionString = "No time slot available for today \n";
  $('#slotTime').val(optionString);
};


var fetchTimeSlotsForTheDate = function() {

  console.log('Entered here');
  var dateObject = moment($('#slotDate').val(), 'DD/MM/YYYY').format('DD/MM/YYYY');
  console.log('Date object is: ' + dateObject);
  if (dateObject != 'Invalid date') {
    setTimeSelection(dateObject, restrictBookingAfter2PMOnCurrentDate, noTimeSlotLeftForToday);
  }
  else {
    console.log("Slot date is not correct");
    var oldValue = $(this).attr('oldValue');
    if (oldValue != null) {
      $('#slotDate').val(oldValue);
    } else {
      $('#slotDate').val(moment(new Date(), 'DD/MM/YYYY').add('days', 1).format('DD/MM/YYYY'));

    }
  }



};










var getDifferenceOfDays = function(date1, date2)
{
  //var oneDay = 24*60*60*1000;
  //var diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneDay)));

  var moment1 = moment(date1);
  var moment2 = moment(date2);
  var diffDays = moment1.diff(moment2, 'days');

  console.log('Difference of days is: '+diffDays);
  return diffDays;
};


var setTimeSelection = function( date1, callback1, callback2){



  var optionString = "";
  var timeStringArray = ["6:30:00 AM-7:00:00 AM", "7:00:00 AM-7:30:00 AM", "7:30:00 AM-8:00:00 AM", "8:00:00 AM-8:30:00 AM","8:30:00 AM-9:00:00 AM","9:00:00 AM-9:30:00 AM", "9:30:00 AM-10:00:00 AM", "10:00:00 AM-10:30:00 AM","10:30:00 AM-11:00:00 AM"];
  var disabledStringArray = [];

  var currentDate = new Date();
  var tempDate = new Date();
  var date = new Date(parseInt(date1.split("/")[2]), parseInt(date1.split("/")[1]) - 1, parseInt(date1.split("/")[0]));

  var dateDifference = null;
  if(date.getMonth() == currentDate.getMonth() && date.getFullYear() == currentDate.getFullYear())
  {
    dateDifference = date.getDate() - currentDate.getDate();
  }
  else {
    dateDifference = -1;
  }


  if(dateDifference == 0 ) //All the logic for availability on the same day
  {


    if(currentDate.getHours() >= 14){ // Logic for current time > 2:00 PM

      callback1.apply(); // Invoking callback method for display after 2:00 PM
      return "No booking allowed after 2:00 PM";
    }
    else
    {
      for(var i in timeStringArray)
      {
        if(timeStringArray[i] != "Select Time")
        {
          if( timeStringArray[i].split("-")[0].search("PM") == -1  || (timeStringArray[i].split("-")[0].search("PM") != -1 && timeStringArray[i].split("-")[0].split(":")[0]) == 12)  //Logic to set Hours for time slot starting with 12 PM
          {

            tempDate.setHours(parseInt(timeStringArray[i].split("-")[0].split(":")[0]));

          }
          else if( parseInt(timeStringArray[i].split("-")[0].split(":")[0]) < 12 )
          {
            tempDate.setHours(parseInt(timeStringArray[i].split("-")[0].split(":")[0])+12);
          }
          tempDate.setMinutes(parseInt(timeStringArray[i].split("-")[0].split(":")[1]));
          tempDate.setSeconds(parseInt(timeStringArray[i].split("-")[0].split(":")[2].trim()));

          if (tempDate.getTime()  < currentDate.getTime() + (120 * 60 * 1000)  || tempDate.getHours() < 9)  // 1) Logic to disable all time slots < currenttime+2hrs and 2) Logic to disable all time slots before 9:00 PM for currentday booking
          {
            disabledStringArray.push(timeStringArray[i]);
          }
        }
      }
    }
  }
  else if( currentDate.getHours() >= 22 && getDifferenceOfDays(date, currentDate) < 1) //Logic to disable all time slots before 9:00 AM on the next day, when booking is done on the previous day after 10:00 PM
  {

    for(var i in timeStringArray)
    {
      if(timeStringArray[i] != "Select Time")
      {
        if( timeStringArray[i].split("-")[0].search("PM") == -1 )
        {

          tempDate.setHours(parseInt(timeStringArray[i].split("-")[0].split(":")[0]));

        }
        else if( parseInt(timeStringArray[i].split("-")[0].split(":")[0]) < 12 )
        {
          tempDate.setHours(parseInt(timeStringArray[i].split("-")[0].split(":")[0])+12);
        }

        tempDate.setMinutes(parseInt(timeStringArray[i].split("-")[0].split(":")[1]));
        tempDate.setSeconds(parseInt(timeStringArray[i].split("-")[0].split(":")[2].trim()));

        if ( tempDate.getHours() < 9  && $.inArray( timeStringArray[i], disabledStringArray ) === -1)
        {
          disabledStringArray.push(timeStringArray[i]);
        }

      }

    }

  }


  var  timeStringArrayToFetchFromDB = [];
  for(var i in timeStringArray)
  {
    if($.inArray( timeStringArray[i], disabledStringArray ) === -1 && timeStringArray[i] != "Select Time")
    {

      timeStringArrayToFetchFromDB.push(timeStringArray[i]);


    }

  }

  var flebieavailability = null;

  if(timeStringArrayToFetchFromDB !== [])
  {
    var dateslot = date1.replace("/","-").replace("/","-");
    console.log('Dateslot to fetch is: '+dateslot);

    // Getting timeslot from database
    flebieavailability = $.ajax({url: "/checkavailability?dateslot="+dateslot, success: function(result){ //Logic to find timeslots for a given day from back-end, which have no availability
      console.log("Slot availability is: "+JSON.stringify(result.slotavailability));


    }, failure: function (error) {
      console.log("Error while fetching timeslot is:"+error.message);

    }});

  }
  else
  {

  }

  if ( disabledStringArray == timeStringArray)
  {
    callback2.apply(); // Invoking callback method for display when all time slots are disabled
  }
  else
  {
    for(var i in timeStringArray)
    {
      if( $.inArray( timeStringArray[i], disabledStringArray ) != -1)
      {

      }
    }

    if (optionString == '')
    {
      $('#slotTime').val("Trying to check for availability of time slots \n");
    }
    else
    {
      $('#slotTime').val(optionString + "Trying to check for availability of other time slots \n");
    }

  }


  var  checkAvailability = setInterval(function(){
    var interval = 0;

    if( flebieavailability != null   &&  flebieavailability['responseJSON'] != null )
    {
      flebieavailability = flebieavailability['responseJSON']['slotavailability'];
      console.log("Json is: "+JSON.stringify(flebieavailability));

      clearInterval(checkAvailability);
      console.log("Cleared Interval");

      for(var i in timeStringArray)
      {
        for(var j in flebieavailability)
        {
          if( flebieavailability[j] == timeStringArray[i] && $.inArray( timeStringArray[i], disabledStringArray ) === -1)
          {
            disabledStringArray.push(flebieavailability[j]);

          }

        }
      }


      if ( disabledStringArray == timeStringArray)
      {
        callback2.apply(); // Invoking callback method for display when all time slots are disabled
      }
      else
      {
        for(var i in timeStringArray)
        {
          if( $.inArray( timeStringArray[i], disabledStringArray) == -1)
          {
            if(timeStringArray[i] != "Select Time")
            {
              console.log("Option string is: "+optionString);

              optionString = optionString + "" + timeStringArray[i] +"\n";

            }
            else {
              optionString = optionString + "" + timeStringArray[i] +"\n";

            }
          }
        }
      }


      $('#slotTime').val(optionString);

    }
    else if(interval == 5000) // Waiting for 5 seconds for ajax req to complete
    {
      clearInterval(checkAvailability);
    }
    else if(flebieavailability == 'Error')
    {

      clearInterval(checkAvailability);
    }
    else
    {
      interval = interval + 10;

    }


  }, 0);
};














var checkAvailabilityAsperRules = function (date1, timeslot) {


  var currentDate = new Date();

  var tempDate = new Date();
  var date = new Date(parseInt(date1.split("/")[2]), parseInt(date1.split("/")[1]) - 1, parseInt(date1.split("/")[0]));

  var dateDifference = null;
  if(date.getMonth() == currentDate.getMonth() && date.getFullYear() == currentDate.getFullYear())
  {
    dateDifference = date.getDate() - currentDate.getDate();
  }
  else {
    dateDifference = -1;
  }


  if(dateDifference == 0 ) //All the logic for availability on the same day
  {


    if(currentDate.getHours() >= 14){ // Logic for current time > 2:00 PM

      return false;
    }
    else
    {

      if( timeslot.split("-")[0].search("PM") == -1  || (timeslot.split("-")[0].search("PM") != -1 && timeslot.split("-")[0].split(":")[0]) == 12)  //Logic to set Hours for time slot starting with 12 PM
      {

        tempDate.setHours(parseInt(timeslot.split("-")[0].split(":")[0]));

      }
      else if( parseInt(timeslot.split("-")[0].split(":")[0]) < 12 )
      {
        tempDate.setHours(parseInt(timeslot.split("-")[0].split(":")[0])+12);
      }
      tempDate.setMinutes(parseInt(timeslot.split("-")[0].split(":")[1]));
      tempDate.setSeconds(parseInt(timeslot.split("-")[0].split(":")[2].trim()));

      if (tempDate.getTime()  < currentDate.getTime() + (120 * 60 * 1000)  || tempDate.getHours() < 9)  // 1) Logic to disable all time slots < currenttime+2hrs and 2) Logic to disable all time slots before 9:00 PM for currentday booking
      {
        return false;
      }


    }
  }
  else if( currentDate.getHours() >= 22 && getDifferenceOfDays(date, currentDate) < 1) //Logic to disable all time slots before 9:00 AM on the next day, when booking is done on the previous day after 10:00 PM
  {



    if( timeslot.split("-")[0].search("PM") == -1 )
    {

      tempDate.setHours(parseInt(timeslot.split("-")[0].split(":")[0]));

    }
    else if( parseInt(timeslot.split("-")[0].split(":")[0]) < 12 )
    {
      tempDate.setHours(parseInt( timeslot.split("-")[0].split(":")[0])+12);
    }

    tempDate.setMinutes(parseInt(timeslot.split("-")[0].split(":")[1]));
    tempDate.setSeconds(parseInt(timeslot.split("-")[0].split(":")[2].trim()));

    if ( tempDate.getHours() < 9 )
    {
      return false;
    }
  }


};

var checkBeforeBookingTimeSlot = function() {
  bookingDate = $('#slotDate').val();
  timeslot = $('#slotTime').val();
  var r1 = checkAvailabilityAsperRules(bookingDate, timeslot);

  if ( r1 == false) {
    console.log('Entered false section');
    location.reload(true);
    return false;
  }
  else
  {
    console.log('Entered true section');
    return true;
  }
};

var date_sort_asc = function (date1, date2) {
  // This is a comparison function that will result in dates being sorted in
  // ASCENDING order. As you can see, JavaScript's native comparison operators
  // can be used to compare dates. This was news to me.
  if (date1 > date2) return 1;
  if (date1 < date2) return -1;
  return 0;
};