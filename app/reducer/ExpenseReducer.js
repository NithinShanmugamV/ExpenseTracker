export const ExpenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      const { month, expense } = action.payload;
      console.log("red data: ", action.payload);

      // return {
      //   ...state,
      //   [month]: [
      //     ...state[month],
      //     {
      //       id,
      //       ...expense,
      //     },
      //   ],
      // };

      if (state.hasOwnProperty(month)) {
        // const id = (state[month].length + 1).toString();
        // Month exists, append the expense data
        return {
          ...state,
          [month]: [
            ...state[month],
            {
              ...expense,
              id : state[month].length + 1,
            },
          ],
        };
      } else {
        // Month doesn't exist, create a new entry
        const id = 1
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
    default:
      return state;
  }
};
