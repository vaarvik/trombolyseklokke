import { useEffect, useState } from 'react';

function Timer( { isPaused, reset, onReset, onCount = false } ) {
	const [time, setTime] = useState(0);
	const [intervalId, setIntervalId] = useState(null);

	const createInterval = () => {

		let intervalTime = 0;

		const interval = setInterval(() => {
			intervalTime++;
			if(reset) return setTime(0 + intervalTime);
			setTime(time + intervalTime);
		}, 1000);

		setIntervalId(interval);

		return interval;
	}

	useEffect(() => {
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		if(isPaused && intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);
		} else if(!isPaused && !intervalId) {
			createInterval();
		}

		if(reset) {
			setTime(0);

			if(intervalId && !isPaused) {
				clearInterval(intervalId);
				createInterval();
			}

			onReset();
		}

		if(onCount) onCount(time);
	});

  return (
    <div className="Timer">
		{Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60) }:{ time % 60 < 10 ? "0" + time % 60 : time % 60 }
    </div>
  );
}

export default Timer;
