import { useState } from 'react';
import './App.css';
import Timer from './Timer';
import ProgressBar from './ProgressBar';

function App(){
  const steps = [
    {
      name: "Steg 1",
      time: 120,
    },
    {
      name: "Steg 2",
      time: 120,
    },
    {
      name: "Steg 3",
      time: 120,
    },
    {
      name: "Steg 4",
      time: 120,
    },
    {
      name: "Steg 5",
      time: 120,
    },
  ]

  const [currentStepTime, setCurrentStepTime] = useState(0);
  const [status, setStatus] = useState("paused");
  const [reset, setReset] = useState(false);
  const [nextReset, setNextReset] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const pauseTime = () => {
    setReset(false);

    if(status === "paused") {
      setReset(true);
      setCurrentStep(0);
    }

    setStatus("paused");
  }

  const startTime = () => {
    setStatus("start");
  }

  const nextTime = () => {
    if(currentStep === steps.length - 1) return setStatus("paused");

    setNextReset(true);
    setCurrentStep(currentStep + 1);
  }

  return (
    <div className="App">
      <div className="Screen">
        <Timer isPaused={ status === "paused" } reset={reset} onReset={() => setReset(false)}  />
        <div className="Screen__main-content">
          <Timer isPaused={ status === "paused" } reset={nextReset || reset} onReset={() => {
              setNextReset(false);
              setReset(false);
            }
          } onCount={(time) => setCurrentStepTime(time)} />
          <ProgressBar time={currentStepTime} maxTime={steps[currentStep]?.time} />
        </div>
        <p className="Screen__step">
          Steg {currentStep + 1}: <span>{steps[currentStep]?.name}</span>
        </p>
      </div>
      <div className="ButtonGroup">
        <button className="Button" onClick={startTime}>
          Start
        </button>
        <button className="Button" onClick={nextTime}>
          Next
        </button>
        <button className="Button" onClick={pauseTime} >
          Pause/stop
        </button>
      </div>
    </div>
  );
}

export default App;
