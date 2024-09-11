import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducers";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";


interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    CreateNewCycle: (data: CreateCycleData) => void
    InterruptCycle: () => void
}

interface CyclesContextProviderProps {
    children: ReactNode
}



export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children, 
}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer,{
            cycles: [],
            activeCycleId: null,
        }, (initialstate) => {
            const storedStateAsJSON = localStorage.getItem('@lucas-timer:cycles-state-1.0.0')
       
            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON)
            }

           return {initialstate}
        })

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
            new Date(),
            new Date(activeCycle.startDate),
        )}
        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@lucas-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])
    
    function CreateNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))

        setAmountSecondsPassed(0)

    }

    function InterruptCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }


    function markCurrentCycleAsFinished() {

        dispatch(markCurrentCycleAsFinishedAction())

    }
    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                CreateNewCycle,
                InterruptCycle
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}