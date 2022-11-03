import { createContext, useContext, useState } from 'react'

import { Cycle } from '../../../../entities/Cycle'
import { TCyclesContextProps, ICyclesProviderProps, ICreateCycleProps } from './types'

const CyclesContext = createContext({} as TCyclesContextProps)

export function CyclesProvider ({ children }: ICyclesProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCurrentCycleAsFinished = () => {
    setCycles(cycles => cycles.map(cycle => {
      if (cycle.id === activeCycle?.id) {
        return { ...cycle, finishedDate: new Date() }
      } else {
        return cycle
      }
    }))
  }

  const interruptCycle = () => {
    setCycles((cycles) =>
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date()
          }
        } else {
          return cycle
        }
      })
    )

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

    setCycles((prevState) => [...prevState, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
  }

  const context: TCyclesContextProps = {
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
