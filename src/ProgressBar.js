function ProgressBar( {time, maxTime, isTop} ){

  return (
    <div className={`ProgressBar ${isTop ? "is-top" : ""}`}>
      <div className="ProgressBar__inner" style={{width: `${(time / maxTime) * 100}%` }}></div>
    </div>
  );
}

export default ProgressBar;
