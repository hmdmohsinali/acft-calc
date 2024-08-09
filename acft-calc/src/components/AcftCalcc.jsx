import React, { useState, useEffect } from "react";
import testScore from "./testScore.json";
import { getAgeGroup, calculateDeadliftScore, calculatePowerThrowScore, calculatePushUpsScore, calculateRunScore, calculatePlankScore, calculateSprintDragCarryScore  } from "../utils/Helper";

const AcftCalcc = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(17);
  const [ageDisplay, setAgeDisplay] = useState("17");
  const [deadlift, setDeadlift] = useState(60);
  const [powerThrow, setPowerThrow] = useState(3.3);
  const [pushUps, setPushUps] = useState(0);
  const [sprintDragCarry, setSprintDragCarry] = useState({ minutes: 4, seconds: 48 });
  const [plank, setPlank] = useState({ minutes: 0, seconds: 48 });
  const [run, setRun] = useState({ minutes: 27, seconds: 0 });
  const [totalScore, setTotalScore] = useState(0);
  const [meetsExemptionCriteria, setMeetsExemptionCriteria] = useState(false);
  const [meetsMinimumStandard, setMeetsMinimumStandard] = useState(false);

  const deadliftScore = calculateDeadliftScore(gender, age, deadlift, testScore);
  const powerThrowScore = calculatePowerThrowScore(gender, age, powerThrow, testScore);
  const pushUpsScore = calculatePushUpsScore(gender, age, pushUps, testScore);
  const runScore = calculateRunScore(gender, age, run, testScore);
  const sprintDragCarryScore = calculateSprintDragCarryScore(gender, age, sprintDragCarry, testScore);
  const plankScore = calculatePlankScore(gender, age, plank, testScore);

  const calculateTotalScore = () => {
    const total = deadliftScore + powerThrowScore + pushUpsScore + sprintDragCarryScore + plankScore + runScore;
    const meetsMinimumStandard = deadliftScore >= 60 && powerThrowScore >= 60 && pushUpsScore >= 60 && sprintDragCarryScore >= 60 && plankScore >= 60 && runScore >= 60;
    const meetsExemptionCriteria = total >= 540 && deadliftScore >= 80 && powerThrowScore >= 80 && pushUpsScore >= 80 && sprintDragCarryScore >= 80 && plankScore >= 80 && runScore >= 80;
    return { total, meetsMinimumStandard, meetsExemptionCriteria };
  };

  const handleAgeChange = (value) => {
    if (value === "" || value < 0) {
      setAge(0);
      setAgeDisplay("0");
    } else {
      setAge(Number(value));
      setAgeDisplay(value);
    }
  };

  useEffect(() => {
    setAgeDisplay(String(age));
  }, [age]);
  

  useEffect(() => {
    const { total, meetsMinimumStandard, meetsExemptionCriteria } = calculateTotalScore();
    setTotalScore(total);
    setMeetsMinimumStandard(meetsMinimumStandard);
    setMeetsExemptionCriteria(meetsExemptionCriteria);
  }, [gender, age, deadlift, powerThrow, pushUps, sprintDragCarry, plank, run]);
  
  const handleNegativeCheck = (value, minValue) => {
    return value < minValue ? minValue : value;
  };
  const handleSliderChange = (e) => {
    const totalSeconds = 27 * 60 - Number(e.target.value);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    setRun({ minutes, seconds });
  };

  return (
    <div className="bg-gray-200 p-2 rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2 text-center">ACFT Score Calculator</h2>
  
      <div className="mb-2">
        <label htmlFor="gender" className="block font-medium">Gender</label>
        <select
          id="gender"
          className="w-full p-1 border rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">-Select Gender-</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
  
      <div className="mb-2">
        <label htmlFor="age" className="block font-medium">Age</label>
        <input
          id="age"
          type="number"
          className="w-full p-1 border rounded"
          value={ageDisplay}
          onChange={(e) => handleAgeChange(e.target.value)}
          min="0"
        />
      </div>
  
      <div className="mb-2">
        <label htmlFor="deadlift" className="block font-medium">Maximum Deadlift (lbs.)</label>
        <input
          id="deadlift"
          type="range"
          className="w-full h-4"
          min="60"
          max="340"
          step="10"
          value={deadlift}
          onChange={(e) => setDeadlift(Number(e.target.value))}
        />
        <input
          type="number"
          className="w-full p-1 border rounded mt-1"
          value={deadlift}
          onChange={(e) => setDeadlift(handleNegativeCheck(Number(e.target.value), 60))}
          min="60"
          max="340"
        />
        <div className="flex justify-between text-sm">
          <div>{deadlift} lbs.</div>
          <div>{deadliftScore} points</div>
        </div>
      </div>
  
      <div className="mb-2">
        <label htmlFor="powerThrow" className="block font-medium">Standing Power Throw (m)</label>
        <input
          id="powerThrow"
          type="range"
          className="w-full h-4"
          min="3.3"
          max="12.5"
          step="0.1"
          value={powerThrow}
          onChange={(e) => setPowerThrow(Number(e.target.value))}
        />
        <input
          type="number"
          className="w-full p-1 border rounded mt-1"
          value={powerThrow}
          onChange={(e) => setPowerThrow(handleNegativeCheck(Number(e.target.value), 3.3))}
          min="3.3"
          max="12.5"
        />
        <div className="flex justify-between text-sm">
          <div>{powerThrow} m</div>
          <div>{powerThrowScore} points</div>
        </div>
      </div>
  
      <div className="mb-2">
        <label htmlFor="pushUps" className="block font-medium">Hand-Release Push-Ups (reps)</label>
        <input
          id="pushUps"
          type="range"
          className="w-full h-4"
          min="0"
          max="100"
          step="1"
          value={pushUps}
          onChange={(e) => setPushUps(Number(e.target.value))}
        />
        <input
          type="number"
          className="w-full p-1 border rounded mt-1"
          value={pushUps}
          onChange={(e) => setPushUps(handleNegativeCheck(Number(e.target.value), 0))}
          min="0"
          max="100"
        />
        <div className="flex justify-between text-sm">
          <div>{pushUps} reps</div>
          <div>{pushUpsScore} points</div>
        </div>
      </div>
  
      <div className="mb-2">
        <label htmlFor="sprintDragCarry" className="block font-medium">Sprint Drag Carry (m:s)</label>
        <input
          id="sprintDragCarry"
          type="range"
          className="w-full h-4"
          min="0"
          max="201"
          step="1"
          value={4 * 60 + 48 - (sprintDragCarry.minutes * 60 + sprintDragCarry.seconds)}
          onChange={(e) => {
            const totalSeconds = Number(e.target.value);
            const newTotalSeconds = 4 * 60 + 48 - totalSeconds;
            const minutes = Math.floor(newTotalSeconds / 60);
            const seconds = newTotalSeconds % 60;
            setSprintDragCarry({ minutes, seconds });
          }}
        />
        <div className="flex justify-between mt-1 text-sm">
          <div>
            <input
              type="number"
              className="w-12 p-1 border rounded"
              value={sprintDragCarry.minutes}
              onChange={(e) => setSprintDragCarry({ ...sprintDragCarry, minutes: handleNegativeCheck(Number(e.target.value), 0) })}
              min="0"
              max="4"
            />
            <span>m</span>
          </div>
          <div>
            <input
              type="number"
              className="w-12 p-1 border rounded"
              value={sprintDragCarry.seconds}
              onChange={(e) => setSprintDragCarry({ ...sprintDragCarry, seconds: handleNegativeCheck(Number(e.target.value), 0) })}
              min="0"
              max="59"
            />
            <span>s</span>
          </div>
          <div className="font-semibold">{sprintDragCarryScore} points</div>
        </div>
      </div>
  
      <div className="mb-2">
        <label htmlFor="plank" className="block font-medium">Plank (m:s)</label>
        <input
          id="plank"
          type="range"
          className="w-full h-4"
          min="0"
          max="200"
          step="1"
          value={plank.minutes * 60 + plank.seconds}
          onChange={(e) => {
            const totalSeconds = Number(e.target.value);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            setPlank({ minutes, seconds });
          }}
        />
        <div className="flex justify-between mt-1 text-sm">
          <div>
            <input
              type="number"
              className="w-12 p-1 border rounded"
              value={plank.minutes}
              onChange={(e) => setPlank({ ...plank, minutes: handleNegativeCheck(Number(e.target.value), 0) })}
              min="0"
              max="3"
            />
            <span>m</span>
          </div>
          <div>
            <input
              type="number"
              className="w-12 p-1 border rounded"
              value={plank.seconds}
              onChange={(e) => setPlank({ ...plank, seconds: handleNegativeCheck(Number(e.target.value), 0) })}
              min="0"
              max={plank.minutes === 3 ? "40" : "59"}
            />
            <span>s</span>
          </div>
          <div className="font-semibold">{plankScore} points</div>
        </div>
      </div>
  
      <div className="mb-2">
        <label htmlFor="run" className="block font-medium">2 Mile Run (m:s)</label>
        <input
          id="run"
          type="range"
          className="w-full h-4"
          min="0"
          max={(27 * 60) - (13 * 60 + 22)}
          step="1"
          value={27 * 60 - (run.minutes * 60 + run.seconds)}
          onChange={handleSliderChange}
        />
        <div className="flex justify-between mt-1 text-sm">
          <div>
            <input
              type="number"
              className="w-12 p-1 border rounded"
              value={run.minutes}
              onChange={(e) => setRun({ ...run, minutes: handleNegativeCheck(Number(e.target.value), 13) })}
              min="13"
              max="27"
            />
            <span>m</span>
          </div>
          <div>
            <input
              type="number"
              className="w-12 p-1 border rounded"
              value={run.seconds}
              onChange={(e) => setRun({ ...run, seconds: handleNegativeCheck(Number(e.target.value), 0) })}
              min="0"
              max="59"
            />
            <span>s</span>
          </div>
          <div>{runScore} points</div>
        </div>
      </div>
  
      <div className="font-bold mt-2">Total Score: {totalScore}</div>
      <div className={`font-medium text-sm ${meetsMinimumStandard ? "text-green-500" : "text-red-500"}`}>
        Results: {meetsMinimumStandard ? "Meets Army minimum standard" : "Does not meet Army minimum standard"}
      </div>
      <div className="font-medium text-sm">
        {meetsExemptionCriteria ? "Exempt from body fat circumference-based tape assessment" : ""}
      </div>
    </div>
  );
  
  
};

export default AcftCalcc;
