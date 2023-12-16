/*
* GLYPHZ v0.4 BY BEJUCO @ 2022
* LIBRARIES USED:
- SVG.js (https://github.com/svgdotjs/svg.js)
- JSZip (https://github.com/Stuk/jszip)
- JQuery (https://github.com/jquery/jquery)
- FileSaver.js (https://github.com/eligrey/FileSaver.js)
- Pushbar.js (https://github.com/oncebot/pushbar.js)
*/

// MENU //
const pushbar = new Pushbar({
	blur:false,
	overlay:true,
});


// SVG Canvas //
const width = 500
const height = 500;

var draw = SVG()
.addTo('#canvas')
.size(width, height)
.attr({
	id: 'svg'
});


// ZIP //
var zip;
var out;


// Random numbers functions //
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndFloat(min, max) {
	return (Math.random() * (max - min)) + min;
}


// BMP blocks array //
var blocks = [];

// Load BMP Unicode blocks ranges from JSON file to the blocks array.
$.ajax({
	async: false,
	url: './unicode/bmp_blocks.json',
	data: "",
	accepts:'application/json',
	dataType: 'json',
	success: function (data) {
		for (var i = 0; i < data.length; i++) {
			blocks.push(data[i]);
		}
	}
});

// Create check box for each block 
const blocks_checks = document.getElementById("blocks");

for (var i = 0; i < blocks.length; i++) {
	var check_list = document.createElement("form");
	check_list.setAttribute("class", "check_form");
	
	var check_list_input = document.createElement("input");
	check_list_input.setAttribute("id", blocks[i].id);
	check_list_input.setAttribute("type", "checkbox");
	check_list_input.setAttribute("name", blocks[i].name);
	check_list_input.setAttribute("value", i);
	
	var check_list_label = document.createElement("label");
	check_list_label.setAttribute("for", blocks[i].id);
	check_list_label.innerHTML = blocks[i].name;
	
	var check_list_br = document.createElement("br");
	
	check_list.appendChild(check_list_input);
	check_list.appendChild(check_list_label);
	check_list.appendChild(check_list_br);
	
	blocks_checks.appendChild(check_list);
}



// Function to create random character from the selected range
function uni_char(first, last) {
	var char = String.fromCharCode(parseInt(first, 16) + Math.random() * (parseInt(last, 16) - parseInt(first, 16) + 1))
	return char;
}



// GLYPHZ
function glyphz(rotation, scale) {
	//Initial position
	var pos_x = 0;
	var pos_y_letras = 250;
	var pos_y_clips = 0;
	
	// Arrays for SVG elements
	var text = [];
	var group = [];
	var rect = [];
	var clip = [];
	var random_rotation = [];
	
	// Blocks check boxes
	var chos_blocks = [];
	var check_boxes = document.querySelectorAll('input[type=checkbox]:checked');
	
	// If nothing selected, return false
	var check_empty = document.querySelectorAll('input[type=checkbox]');
	var empty = [].filter.call(check_empty, function(el) {
		return !el.checked
	});
	
	if (check_empty.length == empty.length) {
		return false;
	}
	
	// If checked, select from the blocks array
	for (var i = 0; i < check_boxes.length; i++) {
		if (check_boxes[i].checked) {
			chos_blocks.push(blocks[check_boxes[i].value]);
		}
	}
	
	// Create glyphs
	for (var i = 0; i <= 3; i++) {
		
		// Select a random block from the array
		var random_block = getRndInteger(0, chos_blocks.length - 1);
		
		// Create the glyph
		var glyph = uni_char(chos_blocks[random_block].first, chos_blocks[random_block].last);
		
		// Apply rotation
		random_rotation[i] = getRndInteger(0, rotation);
		
		// SVG Text
		text[i] = draw.text(glyph)
		.font({
			family: document.getElementById('font_selection').value,
			size: 500,
			anchor: 'middle'
		})
		.transform({
			translateX: width/2,
			translateY: height/2 + height/3,
			rotate: random_rotation[i],
			scale: getRndFloat(0.5, scale)
		})
		.attr({
			class: 'texto_svg'
		});
		
		// SVG Group
		group[i] = draw.group()
		.attr({
			id: 'letra ' + i
		});
		
		// Add glyphs to group
		group[i].add(text[i]);
		
		// Canvas rects
		rect[i] = draw.rect(250, 250)
		.attr({
			x: pos_x,
			y: pos_y_clips,
		})
		.transform({
			rotate: random_rotation[i],
		})
		.attr({ fill: '#f06' });
		
		pos_x = pos_x + 250;
		
		if (pos_x > 250) {
			pos_x = 0;
			pos_y_clips = pos_y_clips + 250;
		}
		
		// Mask clip
		clip[i] = draw.clip().add(rect[i]);
		group[i].clipWith(clip[i]);
	}
	// Draw
	out = draw.svg();
}

// Sliders
function get_rotation_scale() {
	var rot = document.getElementById('rotation_graf').value;
	var scl = document.getElementById('scale_graf').value;
	return [rot, scl];
}

// Create glyphs and add to ZIP
function new_glyphz_zip(id) {
	var [rotation, scale] = get_rotation_scale();
	draw.clear();
	glyphz(rotation, scale);
	add_svg(id);
}

// Add to zip function
function add_svg(id) {
	zip.file('glyph' + (id + 1) + '.svg', out);
}

// Download zip function
function download_zip() {
	zip.generateAsync({
		type: "blob"
	})
	.then(function(blob) {
		saveAs(blob, "glyphz.zip");
	});
}

// GLYPHZ batch download function
function graf_batch(cantidad) {
	zip = new JSZip();
	for (var i = 0; i < cantidad; i++) {
		new_glyphz_zip(i);
	}
	download_zip();
}

// Batch download on click
const download = document.getElementById("download_button").addEventListener("click", function() {
	var amount = document.getElementById('amount_number').value;
	graf_batch(amount);
});

// New glyph on click
const new_glyph = document.getElementById("create_button").addEventListener("click", function() {
	var [rotation, scale] = get_rotation_scale();
	draw.clear();
	glyphz(rotation, scale);
});

// New glyph on slider change
const rotation_slider = document.getElementById("rotation_graf").addEventListener("input", function() {
	var [rotation, scale] = get_rotation_scale();
	draw.clear();
	glyphz(rotation, scale);
});

const scale_slider = document.getElementById("scale_graf").addEventListener("input", function() {
	var [rotation, scale] = get_rotation_scale();
	draw.clear();
	glyphz(rotation, scale);
});

// All good
window.onload = function() {
	console.log('GLYPHZ v0.4 by Bejuco. Running.');
};