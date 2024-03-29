function reverseString (str) {
    var charList = str.split ('');
    var reverseList = charList.reverse();
    var reversedStr = reverseList.join('');
    
    return reversedStr;

}

function toStrPalindrome(str){
    var reverse = reverseString(str);
  return str === reverse 
    }



    function getDateToString (date){
        var dateStr =  {  day:'', month:'' , year : '' };


        if (date.day < 10 ) {
            dateStr.day = '0' + date.day;
        }
        else {
            dateStr.day = date.day.toString();
        }

        if (date.month < 10) {
            dateStr.month = '0' + date.month;
        }
        else {
            dateStr.month = date.month.toString();
        }

        dateStr.year = date.year.toString();

        return dateStr;
    }

     function getDateInAllFormats(date) {
     var dateStr = getDateToString(date);

        var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
        var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
        var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
        var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
        var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
        var yymmdd = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

        return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd ];

         }

     function checkPalindromeForAll (date){
          var dateFormatList = getDateInAllFormats(date);
          var palindromeList = [];

          for (var i = 0; i < dateFormatList.length ; i++){
            var result = toStrPalindrome(dateFormatList[i]);
            palindromeList.push(result);
          }
          return palindromeList;

     }

     function isLeapYear(year){
        if (year % 400 ===0){
            return true;  }
        

        if (year % 100 === 0) {
            return false;
        }
        

        if (year % 4 === 0) {
            return true;

        }
        return false;
     }

     function getNextDate(date) {
        var day = date.day + 1;
        var month = date.month;
        var year = date.year;

        var daysInMonth = [ 31,28,31, 30, 31, 30, 31, 31, 30, 31, 30,31]

            if (month === 2){
                   if (isLeapYear(year)){
              if (day > 29) {
             day = 1;
             month++;
}
                   }
                   else {

                if (day > 28) {
                    day = 1;
                    month++;
                }

                   }
                   
            }
            else {
                if (day > daysInMonth[month - 1 ]) {
                    day = 1;
                    month++;
                }
            }

            if (month > 12) {
                month = 1;
                year++;
            }

            return {
                day : day,
                 month : month,
                 year :  year
            };


     }

      function getNextPalindromeDate(date) {
       
        var ctr = 0;
        var nextDate = getNextDate(date);

        while(1){
            ctr++;

            var resultList = checkPalindromeForAll(nextDate);
            
            for (let i = 0; i < resultList.length; i ++) {
                if(resultList[i]) {
                    return [ ctr,nextDate];
                }

            }
            
            nextDate = getNextDate(nextDate);
        }
       
      }

      function getPreviousDate(date) {
        var day = date.day - 1;
        var month = date.month;
        var year = date.year;
      
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      
        if (day === 0) {
          month--;
      
          if (month === 0) {
            month = 12;
            day = 31;
            year--;
          }
          else if (month === 2) {
            if (isLeapYear(year)) {
              day = 29;
            }
            else {
              day = 28;
            }
          }
          else {
            day = daysInMonth[month - 1];
          }
        }
      
        return {
          day: day,
          month: month,
          year: year
        }
      }



      function getPreviousPalindromeDate (date){
               
        var ctr= 0;
        var previousDate = getPreviousDate(date);


        while(1){
            ctr++;
            var resultList = checkPalindromeForAll(previousDate);

            for (let i = 0; i < resultList.length; i ++) {
                if(resultList[i]) {
                    return [ ctr,previousDate];
                }


        }

        previousDate = getPreviousDate(previousDate);

 } }








var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');

function clickHandler (e){
 var bdayStr = (dateInputRef.value);
 
 if (bdayStr !== ''){
    var listOfDate = bdayStr.split('-');
  var date = {
    day:  Number (listOfDate[2]    ) ,
    month: Number  ( listOfDate[1] )  ,
    year:  Number  (listOfDate[0]   )
  };


    var isPalindrome = checkPalindromeForAll(date);
 
    if( !isPalindrome.includes(true)) {
         const [ctr1, nextDate] = getNextPalindromeDate(date);
      const [ctr2, prevDate] = getPreviousPalindromeDate(date);
       
      if (ctr1 > ctr2) { 
        resultRef.innerText = `The next palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed it by ${ctr2} days! 😔`;

     } else {

        resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr1} days! 😔`;
     }
         
        } else   {
        resultRef.innerText = 'yay! your birthday is a palindrome!! 🎉'
         } 
       
        } }


showBtnRef.addEventListener('click',clickHandler);
