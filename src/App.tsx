import { useState } from 'react';
import './App.css';
import { Dummy } from './Dummy';
import { useBoolean } from './hooks';

function App() {
  const [init] = useState(false);
  const [value, actions] = useBoolean(init);

  return (
    <>
      <div className='card'>
        <button onClick={() => actions.toggle()}>
          count is {value.toString()}
        </button>
        <br />
        <br />
        <br />

        <Dummy setTrue={actions.setTrue} />
      </div>
    </>
  );
}

export default App;
