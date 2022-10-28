import { Play } from 'phosphor-react'
import * as Styles from './styles'

export const Home = () => {
  return (
    <Styles.HomeContainer>
      <form>
        <Styles.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <Styles.TaskInput
            id='task'
            type="text"
            list="task-suggestions"
            placeholder='Dê um nome para o seu projeto'
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
            min={1}
            max={10}
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
        <Styles.StartCountdownButton type='submit'>
          <Play size={24}/>
          Começar
        </Styles.StartCountdownButton>
      </form>
    </Styles.HomeContainer>
  )
}
