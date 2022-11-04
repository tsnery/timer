import { createContext, useContext, useReducer, useState } from 'react'

import { Cycle } from '../../../../entities/Cycle'
import { TCyclesContextProps, ICyclesProviderProps, ICreateCycleProps } from './types'

const CyclesContext = createContext({} as TCyclesContextProps)

export function CyclesProvider ({ children }: ICyclesProviderProps) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: 'FINISH_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    })
  }

  const interruptCycle = () => {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    })

    setActiveCycleId(null)
  }

  const createNewCyle = ({
    minutesAmount,
    task
  }: ICreateCycleProps) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      minutesAmount,
      startDate: new Date()
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })
    setActiveCycleId(newCycle.id)
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
