/**
 * Created by adarshashetty on 03/02/17.
 */

/**
 * Created by adarshashetty on 04/12/16.
 */





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

    blob = new Blob([CSV], { type: 'text/csv' }); //new way as anchor tag download not supported in latest chrome so use Blob

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

var myData = "";


JSONToCSVConvertor(myData, "myData", "mayData");













