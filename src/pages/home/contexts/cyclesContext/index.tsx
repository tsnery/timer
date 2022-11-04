import { createContext, useContext, useReducer, useState } from 'react'

import { cyclesReducer, IAddNewCycleAction } from '../../reducers/cycles/reducer'
import { TCyclesContextProps, ICyclesProviderProps, ICreateCycleProps } from './types'
import {
  addNewCycleAction,
  interruptCycleAction,
  markCycleAsFinished
} from '../../reducers/cycles/actions'

const CyclesContext = createContext({} as TCyclesContextProps)

export function CyclesProvider ({ children }: ICyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCycleAsFinished())
  }

  const interruptCycle = () => {
    dispatch(interruptCycleAction())
  }

  const createNewCyle = ({
    minutesAmount,
    task
  }: ICreateCycleProps) => {
    const newCycle: IAddNewCycleAction = {
      id: String(new Date().getTime()),
      task,
      minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  const context: TCyclesContextProps = {
    cycles,
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
    interruptCycle,
    createNewCyle
  }

  return (
    <CyclesContext.Provider value={context}>
      {children}
    </CyclesContext.Provider>
  )
}

export const useCycles = () => {
  const context = useContext(CyclesContext)

  return context
}
