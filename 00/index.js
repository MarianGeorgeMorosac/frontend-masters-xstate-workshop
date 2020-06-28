import { createMachine } from "xstate";

const someMachine = createMachine({
  initial: 'active',
  states: {
    active: {
      entry: ['enterActive', 'sendTelemetry'],
      on: {
        CLICK: {
          target: 'inactive',
          actions: 'clickActive'
        }
      },
      exit: 'exitActive'
    },
    inactive: {
      entry: 'enterInactive'
    }
  },
  actions:  {
    sendTelemetry: () => { /* ... */ },
    enterActive: () => {
      console.log('Entered active');
    },
    clickActive: () => {
      console.log('Clicked on active');
    },
    exitActive: () => {
      console.log('Exited active');
    },
    enterInactive: () => {
      console.log('Entered inactive');
    }
  }
});

const service = interpret(someMachine);

service.onTransition(state => {
  console.log(state.value);
});

service.start();

window.send = service.send;
