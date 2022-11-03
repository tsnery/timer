import { useFormContext } from 'react-hook-form'
import { useCycles } from '../../contexts/cyclesContext'
import * as Styles from './styles'

export function NewCycleForm () {
  const { activeCycle } = useCycles()
  const { register } = useFormContext()

  return (
    <Styles.FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <Styles.TaskInput
        id="task"
        type="text"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <Styles.MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={1}
        min={5}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />
      <span>minutos.</span>
    </Styles.FormContainer>
  )
}
