/**
* TAGZ PROCESSING v0.2
* BEJUCO @ 2019
 
* Instrucciones:
*   - Establecer los colores iniciales usando los códigos de color hexadecimal (ej: #FFFFFF) [línea 41].
*   - Quitar el comentario de las letras que quiera utilizar (debajo de pool.autoAddToStage()
*     dentro de la función wildstyle() [linea 71]).
*   - Al iniciar la aplicación podrá generar nuevas composiciones haciendo click en el botón GO!
*     y podrá guardar la composición haciendo click en el botón Guardar.
*   - Puede usar los sliders para manipular las variables, escoger la fuente en la lista y cambiar los
*     colores introduciendo los códigos de color en los recuadros de la parte de abajo (UNO POR UNO!)
**/

import hype.*;
import hype.extended.colorist.HColorPool;
import hype.extended.layout.HGridLayout;
import processing.pdf.*;
import controlP5.*;
import java.util.*;

HDrawablePool pool;
HGridLayout layout;
HColorPool colores;
ControlP5 cp5;

int canvas_w = 1600;
int canvas_h = 900;

int espaciado_x = 50;
int espaciado_y = 40;
int num_columnas = 15;

int inicio_x = canvas_w/2 - (num_columnas * (espaciado_x/2));
float inicio_y = canvas_h/3;

String fuente = "MagikMarker.otf";
int tam_letra = 15;
int cantidad_letras = 80;

String color1 = "ffff66";
String color2 = "ccff33";
String color3 = "99e699";
String color4 = "000000";

void settings() {
  size(canvas_w, canvas_h);
}

