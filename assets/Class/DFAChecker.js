/**
 * DFAChecker - A class for checking Whether the Given input is accepted or not With the help of Diagram.
 * @summary - This class takes in a parameter(constructor) of @class DFADrawer and with the help of its states[] and their link finds out the transition for each input.
 * @param {DFADrawer} drawer - DFADrawer obj
 *
 *
 * @author Suebsh Bhandari
 * @version 0.1
 */
class DFAChecker {

  /**
   * constructor
   *
   * @param {DFADrawer} drawer DFADrawer obj
   *
   * @return {null}
   */
  constructor(drawer) {
    this.drawer = drawer;
    this.string = '';
    this.current = {};
    this.interval = undefined;
    this.list = [];
    this.counter = 0;
  }

  /**
   * check - Description
   *
   * @param {String} string The string to check whether it is accepted or not
   *
   * @return {String} Accepted/Regected
   */
  check(string) {
    //stirng length
    let len = string.length;

    //Initial State
    let state = this.drawer.states.find((state) => {
      return state.isStart;
    });

    //append to list;
    this.list.push(state);
    //throws an error if there are no symbols in the given alphabet sets
    try {
      //Finding the transition for each input
      for (let i = 0; i < len; i++) {

       /**
        * state - Return state after transition from a input
        *
        * @param {type} link Description
        *
        * @return {type} Description
        */
        let linkTo = state.link.to.find((link) => {
          return link.input.find((item) => item === string[i]);
        });
        let link = linkTo.link;
        this.list.push(link);
        state = linkTo.state;
        this.list.push(state);

      }
        this.start();
    } catch (e) {
      console.log('No such Symbol');
      return "REJECED";
    }

    //return state.isFinal?"Accepted":"Rejected";
  }


  start() {
    this.interval = setInterval(this.transit,800,this);

  }

  transit(that) {

    if(that.counter < that.list.length) {
      console.log(that.list[0]);
      that.list[that.counter].color = {r:0,g:255,b:0};
      if(that.counter!=0)
      that.list[that.counter-1].color = {r:255,g:0,b:0};
      that.counter++;
      redraw();
    }
    else
      clearInterval(that.interval);
  }

}
