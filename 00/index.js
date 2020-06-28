import { createMachine, interpret } from "xstate";

const feedbackMachine = createMachine({
  initial: 'question',
  states: {
    question: {
      on: {
        CLICK_GOOD: {
          target: 'thanks'
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

const feedbackService = interpret(feedbackMachine);

feedbackService.onTransition(state => {
  console.log(state.value);
});

feedbackService.start();

window.send = feedbackService.send;
