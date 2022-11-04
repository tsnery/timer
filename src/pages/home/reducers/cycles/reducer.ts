import { produce } from 'immer'
import { Cycle } from '../../../../entities/Cycle'
import { CyclesActionTypes } from './actions'

export interface IAddNewCycleAction {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export interface ICyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const cyclesReducer = (state: ICyclesState, action: any) => {
  switch (action.type) {
    case CyclesActionTypes.ADD_NEW_CYCLE:
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case CyclesActionTypes.INTERRUPT_CURRENT_CYCLE: {
      return produce(state, draft => {
        const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

        if (currentCycleIndex < 0) return state

        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    case CyclesActionTypes.FINISH_CURRENT_CYCLE: {
      return produce(state, draft => {
        const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

        if (currentCycleIndex < 0) return state

        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
