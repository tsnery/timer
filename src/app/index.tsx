import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from '../routes'
import { GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'

function App () {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export { App }
