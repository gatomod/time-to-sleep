import './index.css'

// componentes
import { Title } from './components/Title';
import { Main } from './components/Main';

export default function App() {
  return (
    <h1 className='flex flex-col w-full h-screen rounded-t-lg'>
      <Title />
      <Main />
    </h1>
  )
}