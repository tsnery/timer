import * as Styles from './styles'

export const History = () => {
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Styles.Status statusColor='green'>Concluído</Styles.Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Styles.Status statusColor='yellow'>Em andamento</Styles.Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Styles.Status statusColor='red'>Interrompido</Styles.Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Styles.Status statusColor='green'>Concluído</Styles.Status>
              </td>
            </tr>
          </tbody>
        </table>
      </Styles.HistoryList>
    </Styles.HistoryContainer>
  )
}
