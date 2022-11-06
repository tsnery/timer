import { createContext, useContext, useEffect, useReducer, useState } from 'react'

import { cyclesReducer, IAddNewCycleAction } from '../../pages/home/reducers/cycles/reducer'
import { TCyclesContextProps, ICyclesProviderProps, ICreateCycleProps } from './types'
import {
  addNewCycleAction,
  interruptCycleAction,
  markCycleAsFinished
} from '../../pages/home/reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

const CyclesContext = createContext({} as TCyclesContextProps)

export function CyclesProvider ({ children }: ICyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  }, () => {
    const storedStateAsJSON = localStorage.getItem('@timer:cycles-state-1.0.0')

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }
  })

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) return differenceInSeconds(new Date(), new Date(activeCycle.startDate))

    return 0
  })

  useEffect(() => {
    const cyclesStateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@timer:cycles-state-1.0.0', cyclesStateJSON)
  }, [cyclesState])

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCycleAsFinished())
  }

  const interruptCycle = () => {
    dispatch(interruptCycleAction())
  }

  const createNewCycle = ({
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
    createNewCycle
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
