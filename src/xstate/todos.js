import { useActor } from "@xstate/vue";
import { createMachine, interpret } from "xstate";

/**
 * Add a todo item into the list
 */
const addTodo = ({ list }, { value }) => {
  list.push({
    value,
    completed: false
  });
};

/**
 * Remove a todo item from the list
 */
const removeTodo = ({ list }, { index }) => {
  list.splice(index, 1);
};

/**
 * Toggle the todo completed status
 */
const toggleCompleteTodo = ({ list }, { index }) => {
  list[index].completed = !list[index].completed;
};

export const todosMachine = createMachine(
  {
    id: 'todos',
    predictableActionArguments: true,

    context: {
      list: []
    },

    initial: 'active',

    states: {
      active: {
        on: {
          ADD_TODO: {
            actions: ["addTodo"]
          },

          REMOVE_TODO: {
            actions: ["removeTodo"]
          },

          TOGGLE_COMPLETE_TODO: {
            actions: ["toggleCompleteTodo"]
          }
        }
      }
    }
  },
  {
    actions: {
      addTodo,
      removeTodo,
      toggleCompleteTodo
    }
  }
);

// Export the service in order to reuse the machine instance across components
const service = interpret(todosMachine).start();

export const useTodosMachine = () => {
  return useActor(service);
};
