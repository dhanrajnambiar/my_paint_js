var start = null;//mousedown pt coordinates
var stop = null;//mouseup pt coordinates
var shape = {'selected_shape':''};//shape selected value init

function master(){
    var board = document.getElementById("draw_area");
    var canvas = document.createElement("CANVAS");
    canvas.setAttribute('width','1200 px');
    canvas.setAttribute('height','600 px');
    canvas.setAttribute('id',"my_canv");
    canvas.style.border = "2px solid #000000";
    board.appendChild(canvas);
    document.getElementById("line").addEventListener("click",function(evt){shape.selected_shape = 'line';draw();});
    document.getElementById("rectangle").addEventListener("click",function(evt){shape.selected_shape = 'rectangle';draw();});
    document.getElementById("circle").addEventListener("click",function(evt){shape.selected_shape = 'circle';draw();});
}

function draw(){
    var cv = document.getElementById("my_canv");
    var ctx = cv.getContext("2d");
    cv.addEventListener("mousedown",function md(evt) {
        start = mouse_position(document.getElementById("my_canv"),evt);
    });
    cv.addEventListener("mouseup",function(evt){
        stop = mouse_position(document.getElementById("my_canv"),evt);
        // console.log(start);
        // console.log(stop);
        if (shape.selected_shape == 'line'){redraw_line(start,stop,ctx);}
        else if (shape.selected_shape == 'rectangle'){redraw_rect(start,stop,ctx);}
        else if (shape.selected_shape == 'circle'){redraw_circle(start,stop,ctx);}
        else{alert("no shape selected");}
        start = stop = null;
    });
    return;
}

function redraw_line(t1,t2,draw_ctx){
    draw_ctx.moveTo(t1.x,t1.y);
    draw_ctx.lineTo(t2.x,t2.y);
    draw_ctx.stroke();
}

function redraw_rect(t1,t2,draw_ctx){
    var rect_width = Math.abs(t2.x - t1.x);
    var rect_height = Math.abs(t2.y - t1.y);
    var lowest_x = (t1.x > t2.x) ? t2.x : t1.x ;
    var lowest_y = (t1.y > t2.y) ? t2.y : t1.y ;
    draw_ctx.strokeRect(lowest_x,lowest_y,rect_width,rect_height);
}

function redraw_circle(t1,t2,draw_ctx){
    var radius = Math.hypot((t2.x - t1.x),(t2.y - t1.y));
    draw_ctx.beginPath();
    draw_ctx.arc(t1.x,t1.y,radius,0, 2 * Math.PI);
    draw_ctx.stroke();
}

function mouse_position(canvas_el, evntt) {//canvas_el is the canvas element, evntt the MouseEvent
  var rect = canvas_el.getBoundingClientRect();
  return {x: evntt.clientX - rect.left, y: evntt.clientY - rect.top};
}
