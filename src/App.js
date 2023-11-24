import { computeHeadingLevel } from '@testing-library/react';
import './App.css';
import { useState } from 'react';

function App() {
  let [modalState, setModalState] = useState([]);
  let [goals, setGoals] = useState([]);
  let [inp, setInp] = useState('');
  let [detailInp, setDetailInp] = useState('');

  const goalSetting = () => {
    if (inp.trim() !== '') {
      const newGoal = { text: inp, detail: detailInp, date: new Date() };
      setGoals([...goals, newGoal]);
      setInp('');
      setDetailInp('');
    }
  };

  const deleteAll=()=>{
    setGoals([])
  }

  const deleteOne =(index)=>{let copy=[...goals]; copy.splice(index,1); setGoals(copy)}


  return (
    <div className="App">
      <div className='nav'>
        <h4>못하면 걍 죽자</h4>
      </div>
      <div className='adder'>
        <h5>목표를 설정하세요</h5>
        <input value={inp} onChange={(e) => setInp(e.target.value)}
        placeholder='목표 입력' />
        <input
          value={detailInp}
          onChange={(e) => setDetailInp(e.target.value)}
          placeholder="상세 입력"
        />
        <div className='buttons'>
        <button id='goalSetting' onClick={goalSetting}>목표설정</button>
        <button id='deleteAll' onClick={deleteAll}>전체삭제</button>
        </div>
      </div>

      {goals.map(function (goal, index) {
        return (
          <div className='basic' key={index}>
            <h4>{goal.text}</h4>
            <p>작성일: {goal.date.toLocaleDateString()}</p>
            <p onClick={(e)=>{e.stopPropagation()}}><span onClick={() => {
              setModalState(prevState => ({
                ...prevState,
              [index]: !prevState[index]
              }));
            }}>상세 목표</span></p>
            <button className='deleteOne' onClick={()=>{deleteOne(index)}}>삭제</button>

            {modalState[index] ? <Modal goal={goal} key={index} /> : null}
          </div>
        );
      })}
    </div>
  );
}

let Modal = (props) => {
  return (
    <div>
      <h4>상세목표</h4>
      <p>{props.goal.detail}</p>
    </div>
  );
}

export default App;
