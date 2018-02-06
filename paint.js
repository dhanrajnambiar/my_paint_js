var start = null;//mousedown pt coordinates
var stop = null;//mouseup pt coordinates
var shape = {'selected_shape':'','selected_color':'','selected_paint':'',};//shape & drawing color value init
var points = [];

window.onload = function master(){
//stage creation
    var stage = new Konva.Stage({
        container: 'draw_area', // id of container <div>
        width: 1250,
        height: 600
    });
//Base layer Creation
    var base_layer = new Konva.Layer({});
    var baserect = new Konva.Rect({x:1,y:1,width:stage.getWidth() - 2,height:stage.getHeight() - 2,stroke:'black'});
    base_layer.add(baserect);
    stage.add(base_layer)
//Color buttons addition
    document.getElementById("red").addEventListener("click",function(evt){shape.selected_color = 'Red';});
    document.getElementById("green").addEventListener("click",function(evt){shape.selected_color = 'Green';});
    document.getElementById("blue").addEventListener("click",function(evt){shape.selected_color = 'Blue';});
    document.getElementById("cyan").addEventListener("click",function(evt){shape.selected_color = 'cyan';});
    document.getElementById("yellow").addEventListener("click",function(evt){shape.selected_color = 'yellow';});
    document.getElementById("pink").addEventListener("click",function(evt){shape.selected_color = 'pink';});
    document.getElementById("deselect_color").addEventListener("click",function(evt){shape.selected_color = '';});
//Shape buttons addition
    document.getElementById("line").addEventListener("click",function(evt){shape.selected_shape = 'line';draw(stage);});
    document.getElementById("rectangle").addEventListener("click",function(evt){shape.selected_shape = 'rectangle';draw(stage);});
    document.getElementById("circle").addEventListener("click",function(evt){shape.selected_shape = 'circle';draw(stage);});
    document.getElementById("dot").addEventListener("click",function(evt){shape.selected_shape = 'dot';draw(stage);});
    document.getElementById("ellipse").addEventListener("click",function(evt){shape.selected_shape = 'ellipse';draw(stage);});
    //document.getElementById("polygon").addEventListener("click",function(evt){shape.selected_shape = 'polygon';poly(stage);});
    document.getElementById("deselect_shape").addEventListener("click",function(evt){shape.selected_shape = '';});
//Paint buttons addition
    document.getElementById("red_paint").addEventListener("click",function(evt){shape.selected_paint = "Red";});
    document.getElementById("green_paint").addEventListener("click",function(evt){shape.selected_paint = "Green";});
    document.getElementById("blue_paint").addEventListener("click",function(evt){shape.selected_paint = "Blue";});
    document.getElementById("cyan_paint").addEventListener("click",function(evt){shape.selected_paint = "Cyan";});
    document.getElementById("yellow_paint").addEventListener("click",function(evt){shape.selected_paint = "Yellow";});
    document.getElementById("pink_paint").addEventListener("click",function(evt){shape.selected_paint = "Pink";});
    document.getElementById("deselect_paint").addEventListener("click",function(evt){shape.selected_paint = "";});
}

function draw(stage_el){
    stage_el.on("mousedown", function(){
        start = this.getPointerPosition();
        if (shape.selected_shape == 'dot'){
          draw_dot(stage_el,start);
        }
    });
    stage_el.on("mouseup", function(){
        stop = this.getPointerPosition();
        if (shape.selected_shape == 'line'){redraw_line(stage_el,start,stop);}
        else if (shape.selected_shape == 'rectangle'){redraw_rect(stage_el,start,stop);}
        else if (shape.selected_shape == 'circle'){redraw_circle(stage_el,start,stop);}
        else if (shape.selected_shape == 'ellipse'){var x = prompt('What eccentricity yo need?(values between 0 and 1)');redraw_ellipse(stage_el,start,stop,x);}
    });
    start = stop = null;
}

function draw_dot(stage_el, pt){
    var layer = new Konva.Layer({});
    var dot = new Konva.Circle({
        x:pt.x,
        y:pt.y,
        radius:0.5,
        stroke:((shape.selected_color == '')?'black':shape.selected_color),
        fill:'black',
    });
    layer.add(dot);
    stage_el.add(layer);
    dot.on("wheel", function(evt){var x = prompt("do you want to delete it?");if (x == 'yes'){layer.destroy();}
    });
}

function redraw_line(stage_el,st,sp){
    var layer_name = new Konva.Layer({});
    var line = new Konva.Line({
      points:[st.x, st.y, sp.x, sp.y],
      stroke:((shape.selected_color == '')?'black':shape.selected_color),
    });
    layer_name.add(line);
    stage_el.add(layer_name);
    line.on("wheel", function(evt){var x = prompt("do you want to delete it?");if (x == 'yes'){layer_name.destroy();}
    });
}

function redraw_rect(stage_el,st,sp){
    console.log(shape.selected_paint);
    var layer = new Konva.Layer({});
    var rect = new Konva.Rect({
        width:Math.abs(sp.x - st.x),
        height:Math.abs(sp.y - st.y),
        x:(st.x > sp.x) ? sp.x : st.x,
        y:(st.y > sp.y) ? sp.y : st.y,
        stroke:((shape.selected_color == '')?'black':shape.selected_color),
        fill:((shape.selected_paint == '')?'white':shape.selected_paint),
    })
    layer.add(rect);
    stage_el.add(layer);
    rect.on("wheel", function(evt){var x = prompt("do you want to delete it?");if (x == 'yes'){layer.destroy();}
    });
}

function redraw_circle(stage_el,st,sp){
    var layer = new Konva.Layer({});
    var circle = new Konva.Circle({
      x:st.x,
      y:st.y,
      radius:Math.hypot((sp.x - st.x),(sp.y - st.y)),
      stroke:((shape.selected_color == '')?'black':shape.selected_color),
      fill:((shape.selected_paint == '')?'white':shape.selected_paint),
    });
    layer.add(circle);
    stage_el.add(layer);
    circle.on("wheel", function(evt){var x = prompt("do you want to delete it?");if (x == 'yes'){layer.destroy();}
    });
}

function redraw_ellipse(stage_el,st,sp,ecc){
    var x_rad = Math.hypot((sp.x - st.x),(sp.y - st.y));
    var y_rad = Math.hypot((sp.x - st.x),(sp.y - st.y)) * ecc;
    var layer = new Konva.Layer({});
    var ellipse = new Konva.Ellipse({
        x:st.x,
        y:st.y,
        radius:{
          x:x_rad,
          y:y_rad,
        },
        stroke:((shape.selected_color == '')?'black':shape.selected_color),
        fill:((shape.selected_paint == '')?'white':shape.selected_paint),
    });
    layer.add(ellipse);
    stage_el.add(layer);
    ellipse.on("wheel",function(evt){var x = prompt("do you want to delete it?");if (x == 'yes'){layer.destroy();}
    });
}
