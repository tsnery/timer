import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header'
import * as Styles from './styles'

export const DefaultLayout = () => {
  return (
    <Styles.LayoutContainer>
      <Header />
      <Outlet />
    </Styles.LayoutContainer>
  )
}
