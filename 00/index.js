import { createMachine } from 'xstate';

const elOutput = document.querySelector('#output');

function output(object) {
  elOutput.innerHTML = JSON.stringify(object, null, 2);
}

console.log('Welcome to the XState workshop!');

const user = {
  name: 'David Khourshid',
  company: 'Microsoft',
  interests: ['piano', 'state machines'],
};

output(user);

const elButton = document.querySelector('#button');

elButton.addEventListener('click', () => {
  console.log('I am clicked!');
})

const machine = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: 'pending'
      }
    },
    pending: {
      on: {
        RESOLVE: 'resolved',
        REJECT: 'rejected'
      }
    },
    resolved: {},
    rejected: {}
  }
}

const transition = (state, event) => {
  return machine.states[state]?.on?.[event] || state;
}

let currentState = machine.initial;

const send = event => {
  const nextState = transition(currentState, event);

  console.log(nextState);

  currentState = nextState;
}

window.send = send;

send("CLICK");
// output(transition('pending', 'RESOLVE'))
