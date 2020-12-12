//"use strict";
try
{




//initial callback for FileReader
function uploadstart()
{
	try {

	fr = new FileReader();
	fr.onload = uploadfin;
	fr.readAsText(this.files[0]);
	
	} catch(err) {alert(err);}
}


//callback for FileReader.onload
function uploadfin()
{
	try {
	
	BP = new Blueprint(JSON.parse(fr.result));
	
	} catch(err) {alert(err);}
}


//callback for clipboard button
function copyclip()
{
	try {
	
	var text = document.getElementById("output");
	text.select();
	text.setSelectionRange(0, 99999);
	document.execCommand("copy");
	alert("Copied BP to clipboard!");
	
	} catch(err) {alert(err);}
}


//callback for result button
function generate()
{
	try {
	
	var xoff = parseInt(document.getElementById("xoffset").value);
	var yoff = parseInt(document.getElementById("yoffset").value);
	
	if(isNaN(xoff) || isNaN(yoff))
	{
		alert("The offset you entered is not valid!");
	}
	
	BP = new Blueprint(JSON.parse(fr.result));
	BP.translate([xoff, yoff]);
	
	msg = JSON.stringify(BP.info, null, 4);
	document.getElementById("output").textContent = msg;

	} catch(err) {alert(err);}
}


//an sfs blueprint
class Blueprint
{
	//creates wrapper for blueprint givin json
	constructor(obj)
	{
		this.info = obj;
	}
	
	
	//moves bp
	translate(displacement)
	{
		try {
		
		var parts = this.info["parts"];
			for(var n in parts)
			{
				parts[n]["p"]["x"] += displacement[0];
				parts[n]["p"]["y"] += displacement[1];
			}
	
		} catch(err) {alert(err);}
	}
}




var msg;
var fr;
var BP;
document.getElementById('inputfile').addEventListener('change', uploadstart);
document.getElementById('genbutton').addEventListener('click', generate);
document.getElementById('copybutton').addEventListener('click', copyclip);




}
catch(err)
{
	alert(err);
}