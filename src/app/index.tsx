import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from '../routes'
import { GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'
import { CyclesProvider } from '../contexts/cyclesContext'

function App () {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesProvider>
          <Routes/>
        </CyclesProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export { App }
