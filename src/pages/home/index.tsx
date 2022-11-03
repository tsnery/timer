import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { NewCycleForm } from './subComponents/newCycleForm'
import { Countdown } from './subComponents/countdown'
import { newCycleFormValidationSchema, TCreateCycleFormData } from './types'
import { useCycles } from './contexts/cyclesContext'
import * as Styles from './styles'

export function Home () {
  const { activeCycle, createNewCyle, interruptCycle } = useCycles()

  const newCycleForm = useForm<TCreateCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const handleCreateNewCycle = ({ minutesAmount, task }: TCreateCycleFormData) => {
    createNewCyle({ minutesAmount, task })
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled: boolean = !task

  return (
    <Styles.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm/>
          <Countdown/>
        </FormProvider>
        {activeCycle
          ? (
              <Styles.StopCountdownButton
                type="button"
                onClick={interruptCycle}
              >
                <HandPalm size={24} />
                Interromper
              </Styles.StopCountdownButton>
            )
          : (
              <Styles.StartCountdownButton
                type="submit"
                disabled={isSubmitDisabled}
              >
                <Play size={24} />
                Começar
              </Styles.StartCountdownButton>
            )}
      </form>
    </Styles.HomeContainer>
  )
}
