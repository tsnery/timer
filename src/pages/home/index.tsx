import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as Styles from './styles'
import { newCycleFormValidationSchema, TCreateCycleFormData } from './types'

export const Home = () => {
  const { register, handleSubmit, watch } = useForm<TCreateCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const handleCreateNewCyle = (data: TCreateCycleFormData) => {
    console.log(data)
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
          <span>0</span>
          <span>0</span>
          <Styles.Separator>:</Styles.Separator>
          <span>0</span>
          <span>0</span>
        </Styles.CountdownContainer>
        <Styles.StartCountdownButton type='submit' disabled={isSubmitDisabled}>
          <Play size={24}/>
          Começar
        </Styles.StartCountdownButton>
      </form>
    </Styles.HomeContainer>
  )
}
