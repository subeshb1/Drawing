

let DFA =
{
        state: ['q0','q1'],
        alphabet: ['0','1'],
        final: ['q1'],
        startState: 'q0',
        transition:
        {
            q0:
            {
                0: 'q0',
                1: 'q1',
            },
            q1:
            {
                0: 'q1',
                1: 'q0',
            }
        },
        extendedTransitionFunction: function(string)
        {
            let state = this.startState;
            let transition = this.transition;
            for(let i=0; i<string.length; i++)
                {
                    let input = string[i];
                    state = transition[state][input];
                    console.log(state);
                }
            return state;
        },

        check: function(string)
        {
            let count = 0;
            let final = this.final;
            let extendedTransition = this.extendedTransitionFunction(string);
            for(let i=0; i<final.length; i++)
                {
                    if(extendedTransition === final[i])
                    {
                        count++;
                    }
                }
            if(count > 0)
                {
                    document.write('Accepted');
                }
            else
                {
                    document.write('Rejected');
                }
        }
}
DFA.check('001110101');
