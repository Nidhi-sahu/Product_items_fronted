import React from 'react'
import TableUi from './component/Tables'
import { Provider } from 'react-redux';
import store from './redux/Store'



function App() {
  return (
    <>
     <Provider store={store}>
    <TableUi/>
    </Provider>
    </>

  )
}

export default App