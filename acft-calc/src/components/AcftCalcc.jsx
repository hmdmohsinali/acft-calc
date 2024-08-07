import React, { useState, useEffect } from "react";
import testScore from "./testScore.json";
import { getAgeGroup, calculateDeadliftScore, calculatePowerThrowScore, calculatePushUpsScore, calculateRunScore, calculatePlankScore, calculateSprintDragCarryScore  } from "../utils/Helper";

const AcftCalcc = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(17);
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
  

  useEffect(() => {
    const { total, meetsMinimumStandard, meetsExemptionCriteria } = calculateTotalScore();
    setTotalScore(total);
    setMeetsMinimumStandard(meetsMinimumStandard);
    setMeetsExemptionCriteria(meetsExemptionCriteria);
  }, [gender, age, deadlift, powerThrow, pushUps, sprintDragCarry, plank, run]);
  const handleNegativeCheck = (value, minValue) => {
    return value < minValue ? minValue : value;
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">ACFT Score Calculator</h2>

      <div className="mb-4">
        <label className="block font-medium">Gender</label>
        <select
          className="w-full p-2 border rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">-Select Gender-</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Age</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={age}
          onChange={(e) => setAge(handleNegativeCheck(Number(e.target.value), 0))}
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Maximum Deadlift (lbs.)</label>
        <input
          type="range"
          className="w-full h-6"
          min="60"
          max="340"
          step="10"
          value={deadlift}
          onChange={(e) => setDeadlift(Number(e.target.value))}
        />
        <input
          type="number"
          className="w-full p-2 border rounded mt-2"
          value={deadlift}
          onChange={(e) => setDeadlift(handleNegativeCheck(Number(e.target.value), 60))}
          min="60"
          max="340"
        />
        <div className="flex justify-between">
          <div>{deadlift} lbs.</div>
          <div>{deadliftScore} points</div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Standing Power Throw (m)</label>
        <input
          type="range"
          className="w-full h-6"
          min="3.3"
          max="12.5"
          step="0.1"
          value={powerThrow}
          onChange={(e) => setPowerThrow(Number(e.target.value))}
        />
        <input
          type="number"
          className="w-full p-2 border rounded mt-2"
          value={powerThrow}
          onChange={(e) => setPowerThrow(handleNegativeCheck(Number(e.target.value), 3.3))}
          min="3.3"
          max="12.5"
        />
        <div className="flex justify-between">
          <div>{powerThrow} m</div>
          <div>{powerThrowScore} points</div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Hand-Release Push-Ups (reps)</label>
        <input
          type="range"
          className="w-full h-6"
          min="0"
          max="100"
          step="1"
          value={pushUps}
          onChange={(e) => setPushUps(Number(e.target.value))}
        />
        <input
          type="number"
          className="w-full p-2 border rounded mt-2"
          value={pushUps}
          onChange={(e) => setPushUps(handleNegativeCheck(Number(e.target.value), 0))}
          min="0"
          max="100"
        />
        <div className="flex justify-between">
          <div>{pushUps} reps</div>
          <div>{pushUpsScore} points</div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Sprint Drag Carry (m:s)</label>
        <input
          type="range"
          className="w-full h-6"
          min="0"
          max="201" // total seconds from 4m 48s to 1m 27s
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
        <div className="flex justify-between mt-2">
          <div>
            <input
              type="number"
              className="w-16 p-2 border rounded"
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
              className="w-16 p-2 border rounded"
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

      <div className="mb-4">
        <label className="block font-medium">Plank (m:s)</label>
        <input
          type="range"
          className="w-full h-6"
          min="0"
          max="200" // 3 min 20 sec in total seconds
          step="1"
          value={plank.minutes * 60 + plank.seconds}
          onChange={(e) => {
            const totalSeconds = Number(e.target.value);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            setPlank({ minutes, seconds });
          }}
        />
        <div className="flex justify-between mt-2">
          <div>
            <input
              type="number"
              className="w-16 p-2 border rounded"
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
              className="w-16 p-2 border rounded"
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

      <div className="mb-4">
        <label className="block font-medium">2 Mile Run (m:s)</label>
        <input
          type="range"
          className="w-full h-6"
          min="0"
          max="14" // Difference between max (27) and min (13)
          step="1"
          value={27 - run.minutes} // Invert the range value
          onChange={(e) => setRun({ ...run, minutes: 27 - Number(e.target.value) })}
        />
        <input
          type="range"
          className="w-full h-6 mt-2"
          min="0"
          max="59"
          step="1"
          value={run.seconds}
          onChange={(e) => setRun({ ...run, seconds: Number(e.target.value) })}
        />
        <div className="flex justify-between mt-2">
          <div>
            <input
              type="number"
              className="w-16 p-2 border rounded"
              value={run.minutes}
              onChange={(e) => setRun({ ...run, minutes: handleNegativeCheck(Number(e.target.value), 0) })}
              min="13"
              max="27"
            />
            <span>m</span>
          </div>
          <div>
            <input
              type="number"
              className="w-16 p-2 border rounded"
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

      <div className="font-bold mt-4">Total Score: {totalScore}</div>
      <div
        className={`font-medium ${meetsMinimumStandard ? "text-green-500" : "text-red-500"}`}
      >
        Results: {meetsMinimumStandard ? "Meets Army minimum standard" : "Does not meet Army minimum standard"}
      </div>
      <div className="font-medium">
        {meetsExemptionCriteria ? "Exempt from body fat circumference-based tape assessment" : ""}
      </div>
    </div>
  );
};

export default AcftCalcc;
