import { useEffect, useState } from 'react'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'

import * as Styles from './styles'
import { Cycle } from '../../entities/Cycle'
import { newCycleFormValidationSchema, TCreateCycleFormData } from './types'

export function Home () {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const { register, handleSubmit, watch, reset } = useForm<TCreateCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }
  }, [activeCycle])

  const totalInSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalInSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const handleCreateNewCyle = ({ minutesAmount, task }: TCreateCycleFormData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      minutesAmount,
      startDate: new Date()
    }

    setCycles(prevState => [...prevState, newCycle])
    setActiveCycleId(newCycle.id)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled: boolean = !task

  return (
    <Styles.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCyle)}>
        <Styles.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <Styles.TaskInput
            id='task'
            type="text"
            list="task-suggestions"
            placeholder='Dê um nome para o seu projeto'
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <Styles.MinutesAmountInput
            type="number"
            id='minutesAmount'
            placeholder='00'
            step={1}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </Styles.FormContainer>
        <Styles.CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Styles.Separator>:</Styles.Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </Styles.CountdownContainer>
        <Styles.StartCountdownButton type='submit' disabled={isSubmitDisabled}>
          <Play size={24}/>
          Começar
        </Styles.StartCountdownButton>
      </form>
    </Styles.HomeContainer>
  )
}
