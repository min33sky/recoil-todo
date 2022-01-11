import React from 'react';
import { useRecoilState } from 'recoil';
import { hourState, minuteState } from '../atoms/timeAtom';

function TimeCalc() {
  const [minute, setMinute] = useRecoilState(minuteState);
  const [hour, setHour] = useRecoilState(hourState);

  const handleMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(+e.currentTarget.value);
  };

  const handleHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(+e.currentTarget.value);
  };

  return (
    <div>
      <p>계산기</p>
      <input type="number" value={minute} onChange={handleMinute} placeholder="Minute" />
      <input type="number" value={hour} onChange={handleHour} placeholder="Hour" />
    </div>
  );
}

export default TimeCalc;
