import { Cycle } from "./reducers"

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
    MARK_CURRENT_CYCLE = 'MARK_CURRENT_CYCLE'
}

export function addNewCycleAction(newCycle: Cycle){
    return {
            type: ActionTypes.ADD_NEW_CYCLE,
            payload: { newCycle, },
    }
}

export function markCurrentCycleAsFinishedAction() {
    return {
        type:  ActionTypes.MARK_CURRENT_CYCLE,
    }
}



export function interruptCurrentCycleAction() {
    return{
        type:  ActionTypes.INTERRUPT_CYCLE
    }
}