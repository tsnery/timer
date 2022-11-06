import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Cycle } from '../../entities/Cycle'
import { useCycles } from '../../contexts/cyclesContext'
import * as Styles from './styles'

export const History = () => {
  const { cycles } = useCycles()

  const showStatusCycle = (cycle: Cycle) => {
    if (!cycle) return null

    const inProgress = !cycle.finishedDate && !cycle.interruptedDate
    const interrupted = !!cycle.interruptedDate
    const finished = !!cycle.finishedDate

    if (inProgress) {
      return <Styles.Status statusColor='yellow'>Em andamento</Styles.Status>
    }
    if (interrupted) {
      return <Styles.Status statusColor='red'>Interrompido</Styles.Status>
    }
    if (finished) {
      return <Styles.Status statusColor='green'>Concluído</Styles.Status>
    }
  }

  return (
    <Styles.HistoryContainer>
      <h1>Meu histórico</h1>
      <Styles.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles?.map(cycle => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{formatDistanceToNow(new Date(cycle.startDate), {
                  addSuffix: true,
                  locale: ptBR
                })}</td>
                <td>
                  {showStatusCycle(cycle)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Styles.HistoryList>
    </Styles.HistoryContainer>
  )
}
