import React from 'react';
import './App.css';
import Clock from './components/Clock';


let testProp: string = "This is a test. This is only a test";
function App() {
  return (
    <div className="App">
      <Clock testProp={testProp} />
    </div>
  );
}

export default App;
