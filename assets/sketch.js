let vertices = [];

function setup() {
  let canvas = createCanvas(600, 400);
  noLoop();
}

function draw() {
  background(51);
  for (let i = 0; i < vertices.length; i++) {
    fill(255);
    stroke(255);
    ellipse(vertices[i].x, vertices[i].y, 16);
  }

  let unreached = vertices.slice();
  let reached = [];
  if (unreached.length) {
    let start = Math.floor(Math.random() * (unreached.length-1) );
    reached.push(unreached[start]);
    unreached.splice(start,1);
    console.log(start);

    while (unreached.length >  0) {
      let  record  = 100000;
      let u ,r;
      for(let i = 0; i < reached.length; i++) {

        for(let j = 0; j < unreached.length; j++) {
          let distance = reached[i].dist(unreached[j]);
          if(distance < record) {
            record = distance;
            u = j;
            r = i;
          }
        }

      }

      line(reached[r].x,reached[r].y,unreached[u].x,unreached[u].y);
      console.log(`${record} ${u} ${r}`);
      reached.push(unreached[u]);
      unreached.splice(u,1);
      //console.log();

    }
  }

}
  function mousePressed() {
    var v = createVector(mouseX, mouseY);
    vertices.push(v);
    redraw();
  }
