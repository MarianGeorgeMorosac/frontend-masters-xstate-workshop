import { createMachine } from "xstate";

const feedbackMachine = createMachine({
  initialState: 'question',
  states: {
    question: {
      on: {
        CLICK_GOOD: {
          // target: 'thanks'
          target: 'form'
        },
        CLICK_BAD: 'form',
      }
    },
    form: {
      on: {
        SUBMIT: 'thanks',
      }
    },
    thanks: {
      on: {
        CLOSE: 'closed',
      }
    },
    closed: {
      type: 'final',
    },
  }
});

console.log(feedbackMachine);

const elBox = document.querySelector('#box');

// Pure function that returns the next state,
// given the current state and sent event
function transition(state, event) {
  return machine.states[state]?.on?.[event] || state;
}

// Keep track of your current state
let currentState = machine.initialState;

function send(event) {
  currentState = transition(currentState, event);
  elBox.dataset.state = currentState;
}

elBox.addEventListener('click', () => {
  send('click');
});
