$(document).ready(function(){
        var usersObj = {};
        var myList;
        var listArray;
        var arrays;
	var tracks;
	$.getJSON('lfs.json', function(data){
	  myList = data;
	  
	function msToTime(ms) {
                 var d = new Date(ms);
                 return (
                 ("" + d.getMinutes()).slice(-2)
                 ) + ":" + (
                 ("2" + d.getSeconds()).slice(-2)
                 ) + "." + (
                 ("0" + d.getMilliseconds()).slice(-3)
                 );
        };
	
	$.each(myList,function(index, userObj){
	   arrays = userObj;
	   var trackCode = userObj.track;
                var trackToName;
                switch(trackCode.charAt(0)){
                 case '0': trackToName = "Blackwood ";
                  switch(trackCode.charAt(1)){
                   case '0': trackToName += "GP Track"; break;
                   case '1': trackToName += "Rally Cross"; break;
                   case '2': trackToName += "Car Park"; break;
                  }
                 break;
                 case '1': trackToName = "South City ";
                  switch(trackCode.charAt(1)){
                   case '0': trackToName += "Classic"; break;
                   case '1': trackToName += "Sprint Track 1"; break;
                   case '2': trackToName += "Sprint Track 2"; break;
                   case '3': trackToName += "Long"; break;
                   case '4': trackToName += "Town Course"; break;
                   case '5': trackToName += "Chicane Route"; break;
                  }
                 break;
                 case '2': trackToName = "Fern Bay ";
                  switch(trackCode.charAt(1)){
                   case '0': trackToName += "Club"; break;
                   case '1': trackToName += "Green"; break;
                   case '2': trackToName += "Gold"; break;
                   case '3': trackToName += "Black"; break;
                   case '4': trackToName += "Rally Cross"; break;
                   case '5': trackToName += "RallyX Green"; break;
                  }
                 break;
                 case '3': trackToName = "Autocross ";
                  switch(trackCode.charAt(1)){
                   case '0': trackToName += "Autocross"; break;
                   case '1': trackToName += "Skid Pad"; break;
                   case '2': trackToName += "Drag Strip"; break;
                   case '3': trackToName += "8 Lane Break"; break;
                  }
                 break;
                 case '4': trackToName = "Kyoto Ring ";
                  switch(trackCode.charAt(1)){
                   case '0': trackToName += "Oval"; break;
                   case '1': trackToName += "National"; break;
                   case '2': trackToName += "GP Long"; break;
                  }
                 break;
                 case '5': trackToName = "Westhill ";
                  switch(trackCode.charAt(1)){
                   case '0': trackToName += "International"; break;
                  }
                 break;
                 case '6': trackToName = "Aston ";
                  switch(trackCode.charAt(1)){
                   case '0': trackToName += "Cadet"; break;
                   case '1': trackToName += "Club"; break;
                   case '2': trackToName += "National"; break;
                   case '3': trackToName += "Historic"; break;
                   case '4': trackToName += "Grand Prix"; break;
                   case '5': trackToName += "Grand Touring"; break;
                   case '6': trackToName += "North"; break;
                  }
                 break;
                 default: trackToName = "Unknown Track";
                }

                if(trackCode.charAt(2) == "1"){
		 trackToName += " Reversed";
                }
		userObj.track = trackToName;
	});
	  Array.prototype.sortByProp = function(o, p){
                        return this.sort(function(a,b){
                          if(a[o] == b[o]){
                            return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
                         }
                        return a[o] > b[o] ? 1 : -1;
                });
                }
	myList.sortByProp('track', 'car');
	tracks  = _.uniq(myList, 'track');
	_.forEach(tracks, function(elemInArray,index){
	  console.log(elemInArray,index);
	});

   });

});
