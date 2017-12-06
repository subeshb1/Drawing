let DFA = function () {
  this.state  = [];
  this.alphabet = [];
  this.final = [];
  this.initial = [];
  this.transition = [];
}

class DFAGenerator extends DFA{
  constructor(obj) {
    super();
    this.map(obj);
  }

  map(obj) {
    for(let a in obj) {
      this[a] = obj[a];
    }
  }

  ETF(string) {
    let state = this.initial;

    string.split('').forEach( (input) =>{
      let nextState = this.transition[state][input];
      console.log(`${state} -- ${input} --> ${nextState}`);
      state = nextState;

    });
    console.log(state);
    return state;
  }

  check(string)  {
    let lastState = this.ETF(string);
    if(this.final.find((state) => state === lastState))
      console.log("Accepted");
  }

}

let obj = {
  state: ["q0","q1","q2"],
  alphabet : ['0','1'],
  final : ['q2'],
  initial : ['q0'],
  transition : {
    q0 : {
      1 : 'q1',
      0 : 'q2'
    },
    q1 : {
      0 : 'q3',
      1 : 'q1'
    },
    q2 : {
      0 : 'q0',
      1 : 'q5'
    }
  }
}


let subesh = new DFAGenerator(obj);


console.log(subesh);
