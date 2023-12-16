// tagz web by Bejuco @ 2022

// MENU //
const pushbar = new Pushbar({
	blur:false,
	overlay:true,
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Adjustments //

const glyphs = ["J", "N", "G", "L", "V", "1", "B", "3", "S", "*", "!", ".", "'", ")"];
const fill_colors = ["#541388", "#D90368", "#F1E9DA", "#000000", "#FFD400"];
const stroke_colors = ["#000000"];
const shadow_colors = ["#000000"];

let canvas_size = 800;

let x_margin = 70;
let y_margin = 200;

let num_columns = 7;
let num_rows = 3;

let col_offset = 80;
let row_offset = 80;

let rot_min = -360;
let rot_max = 360;

let img;

let font;
let font_size = 350;
let font_size_min = 50;
let font_size_max = 50;

let stroke_weight_min = 2;
let stroke_weight_max = 4;

let shadow_offset_x = 5;
let shadow_offset_y = 5;

/////////////////

function preload() {
  font = loadFont('./js/data/MARSNEVENEKSK-Regular.otf');
  img = loadImage('./js/data/noise_1.png');
}

function setup() {
  var c = createCanvas(canvas_size, canvas_size);
  background(255);
  
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  
  drawTag();
  drawNoise();  
}

function keyPressed() {
  if (keyCode === 83) {
    console.log("Saved");
    saveCanvas('tag', 'jpg');
  }
}

function mousePressed() {
  clear();
  setup();
}

function drawTag() {
  for (let i = 1; i <= num_columns; i++) {
    for (let j = 1; j <= num_rows; j++) {
      push();
      drawingContext.shadowOffsetX = shadow_offset_x;
      drawingContext.shadowOffsetY = shadow_offset_y;
      drawingContext.shadowBlur = 0;
      drawingContext.shadowColor = shadow_colors[getRndInteger(0, shadow_colors.length - 1)];
      
      fill(fill_colors[getRndInteger(0, fill_colors.length - 1)]);
      
      strokeWeight(getRndInteger(stroke_weight_min, stroke_weight_max));
      stroke(stroke_colors[getRndInteger(0, stroke_colors.length - 1)]);
      
      translate((i * col_offset) + x_margin, (j * row_offset) + y_margin);
      rotate(getRndInteger(rot_min, rot_max));
      
      textFont(font, getRndInteger(font_size - font_size_min, font_size + font_size_max));
      text(glyphs[getRndInteger(0, glyphs.length - 1)], 0, 0);
      pop();
    }
  }
}

function drawNoise() {
  blendMode(LIGHTEST);
  image(img, 0, 0);
}

// All good
window.onload = function() {
	console.log('TAGZ WEB v0.1 by Bejuco. Running.');
};