export const ExpenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      const { month, expense } = action.payload;
      console.log("red data: ", action.payload);
      if (state.hasOwnProperty(month)) {
        return {
          ...state,
          [month]: [
            ...state[month],
            {
              ...expense,
              id: state[month].length + 1,
            },
          ],
        };
      } else {
        const id = 1;
        return {
          ...state,
          [month]: [
            {
              ...expense,
              id,
            },
          ],
        };
      }

    case "FETCH_EXPENSE":
      state = action.payload;
      console.log("fetch reducer: ", state);
      return state;

    case "REMOVE_EXPENSE":
      const { monthYr, id } = action.payload;
      console.log("monthYr: ", monthYr);
      console.log(id);
      const updatedExpenses = state[monthYr].filter(
        (expense) => expense.id !== id
      );
      return {
        ...state,
        [monthYr]: updatedExpenses,
      };
    case "RESET":
      state = {};
      return state;
    default:
      return state;
  }
};
