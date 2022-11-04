import { IAddNewCycleAction } from './reducer'

export enum CyclesActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE'
}

export const addNewCycleAction = (newCycle: IAddNewCycleAction) => {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle
    }
  }
}

export const interruptCycleAction = () => {
  return {
    type: CyclesActionTypes.INTERRUPT_CURRENT_CYCLE
  }
}

export const markCycleAsFinished = () => {
  return {
    type: CyclesActionTypes.FINISH_CURRENT_CYCLE
  }
}
