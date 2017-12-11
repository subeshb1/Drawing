

class StateCircle {
  constructor(stateName,x,y) {
    this.stateName = stateName;
    this.center = {
      x:x,
      y:y
    }
    this.diameter = 80;
    this.isStart = false;
    this.isFinal = false;
    this.link = {to:[],from:[]};
  }
  addLinkTo(link) {
    this.link.to.push(link);
  }
  addLinkFrom(link) {
    this.link.from.push(link);
  }
  draw() {
    push();
    stroke(1);
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.center.x,this.center.y,this.diameter);
    pop();
    if(this.isFinal) {
      this.drawFinal();
    }
    if(this.isStart) {
      this.drawStart();
    }
    this.drawText();
  }

  drawStart() {
    push();
    stroke(1);
    fill(100);
    let p = {x : this.center.x - this.diameter/2,y: this.center.y};
    triangle(p.x,p.y,p.x-8,p.y-8,p.x-8,p.y+8);
    stroke(100);
    strokeWeight(3);
    line(p.x-8,p.y,p.x-50,p.y);
    pop();
  }

  drawFinal() {
    push();
    stroke(1);
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.center.x,this.center.y,this.diameter-10);
    pop();
  }
  drawText() {
    push();
    stroke(2);
    text(this.stateName,this.center.x - this.stateName.length,this.center.y +  this.stateName.length);
    pop();
  }
  handleDrag(mouseX,mouseY) {
    if(dist(mouseX,mouseY,this.center.x,this.center.y) < this.diameter/2) {
      this.dragedPoint = {x:this.center.x - mouseX,y: this.center.y - mouseY};
      this.center.x = mouseX + this.dragedPoint.x;
      this.center.y = mouseY+ this.dragedPoint.y;
      return true;
    } else
    return false;
  }
  setPos(x,y) {
    this.center.x = x + this.dragedPoint.x;
    this.center.y = y + this.dragedPoint.y;
  }

  addLink(state,a) {
    this.link.push({state : state,input : []})

  }

  setFinal() {
    this.isFinal = true;
  }
  setStart() {
    this.isStart = true;
  }

}


class StateConnector {
  constructor(state1,state2,input) {
    this.state1 = state1;
    this.state2 = state2;
    this.input = input;
  }

  draw() {

    line(this.state1.center.x,this.state1.center.y,this.state2.center.x,this.state2.center.y);

  }



}