void setup() {
  H.init(this).background(#FFFFFF); 
  wildstyle();
  controles();
  println("JNGL v0.2 | DRLZTN @ 2019");
}

void wildstyle() {
  layout = new HGridLayout()
    .startX(inicio_x)
    .startY(inicio_y)
    .spacing(espaciado_x, espaciado_y)
    .cols(num_columnas)
  ;

  colores = new HColorPool(unhex("FF" + color1), unhex("FF" + color2), unhex("FF" + color3), unhex("FF" + color4));
  PFont type = createFont(fuente, 1);

  //Letras que serán utilizadas.
  //Quitar el comentario para que se vean en el canvas o comentar para que no se vean.
  pool = new HDrawablePool(cantidad_letras);
  pool.autoAddToStage()
    .add(new HText("a", tam_letra, type))
    //.add(new HText("b", tam_letra, type))
    //.add(new HText("c", tam_letra, type))
    //.add(new HText("d", tam_letra, type))
    //.add(new HText("e", tam_letra, type))
    //.add(new HText("f", tam_letra, type))
    //.add(new HText("g", tam_letra, type))
    //.add(new HText("h", tam_letra, type))
    //.add(new HText("i", tam_letra, type))
    //.add(new HText("j", tam_letra, type))
    //.add(new HText("k", tam_letra, type))
    //.add(new HText("l", tam_letra, type))
    //.add(new HText("m", tam_letra, type))
    //.add(new HText("n", tam_letra, type))
    //.add(new HText("Ñ", tam_letra, type))
    //.add(new HText("o", tam_letra, type))
    //.add(new HText("p", tam_letra, type))
    //.add(new HText("q", tam_letra, type))
    //.add(new HText("r", tam_letra, type))
    //.add(new HText("s", tam_letra, type))
    //.add(new HText("t", tam_letra, type))
    //.add(new HText("u", tam_letra, type))
    //.add(new HText("v", tam_letra, type))
    //.add(new HText("w", tam_letra, type))
    //.add(new HText("x", tam_letra, type))
    //.add(new HText("y", tam_letra, type))
    //.add(new HText("z", tam_letra, type))

    .add(new HText("0", tam_letra, type))
    //.add(new HText("1", tam_letra, type))
    //.add(new HText("2", tam_letra, type))
    //.add(new HText("3", tam_letra, type))
    //.add(new HText("4", tam_letra, type))
    //.add(new HText("5", tam_letra, type))
    //.add(new HText("6", tam_letra, type))
    //.add(new HText("7", tam_letra, type))
    //.add(new HText("8", tam_letra, type))
    //.add(new HText("9", tam_letra, type))

    .add(new HText("*", tam_letra, type))
    //.add(new HText("@", tam_letra, type))
    //.add(new HText("&", tam_letra, type))
    //.add(new HText("(", tam_letra, type))
    //.add(new HText(")", tam_letra, type))
    //.add(new HText(".", tam_letra, type))
    //.add(new HText("<", tam_letra, type))
    //.add(new HText(">", tam_letra, type))
    //.add(new HText("'", tam_letra, type))

    .layout(layout)
    .onCreate(
      new HCallback() {
        public void run(Object obj) {
          HText t = (HText) obj;
          t
            .fill(colores.getColor())
            .scale(((int)random(tam_letra - 7, tam_letra)*2))
            .anchorAt(H.CENTER)
            .rotation(random(360))
          ;
        }
      }
    )
    .shuffleRequestAll()
  ;
}

void controles() {  
  cp5 = new ControlP5(this);

  String[][] bangs = {  {"reset",     "GO",       "b4b4b4"},
                        {"save_pdf",  "GUARDAR",  "80ff00"}
                      };

  String[][] sliders = {  {"num_columnas",    "5",  "20",   "# COLUMNAS"},
                          {"espaciado_x",     "40", "80",   "Espaciado X"},
                          {"espaciado_y",     "20", "80",   "Espaciado Y"},
                          {"tam_letra",       "10", "20",   "Tam Letra"},
                          {"cantidad_letras", "0",  "150",  "# Letras"}
                        };

  List l = Arrays.asList( "MagikMarker.otf",
                          "MARSNEVENEKSK-Clean.ttf",
                          "MARSNEVENEKSK-Regular.ttf",
                          "Mourier.otf",
                          "Pilowlava-Regular.otf",
                          "RapScript.otf",
                          "RaseBasic.otf",
                          "Scrawler_3rd.otf",
                          "WildBasic.otf"
                          );

  for (int i = 0; i < bangs.length; ++i) {
    cp5.addBang(bangs[i][0])
      .setPosition((i*30 + 20) + i*20, 10)
      .setSize(30, 30)
      .setTriggerEvent(Bang.RELEASE)
      .setLabel(bangs[i][1])
      .setColorForeground(0)
      .setColorActive(unhex("FF" + bangs[i][2])) 
      .setColorLabel(0)
    ;
  }

  for (int i = 0; i < sliders.length; ++i) {
    cp5.addSlider(sliders[i][0])
    .setPosition(20, ((i+1)*30 + 40) + i*10)
    .setSize(150, 20)
    .setRange(int(sliders[i][1]), int(sliders[i][2]))
    .setLabel(sliders[i][3])
    .setColorBackground(0)
    .setColorForeground(color(100))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;
  }

  for (int i = 0; i < 4; ++i) {
    cp5.addTextfield("color" + (i+1))
    .setPosition((i*30 + 20) + i*30, canvas_h - 60)
    .setSize(50, 30)
    .setAutoClear(true)
    .setLabel("Color " + (i+1))
    .setColorBackground(0)
    .setColorForeground(color(0))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;
  }

  cp5.addScrollableList("fuentes")
    .setPosition(20, 270)
    .setSize(150, 200)
    .setBarHeight(20)
    .setItemHeight(20)
    .setColorBackground(0)
    .setColorForeground(color(100))
    .setColorActive(color(180))
    .addItems(l)
    .close()
  ;
}

public void fuentes(int n) {
  fuente = cp5.get(ScrollableList.class, "fuentes").getItem(n).get("name").toString();
}

public void reset() {
  pool.drain();  
  wildstyle();  
  println("Nuevo TAG");
}

public void save_pdf() {
  int d = day();
  int m = month();
  int y = year();
  int s = second();
  int mi = minute();
  int h = hour();

  PGraphics vectores = null;
  vectores = beginRecord(PDF, d + "_" + m + "_" + y + "_" + h + mi + s + ".pdf");

  if (vectores==null) {
    H.drawStage();
  } else {
    H.stage().paintAll(vectores, false, 1);
  }  

  endRecord();
  println("Guardado como " + d + "_" + m + "_" + y + "_" + h + mi + s + ".pdf");
}

void draw() {
  H.drawStage();
}
