/**
 * NFATuples - An onject to denote NFA 5 tuples that is (state,alphabet,initial,final,transition).
 * @type {Object}
 * @member {Array} state
 * @member {Array} initial
 * @member {Array} final
 * @member {Array} alphabet
 * @member {Object} transition - object of {state : {input : state1}}
 *
 * @example
 * <code>
 * let NFATuples = {
 *  state: ['q0','q1'],
 *  initial : ['q0'],
 *  final : ['q1'],
 *  transition : {
 *    q0 : { 0 : ['q0'],1 : ['q1']},
 *    q1 : { 0 : ['q0'],1 : ['q1']},
 *  }
 * };
 * </code>
 *
 */
let NFATuples = {
  state : ['q0','q1','q2','q3'],
  initial : ['q0'],
  final : ['q0','q2','q3'],
  alphabet : ['a','b'],
  transition : {
    q0 : {
      a : ['q1'],

    },
    q1 : {
      b: ['q2']
    },
    q2: {
      a : ['q3']
    },
    q3 : {
      a:['q1'],
      b : ['q2']
    }
  }
};



/**
 *
 * @class NFA -  A class to implement NFA
 * @param {NFATuples} tuples - THe object of NFA Tuples.
 *
 */
class NFA {

  /**
   * constructor - Takes one Param
   * @param {NFATuples} tuples
   *
   */

  constructor(tuples) {
    this.tuples = tuples;
  }


  /**
   * ETF - Recursive definition of NFA (Extended Transition Function)
   *
   * @param {String} string - The string that has to be processed by the NFA
   *
   * @return {Array of States} states - returns the states after recursive transition
   */
  ETF(string) {
    let states = this.tuples.initial;
    let that = this;


    states.transition =

     /**
      * transition - A function to make the transition among set of transitions.
      *
      * @param {string} symbol - a symbol belonging to the alphabet set
      *
      * @return {Array} Array with set of state and with prototype transition.
      */
     symbol => {
       //A temp to store states
        let temp = [];
        //Transitioning each state
        states.forEach( state => {
          let statesTemp = this.tuples.transition[state][symbol];
          if(statesTemp) {
            statesTemp.forEach((item) => {
              temp.push(item);
            });
          }

        });
        temp.transition = states.transition;
        return temp;
    };


    console.log(states.transition('1'));
    console.log(states);
    let strLen = string.length;
    for(let i = 0;  i < strLen; i ++) {
       states = states.transition(string[i]);
    }
    return states;
  }



}
let nfa = new NFA(NFATuples);
console.log(nfa.ETF('101'));
