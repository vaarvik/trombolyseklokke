function ProgressBar( {time, maxTime} ){

  return (
    <div className="ProgressBar">
      <div className="ProgressBar__inner" style={{width: `${(time / maxTime) * 100}%` }}></div>
    </div>
  );
}

export default ProgressBar;
