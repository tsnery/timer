import * as Styles from './styles'
import logo from '../../assets/logo.svg'
import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <Styles.HeaderContainer>
      <img src={logo} alt='' />
      <nav>
        <NavLink to="/" end title='Timer'>
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title='History'>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </Styles.HeaderContainer>
  )
}
