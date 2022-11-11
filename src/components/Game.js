import { useState } from "react";
import randomcolor from '../utils/randomColors';

const Game = ({ targetCount }) => {

  const totalCircles = Array(targetCount).fill(0).map((_, index) => ({
    id: index + 1,
    position: index,
    color: randomcolor(index, targetCount),
    show: true
  }));

  const [circles, setCircles] = useState(totalCircles)

  const [target, setTarget] = useState('');

  const [error, setError] = useState('');

  const handleShowInEmptyBox = (e) => {
    e.preventDefault();
    setError('');
    const inputTargert = Number(target);
    const visibleTargets = circles.filter(c => c.show);
    if (inputTargert > 0 && inputTargert <= visibleTargets.length) {
      const selectedTarget = visibleTargets[Number(target) - 1]
      const showCircleToEmptyBox = circles.map((circle) => circle.id === selectedTarget.id ? { ...circle, show: false } : circle)
      setCircles(showCircleToEmptyBox);
    } else {
      setError('You missed the target!');
    }
  }

  const handleRemoveCricle = (id) => {
    setError('');
    const removeCircleFromEmptyBox = circles.map((circle) => circle.id === Number(id) ? { ...circle, show: true } : circle)
    setCircles(removeCircleFromEmptyBox);
  }

  const remainingBalls = circles.filter(c => c.show);
  return <>
    <h1>Shoot the Balls</h1>
    <div className='main-box'>
      <div className='box'>
        <h2>Hits</h2>
        <div className='empty-box'>
          {circles?.filter((v) => v.show === false).map((circle) => {
            return <button
              key={circle.id}
              className='circle hits'
              data-testid={`hit-target-${circle.id}`}
              role="hit-target"
              style={{ background: `${circle.color}` }}
              onClick={() => handleRemoveCricle(circle.id)}
            ></button>
          })
          }
        </div>
      </div>

      {/* This is 5 circles box which contains the circles */}
      <div className='target-box'>
        <h3>{remainingBalls.length} Balls Remaining</h3>
        {circles?.filter((v) => v.show === true).map((circle) => {
          return <button
            key={circle.id}
            className='circle targets'
            role="target"
            data-testid={`target-${circle.id}`}
            style={{ background: `${circle.color}` }}
          ></button>
        })
        }
      </div>

      {/* This Box contains the input text which take number as input and shoot button */}
      <div className='controls-box'>
        <h3>Select Target</h3>
        <form onSubmit={handleShowInEmptyBox}>
          <input data-testid="target-input" type="number" value={target} placeholder="Enter number between 1 to 5" min="1" max={circles.length} className='input-box'
            onChange={(e) => setTarget(e.target.value)}
          />
          <button data-testid="shoot-button" className='btn' onClick={handleShowInEmptyBox}>Shoot</button>
          <span className="error">{error}</span>
        </form>
      </div>
    </div>
  </>
}

export default Game;