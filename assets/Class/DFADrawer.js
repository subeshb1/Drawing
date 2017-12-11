/**
 * @class - DFADrawer
 * makes a DFA Diagram using the
 * DFA Class combining its tuples with @class StateArc and @class StateCircle.
 * @author Subesh Bhandari
 * @version 0.1
 */
class DFADrawer {

  /**
   * constructor - Takes one param
   *
   * @param {DFA} dfa Must be of the @class DFA
   *
   */
  constructor(dfa) {
    /**
     * @member this.dfa - The DFA
     * @member this.states - Array of StateCircle
     * @member this.links - Arrat of StateArcs
     * @member this.children - childrens
     */
    this.dfa = dfa;
    this.states = [];
    this.links = [];
    this.children = [];
    //cathes error if dfa not defined
    try {
      this.createDiagram();
    } catch (e) {
      console.log("Unexpected error\n Dfa not defined " + e );
    }
  }


  /**
   * createDiagram - make a diagramatic view of the DFA tuples
   * @param {none} NONE no param
   * @return {null} no return
   */
  createDiagram() {
    //Check if dfa defined or not
    if (this.dfa) {

      //First - Make StateCircle
      this.createStateCircle();

      //Second identify start and final state
      this.createStart();
    //  this.createFinal();

      //Third - createLink (transitions)
      // this.createLink();
    } else {
      throw ("Subesh");
    }
  }

  /**
   * createStateCircle - Make StateCircles of the Dfa states.
   *
   * @return {null}  No return
   */
  createStateCircle() {
    //state points to dfa.state (for convinence)
    let states = this.dfa.state;

    //Initial state position
    let posX = 100;
    let posY = 100;

    //looping through each state
    states.forEach((state) => {
      //A new State Circle
      let stateCircle = new StateCircle(state, posX, posY);
      //Appending to states
      this.states.push(stateCircle);
      //Appending children so that they can be drawn
      this.children.push(stateCircle);

      //Incrementing the posX  by 300 so that they are 300 pixel away
      posX += 300;
    });
  }

  /**
   * createStart - Set the initial state with and arrow
   *
   * @return {undefined}
   */
  createStart() {
    //initial state (initial array length only 1)
    let initial = this.dfa.initial[0];

    //list of StateCircles
    let states = this.states;

    /**finding the initial State and applying isStart = true (done by @function StateCircle.setStart())
     * can only be one
     */
    states.find((state)=> {
      return state.stateName === initial;
    }).setStart();

  }

  createFinal() {
    //list of Final
    let final = this.dfa.final;

    final.forEach((state)=> {

    });

  }
  draw() {

  }


}
