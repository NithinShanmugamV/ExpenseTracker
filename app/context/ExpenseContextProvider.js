import {
  React,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { UserContext } from "./UserContextProvider";
import { ExpenseReducer } from "../reducer/ExpenseReducer";
import isEqual from "lodash/isEqual";

export const ExpenseContext = createContext();

const ExpenseTrackerContextProvider = ({ children }) => {
  // const [todos, dispatch] = useReducer(TodoReducer, []);
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const initialState = {
    "2024-5": [
      {
        id: "1",
        name: "",
        type: "expense",
        account: "cash",
        category: "others",
        description: "",
        amount: 1500,
      },
      {
        id: "2",
        name: "",
        type: "expense",
        account: "cash",
        category: "shopping",
        description: "",
        amount: 5000,
      },
    ],
    "2024-4": [
      {
        id: "1",
        name: "",
        type: "expense",
        account: "cash",
        category: "bills",
        description: "",
        amount: 1500,
      },
      {
        id: "2",
        name: "",
        type: "expense",
        account: "cash",
        category: "food",
        description: "",
        amount: 5000,
      },
    ],
  };

  const [expense, expenseDispatch] = useReducer(ExpenseReducer, {});

  useEffect(() => {
    saveTodos = async () => {
      try {
        if (user) {
          const url = `https://jsonserver-eyex.onrender.com/data/${userData.id}`;
          console.log(url);
          fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData, expense: expense }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log("PUT request successful:", data);
            })
            .catch((error) => {
              console.error("Error:", error.message);
            });
        }
      } catch (err) {
        console.error("Error:", error.message);
      }
    };
    saveTodos();
  }, [expense, user]);

  return (
    <ExpenseContext.Provider
      value={{ expense, userData, user, setUserData, expenseDispatch }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseTrackerContextProvider;
