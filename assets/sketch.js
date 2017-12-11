

let selectObject;
var zoom = 1;
var zMin = 0.5;
var zMax = 9.00;
var sensativity = 0.00005;
let canZoom = true;
function setup() {
  let canvas = createCanvas(2000, 900);

  console.log(canvas);
  // let state = [];
  // let transition = [];
  // for(let i = 0;  i < 3; i++) {
  //   state[i] = new StateCircle(`q${i}`,50+i*300,200);
  // }
  // for(let i = 0;  i < 3; i++) {
  //   for(let j = 0;  j < 3; j++) {
  //     if(i < j)
  //       transition.push(new StateArc(state[i] ,state[j],"a"));
  //     else
  //       transition.push(new StateArc(state[i] ,state[j],"a",1));
  //   }
  // }
  // state[0].setStart();
  // state[2].setFinal();
  // transition.forEach((item) => {
  //   graphicsItem.item.push(item);
  // })
  // state.forEach((item) => {
  //   graphicsItem.item.push(item);
  // })

  //graphicsItem.item.push(b1, s1 ,s2,s3,s3,s4,s5,s6,s7,circle1,circle2,circle3,circle4,circle5,circle6);

//  console.log(subesh);
noLoop();
}

function draw() {
  // put drawing code here
  background(255);
  scale(zoom);
  //scale(0.5,0.5);
  graphicsItem.draw();


}


function touchStarted() {
if(touches.length) {
  console.log(touches);
  touchCache.push(
    {x:touches[touches.length-1].x,y:touches[touches.length-1].y}
  );
  console.log(touchCache);
}
console.log(mouseX+ " "+ mouseY);
console.log(mouseX*zoom+ " " +mouseY*zoom);
console.log(mouseX/zoom+ " " +mouseY/zoom);
   redraw();
}
function mouseMoved() {
  console.log('Sss');


}

function touchMoved(e) {

  if(touchCache.length === 2 && canZoom) {
    console.log('SDSDS');
    let d1 = dist(touchCache[0].x,touchCache[0].y,touchCache[1].x,touchCache[1].y);
    let d2 = dist(touches[0].x,touches[0].y,touches[1].x,touches[1].y)
    console.log(d1 + " " + d2);
    if(d1 > d2) {
      zoom -= 0.5;
      console.log("HEREWEW");
    } else {
      zoom += 0.5;
    }
    zoom = constrain(zoom, zMin, zMax);
    canZoom = false;
    redraw();
    //mouseReleased();
    toucheCache = [];
    return false;
  }
  // console.log('touch');
  if (!selectObject) {
    selectObject = graphicsItem.handleDrag(mouseX/zoom, mouseY/zoom);

  } else {
    //console.log('here');
    selectObject.setPos(mouseX/zoom, mouseY/zoom);

  }
   redraw();
  if(selectObject) {
    return false;
  }
}



function touchEnded() {
  //console.log('release');
  touchCache.pop();
  if (selectObject)
    selectObject = undefined;
    canZoom = true;
     redraw();
}

function mouseWheel(event) {
    console.log("what");
  zoom += sensativity * event.delta;
  console.log(event.delta);
  zoom = constrain(zoom, zMin, zMax);
   redraw();

  //uncomment to block page scrolling
  return false;
}



//Graphics Holder

let touchCache = [];
let graphicsItem = {
  item: [],
  draw: function() {
    this.item.forEach((my) => {
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
              //console.log("children");
              index2 = ind1;
              index = ind
              return false;

            } else
              return true;

          })) {

          return false;
        } else {
          //console.log("how");
        }

      }

      if (item.handleDrag && item.handleDrag(mouseX, mouseY)) {
        index = ind;
        return false;

      } else
        return true;


      return true;

    });

    //console.log(index2);
    if (index2 !== undefined)
      return this.item[index].children[index2];
    else if (index)
      return this.item[index];

  }



};






















// let s1 = new StateArc(circle1 ,circle2 ,"a");
// let s2 = new StateArc(circle2 ,circle1 ,"b",1);
// let s3 = new StateArc(circle1 ,circle3 ,['a','b']);
// let s4 = new StateArc(circle1 ,circle4 ,['a','b']);
// let s5 = new StateArc(circle1 ,circle5 ,"a");
// let s6 = new StateArc(circle1 ,circle6 ,['a','b']);
// let s7 = new StateArc(circle1 ,circle1 ,['a','b']);
// let b1 = new Bezier({
//   p0: {
//     x: 10,
//     y: 10,
//   },
//   p1: {
//     x: 100,
//     y: 10,
//   },
//   p2: {
//     x: 10,
//     y: 0,
//   },
//   p3: {
//     x: 10,
//     y: 0,
//   }
// });
