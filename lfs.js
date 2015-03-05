$(document).ready(function(){
        var usersObj = {};
	var userList;
	var userArray;
	var tracks =  ["Aston Cadet", "Aston Club", "Aston Club Reversed", "Aston Grand Prix", "Aston Grand Prix Reversed", "Aston Historic", "Aston Historic Reversed", "Aston National", "Aston North Reversed", "Autocross 9 Lane Drag", "Blackwood GP", "Blackwood GP Reversed", "Blackwood Rally Cross", "Fern Bay Black", "Fern Bay BLack Reversed", "Fern Bay Club", "Fern Bay Gold", "Fern Bay Gold Reversed", "Fern Bay Green", "Fern Bay Rally Cross", "Kyoto Ring GP Long", "Kyoto Ring GP Long Reversed", "Kyoto Ring National", "Kyoto Ring National Reversed", "Kyoto Ring Oval", "Kyoto Ring Oval Reversed", "South City Chicane Route", "South City Chicane Route Reversed", "South City Classic", "South City Classic Reversed", "South City Long", "South City Long Reversed", "South City Sprint Track 1", "South City Sprint Track 1 Reversed", "South City Sprint Track 2", "South City Town Course", "Westhill International"];
	
	 for(var i = 0; i < tracks.length; i++){
                 $('.maindiv').append('<table class=\"tableclass\"><tr><td rowspan=\"500\"' +
                   " class=\"trackclass\" id=\"" + tracks[i].replace(/\s+/g, '') + '\">' + tracks[i] +
                   "<br></td><td class=\"trackTDclass\"><table class=\"timeTableclass\">" +
                   "<tr><td></td><td class=\"car\">" + "" + "</td></tr></table>");
		}

	parseUserList = function(user){
		$.getJSON(user + ".lfs", function(users){
			parseUserObj(user, users);
		});
	}
	
	$.get('userlist.list',function(users){
      		var lines = users.split("\n");
		lines.pop();
		for(var i in lines){
		 userList = lines[i];
		parseUserList(userList);
		}
	},'text');
	
	parseUserObj = function (user,userInfo){
                usersObj[user]=userInfo;
		var userArray = usersObj[user];
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
		
		
		$.each(userArray,function(index,userObj){
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
		
		userArray.sortByProp('track', 'car');
		console.log(userArray);
	 	for(var i = 0; i < tracks.length; i++){	 
		  $.each(userArray, function(index, userObjs){
			if(tracks[i] == userObjs.track) {
		  //if(userObjs.car == tracks
		    
		    $('.car').append("<tr class=\"PBclass\">" +
		    "<td></td><td></td><td class=\"racer\">"
		    + user +"</td><td class=\"split1\">" + msToTime(userObjs.split1) +
		    "</td><td class=\"split2\">" + msToTime(userObjs.split2) +
		    "</td><td class=\"split3\">" + msToTime(userObjs.split3) +
	            "</td><td class=\"laptime\">" + msToTime(userObjs.laptime) +
		    "</td></tr>");
			}
		  });
		}
		
	}
});

