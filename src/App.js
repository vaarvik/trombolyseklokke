import { useState } from 'react';
import './App.css';
import Timer from './Timer';
import ProgressBar from './ProgressBar';

function App(){
  const steps = [
    {
      name: "Blodprøver",
      time: 120
    },
    {
      name: "Klinisk undersøkelse",
      time: 150
    },
    {
      name: "CT",
      time: 480
    },
    {
      name: "Trombolyse gitt",
      time: 150
    }
  ]

  const [currentStepTime, setCurrentStepTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
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
        <Timer isPaused={ status === "paused" } reset={reset} onReset={() => setReset(false)} onCount={(time) => setCurrentTime(time)} />
        <div className="Screen__main-content">
          <Timer isPaused={ status === "paused" } reset={nextReset || reset} onReset={() => {
            setNextReset(false);
            setReset(false);
          }
        } onCount={(time) => setCurrentStepTime(time)} />
          <ProgressBar time={currentStepTime} maxTime={steps[currentStep]?.time} />
        </div>
        <ProgressBar time={currentTime} maxTime={steps.reduce((time, step) => time += step.time, 0 )} isTop/>
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
