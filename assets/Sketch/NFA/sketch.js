let selectObject;
var zoom = 0.4;
var zMin = 0.4;
var zMax = 9.00;
var sensativity = 0.00005;
let canZoom = true;


function setup() {
  let canvas = createCanvas(2000, 900);
  canvas.parent('parent');

  noLoop();
}

function draw() {
  // put drawing code here
  background(255);
  scale(zoom);


  // graphicsItem.draw();

}


function touchStarted() {
  if (touches.length) {

    touchCache.push({
      x: touches[touches.length - 1].x,
      y: touches[touches.length - 1].y
    });

  }

  redraw();
}


function touchMoved(e) {

  if (touchCache.length === 2) {

    let d1 = dist(touchCache[0].x, touchCache[0].y, touchCache[1].x, touchCache[1].y);
    let d2 = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y)

    if (d1 > d2) {
      zoom -= 0.1;

    } else {
      zoom += 0.1;
    }
    zoom = constrain(zoom, zMin, zMax);
    canZoom = false;
    redraw();

    toucheCache = [];
    return false;
  }

  if (!selectObject) {
    selectObject = graphicsItem.handleDrag(mouseX / zoom, mouseY / zoom);

  } else {

    selectObject.setPos(mouseX / zoom, mouseY / zoom);

  }
  redraw();
  if (selectObject) {
    return false;
  }
}



function touchEnded() {

  touchCache.pop();
  if (selectObject)
    selectObject = undefined;
  canZoom = true;
  redraw();
}

function mouseWheel(event) {
  if (event.ctrlKey) {

    zoom += sensativity * event.delta;

    zoom = constrain(zoom, zMin, zMax);

    redraw();


    return false;
  }
}



//Graphics Holder

let touchCache = [];
let graphicsItem = {
  item: [],
  draw: function() {
    this.item.forEach((my) => {

      console.log(my);
      if (my.children)
        my.children.forEach(item => item.draw());

      my.draw();
    });
  },



  handleDrag: function(mouseX, mouseY) {
    let index, index2;
    this.item.every((item, ind) => {
      if (item.children) {

        if (!item.children.every((item, ind1) => {

            if (item.handleDrag(mouseX, mouseY)) {
              ////console.log("children");
              index2 = ind1;
              index = ind
              return false;

            } else
              return true;

          })) {

          return false;
        } else {
          ////console.log("how");
        }

      }

      if (item.handleDrag && item.handleDrag(mouseX, mouseY)) {
        index = ind;
        return false;

      } else
        return true;


      return true;

    });

    ////console.log(index2);
    if (index2 !== undefined)
      return this.item[index].children[index2];
    else if (index)
      return this.item[index];

  }



};
