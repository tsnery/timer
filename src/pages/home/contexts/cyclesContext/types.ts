import { ReactNode } from 'react'
import { Cycle } from '../../../../entities/Cycle'

export interface ICreateCycleProps {
  minutesAmount: number
  task: string
}

export interface TCyclesContextProps {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  interruptCycle: () => void
  createNewCycle: ({ minutesAmount, task }: ICreateCycleProps) => void
}

export interface ICyclesProviderProps {
  children: ReactNode
}
