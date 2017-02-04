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
  setInterval(getOrdersOfStatus, 30000);
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
  var date = $('select[id="dateFilter"]').val();
  var fromDate = $("#fromDate").val();
  var toDate = $("#toDate").val();
  var urlToUse = '';
  if (date == 'ALL') {
    urlToUse = "http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/order/getOrdersBetweenDates?startPosition=0&maxResult=10&statuses=" + status + '&startDate=' + fromDate + '&endDate=' + toDate;
  }
  else {
    //urlToUse = "/getOrders?orderstatus="+status+"&date="+date;
    urlToUse = "http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/order/getOrdersBetweenDates?startPosition=0&maxResult=10&statuses=" + status + '&startDate=' + fromDate + '&endDate=' + toDate;
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
        order_rows += "<tr><td><a class='btn btn-info' href='/editOrder?id=" + sorted_order_rows[i].orderId + "'>" + sorted_order_rows[i].orderDetails.firstName + "</a></td><td>" + sorted_order_rows[i].orderDetails.address + "</td><td>" + sorted_order_rows[i].orderDetails.phoneNumber + "</td><td>" + status + "</td><td>" + sorted_order_rows[i].scheduleTime + "</td><td>" + sorted_order_rows[i].orderDetails.emailId+ "</td></tr>";

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
  var dateObject = moment($('#slotDate').val(), 'YYYY-MM-DD').format('YYYY-MM-DD');
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
      $('#slotDate').val(moment(new Date(), 'YYYY-MM-DD').add('days', 1).format('YYYY-MM-DD'));

    }
  }



};


$("#slotDate").change(function(){
  fetchTimeSlotsForTheDate();
});


$("#refreshButton").click(function(){
  getOrdersOfStatus();
});





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
  var date = new Date(parseInt(date1.split("-")[0]), parseInt(date1.split("-")[1]) - 1, parseInt(date1.split("/")[2]));

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
     $.ajax({url: "http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/timeSlot/getAvailableSlots?slotDate="+date1, success: function(result){ //Logic to find timeslots for a given day from back-end, which have no availability
       if(result["timeSlots"] == null)
       {
         flebieavailability = [];
       }
       else 
       {
         flebieavailability = result['timeSlots'];
       }
       
      console.log("Flebie availability is: "+flebieavailability);
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
    console.log("Getting timeslots");
  }
  var interval = 0;
  
  var  checkAvailability = setInterval(function(){

    if( flebieavailability != null)
    {

      clearInterval(checkAvailability);
      console.log("Cleared Interval");

      for(var i in timeStringArray)
      {
        for(var j in flebieavailability)
        {
          console.log("Flebie availability is: "+flebieavailability[j]);
          if( flebieavailability[j] == timeStringArray[i].split("-")[0] && $.inArray( flebieavailability[j], disabledStringArray ) === -1)
          {
            disabledStringArray.push(timeStringArray[i]);
            break;

          }

        }
      }

      console.log("Disabled time string is: "+disabledStringArray);
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


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

//If JSONData is not an object then JSON.parse will parse the JSON string in an Object

  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

  var CSV = '';

//Set Report title in first row or line

//This condition will generate the Label/Header

  if (ShowLabel) {

    var row = '';

//This loop will extract the label from 1st index of on array

    for (var index in arrData[0]) {

      if(index!= 'UserName1')

//Now convert each value to string and comma-seprated

        row += index + ',';

    }

    row = row.slice(0, -1);

//append Label row with line break

    CSV += row + '\r\n';

  }

//1st loop is to extract each row

  for (var i = 0; i < arrData.length; i++) {

    var row = '';

//2nd loop will extract each column and convert it in string comma-seprated

    for (var index in arrData[i]) {


      var data = null;
      data = arrData[i][index].toString().replace(/\r?\n|\r/g, " ").replace(/,/g,"");

      row += '' +data+ ',';

    }
    row = row.replace(/,\s*$/, "");
    var len = row.length - 1;
    row.slice(0, len);

//add a line break after each row

    CSV += row + '\r\n';

  }

  if (CSV == '') {

    alert('Invalid data');

    return;

  }

//Generate a file name

  var fileName = '';

//this will remove the blank-spaces from the title and replace it with an underscore

  fileName += ReportTitle.replace(/ /g, '');

//Initialize file format you want csv or xls

  var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

var  blob = new Blob([CSV], { type: 'text/csv' }); //new way as anchor tag download not supported in latest chrome so use Blob

  var csvUrl = URL.createObjectURL(blob);  //Now file with proper filename is downloaded with proper extension

//this trick will generate a temp <a /> tag

  var link = document.createElement('a');

  link.href = csvUrl;

//set the visibility hidden so it will not effect on your web-layout

  link.style = 'visibility:hidden';

  link.download = fileName + '.csv';

//this part will append the anchor tag and remove it after automatic click

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

}









var getOrdersAsCSV = function () {
  var jsonData = localStorage.getItem('csvData');
  //console.log("Json data is: "+jsonData);
  
  var requiredJsonData = [];
  for (var i in jsonData) {
   var requiredJson = {"orderId": jsonData[i].orderId};
    requiredJsonData.push(requiredJson);
    
  }
  JSONToCSVConvertor(JSON.parse(jsonData), 'OrdersReport', 'Orders');
};

$("#getCSVData").click(
    function () {
      getOrdersAsCSV();
    }
    
);

