import React, {useContext} from 'react';
import {v4 as uuidV4} from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID =  "Uncategorized";

export function useBudgets(){
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {

    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expenses => expenses.budgetId === budgetId)
    }

    function addBudget({ name, max} ) {
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)) { //repeated id
                return prevBudgets
            }
            return [...prevBudgets, { id:uuidV4(), name, max }]
        })
    }
    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id:uuidV4(), description, amount, budgetId }]
        })
    }
    function deleteBudget({ id }) {
        //deal with expenses
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if(expense.budgetId !== id ) return expense
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
                //returns budget to uncategorized after deleting category
            })
            })
        setBudgets(prevBudgets=>{
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    function deleteExpense({ id }) {
        setExpenses(prevExpenses=>{
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}
    >
        {children}
    </BudgetsContext.Provider>;
}

