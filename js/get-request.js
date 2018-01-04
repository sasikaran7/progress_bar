function getData() {

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://pb-api.herokuapp.com/bars');
	//xhr.open('GET', 'http://localhost/progress_bar/data.json');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
		if (xhr.status === 200) {
			var json_arr = JSON.parse(xhr.responseText);			
			var arr_button = json_arr.buttons;
			var button = "";
			for ( var i = 0; i < arr_button.length; i++) {
				button += '<button class="btn btn-primary" onClick="incr('+arr_button[i]+','+json_arr.limit+');">' + arr_button[i] + '</button>&nbsp;';
			}
			var arr_bar = json_arr.bars;
			var bar = "";
			var dropdown = "<select id =progress_bar_no>";
			for ( var i = 0; i < arr_bar.length; i++) {
				bar += 'progress_bar_'+arr_bar[i]+' <progress value="'+arr_bar[i]+'" id="id'+arr_bar[i]+'" max="100"></progress> <br/>';
				dropdown += '<option value="'+arr_bar[i]+'">progress_bar_'+arr_bar[i]+'</option>';
			}
			dropdown+="</select>";

			document.getElementById("progress-buttons").innerHTML = button;
			document.getElementById("progress-bar").innerHTML = bar;
			document.getElementById("progress-dropdown").innerHTML = dropdown;

		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function incr(val,limit) { 	
	var e = document.getElementById("progress_bar_no");
	var progress_bar_no = e.options[e.selectedIndex].value;	
	var v1=document.getElementById('id'+progress_bar_no).value;	
	if(parseInt(v1) + parseInt(val) >= 100){
		document.getElementById('id'+progress_bar_no).max = parseInt(v1) + parseInt(val);
	}else{
		document.getElementById('id'+progress_bar_no).max = 100;
	}	
	totalProgress = parseInt(v1) + parseInt(val);	
	if(totalProgress > parseInt(limit)){		
		document.getElementById('id'+progress_bar_no).className = "progress-danger";	
	}else{		
		document.getElementById('id'+progress_bar_no).className = "progress-normal";		
	}
	
	document.getElementById('id'+progress_bar_no).value = parseInt(v1) + parseInt(val);
}