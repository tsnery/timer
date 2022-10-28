import { Routes as WrapperRoutes, Route } from 'react-router-dom'
import { DefaultLayout } from '../layouts/defaultLayout'
import { History } from '../pages/History'
import { Home } from '../pages/Home'

export const Routes = () => {
  return (
    <WrapperRoutes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Route>
    </WrapperRoutes>
  )
}
