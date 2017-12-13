let selectObject;
var zoom = 0.4;
var zMin = 0.4;
var zMax = 9.00;
var sensativity = 0.00005;
let canZoom = true;
let drawer = new DFADrawer(subesh);
let main = [];
let mainString = [];
let color = [];
let flag = false;
function setup() {
  let canvas = createCanvas(2000, 900);
  canvas.parent('parent');

  let happy = [];

  for(let i =0; i < 5;i++) {
    let state = new StateCircle(`q${i}`,200+i*100,200);
    happy.push(state);


  }

  for(let i = 5; i < 9;i++) {
    console.log(i-5);
    link = new StateArc(happy[i - 5 ],happy[i - 5 +1],"");
    happy.push(link);

  }
  console.log(happy);
  for(let i =happy.length-1; i >=0;i--)
   graphicsItem.item.push(happy[i]);

   //Birthday
  let birthday = [];

  for(let i =0; i < 8;i++) {
    let state = new StateCircle(`q${i}`,100+i*100,400);
    birthday.push(state);


  }

  for(let i = 8; i < 8+7;i++) {
    console.log(i-5);
    link = new StateArc(birthday[i - 8 ],birthday[i - 8 +1],"");
    birthday.push(link);

  }
  console.log(birthday);
  for(let i =birthday.length-1; i >=0;i--)
   graphicsItem.item.push(birthday[i]);
   //Budu
  let budu = [];

  for(let i =0; i < 4;i++) {
    let state = new StateCircle(`q${i}`,250+i*100,600);
    budu.push(state);


  }

  for(let i = 4; i < 7;i++) {
    console.log(i);
    link = new StateArc(budu[i - 4 ],budu[i - 4 +1],"");
    budu.push(link);

  }
  console.log(budu);
  for(let i =budu.length-1; i >=0;i--)
   graphicsItem.item.push(budu[i]);
   let mainCounter = 0;
   let happyString = "HAPPY";
   for(let i = 0; i < happy.length; i++) {
     main[mainCounter] = happy[i];
     mainString[mainCounter] = happyString[i];
     color[mainCounter] = {r:242,g:240,b:103};
     mainCounter++;
   }
   let birthdayString = "BIRTHDAY";
   for(let i = 0; i < birthday.length; i++) {
     main[mainCounter] = birthday[i];
     mainString[mainCounter] = birthdayString[i];
     color[mainCounter] = {r:93, g:223, b:77};
     mainCounter++;


   }
   let buduString = "BUDU";
   for(let i = 0; i < budu.length; i++) {
     main[mainCounter] = budu[i];
     mainString[mainCounter] = buduString[i];
     color[mainCounter] = {r:242, g:103,b: 103};
     mainCounter++;

   }

// for(i =0;i<main.length;i++) {
//   main[i].stateName = mainString[i];
//   main[i].color = color[i];
//   main[i].fill = color[i];
// }




  noLoop();
}

function draw() {
  // put drawing code here
  background(255);
  scale(zoom);
  //scale(0.5,0.5);
  graphicsItem.draw();
if(flag) {
  for(let i = 0; i< 10 ;i ++)  {
  let sub = new Bezier( { p0: { x:400 , y: 900+i }, p1: { x: 400, y: 900-120-i, }, p2 : { x: 400+160-i, y: 900-100-i } , p3:{ x: 400+40, y: 900-180, }  },0);
  let sub1 = new Bezier( { p0: { x:400 , y: 900+i }, p1: { x: 400, y: 900-120-i, }, p2 : { x: 400-160+i, y: 900-100-i } , p3:{ x: 400-40, y: 900-180, }  },0);
  push()
  fill(100);
  sub1.color = {r:200,g:0,b:20};
  sub.color = {r:200,g:0,b:20};
  sub.draw();
  sub1.draw();
  pop()
}
}
}


function touchStarted() {
  if (touches.length) {
    //console.log(touches);
    touchCache.push({
      x: touches[touches.length - 1].x,
      y: touches[touches.length - 1].y
    });
    //console.log(touchCache);
  }
  //console.log(mouseX + " " + mouseY);
  //console.log(mouseX * zoom + " " + mouseY * zoom);
  //console.log(mouseX / zoom + " " +  mouseY / zoom);
  redraw();
}


function touchMoved(e) {

  if (touchCache.length === 2 ) {
    //console.log('SDSDS');
    let d1 = dist(touchCache[0].x, touchCache[0].y, touchCache[1].x, touchCache[1].y);
    let d2 = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y)
    //console.log(d1 + " " + d2);
    if (d1 > d2) {
      zoom -= 0.1;
      //console.log("HEREWEW");
    } else {
      zoom += 0.1;
    }
    zoom = constrain(zoom, zMin, zMax);
    canZoom = false;
    redraw();
    //mouseReleased();
    toucheCache = [];
    return false;
  }
  // //console.log('touch');
  if (!selectObject) {
    selectObject = graphicsItem.handleDrag(mouseX / zoom, mouseY / zoom);

  } else {
    ////console.log('here');
    selectObject.setPos(mouseX / zoom, mouseY / zoom);

  }
  redraw();
  if (selectObject) {
    return false;
  }
}



function touchEnded() {
  ////console.log('release');
  touchCache.pop();
  if (selectObject)
    selectObject = undefined;
  canZoom = true;
  redraw();
}

function mouseWheel(event) {
  if(event.ctrlKey) {
  //console.log("what");
  zoom += sensativity * event.delta;

  zoom = constrain(zoom, zMin, zMax);
  //console.log(zoom);
  redraw();

  //uncomment to block page scrolling
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
