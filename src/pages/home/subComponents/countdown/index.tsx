import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'

import { useCycles } from '../../contexts/cyclesContext'
import * as Styles from './styles'

export function Countdown () {
  const {
    markCurrentCycleAsFinished,
    activeCycleId,
    amountSecondsPassed,
    setSecondsPassed,
    activeCycle
  } = useCycles()

  const totalInSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const activeCycleTimeInSeconds = differenceInSeconds(new Date(), activeCycle.startDate)
        if (activeCycleTimeInSeconds >= totalInSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalInSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(activeCycleTimeInSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalInSeconds, activeCycleId, markCurrentCycleAsFinished])

  const currentSeconds = activeCycle ? totalInSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Novo ciclo'
    }
  }, [minutes, seconds, activeCycle])

  return (
    <Styles.CountdownContainer>
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>
    <Styles.Separator>:</Styles.Separator>
    <span>{seconds[0]}</span>
    <span>{seconds[1]}</span>
  </Styles.CountdownContainer>
  )
}
