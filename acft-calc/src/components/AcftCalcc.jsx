import React, { useState, useEffect } from "react";
import testScore from "./testScore.json";

const AcftCalcc = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(17);
  const [deadlift, setDeadlift] = useState(60);
  const [powerThrow, setPowerThrow] = useState(3.3);
  const [pushUps, setPushUps] = useState(0);
  const [sprintDragCarry, setSprintDragCarry] = useState({
    minutes: 4,
    seconds: 48,
  });
  const [plank, setPlank] = useState({ minutes: 0, seconds: 48 });
  const [run, setRun] = useState({ minutes: 27, seconds: 0 });
  const [totalScore, setTotalScore] = useState(0);
  const [meetsExemptionCriteria, setMeetsExemptionCriteria] = useState(false);

  const getAgeGroup = (age) => {
    if (age >= 17 && age <= 21) return "17-21";
    if (age >= 22 && age <= 26) return "22-26";
    if (age >= 27 && age <= 31) return "27-31";
    if (age >= 32 && age <= 36) return "32-36";
    if (age >= 37 && age <= 41) return "37-41";
    if (age >= 42 && age <= 46) return "42-46";
    if (age >= 47 && age <= 51) return "47-51";
    if (age >= 52 && age <= 56) return "52-56";
    if (age >= 57 && age <= 61) return "57-61";
    return "62+";
  };

  const calculateDeadliftScore = () => {
    if (!gender || !testScore[gender]) {
      return 0;
    }
    const ageGroup = getAgeGroup(age);
    const deadliftScores = testScore[gender]["max-dead-lift"];
    let score = 0;

    for (let weight in deadliftScores) {
      if (deadlift >= weight) {
        score = deadliftScores[weight][0][ageGroup];
      }
    }
    return score || 0;
  };

  const calculatePowerThrowScore = () => {
    if (!gender || !testScore[gender]) {
      return 0; // Return 0 or an appropriate default value when gender is not selected
    }

    const ageGroup = getAgeGroup(age);
    const powerThrowScores = testScore[gender]["standing-power-throw"];
    let score = 0;

    // Convert powerThrow to a whole number for comparison
    const roundedPowerThrow = Math.floor(powerThrow * 10); // Multiplying by 10 to work with whole numbers (e.g., 8.7 -> 87)

    // Find the nearest power throw distance in the JSON data
    for (let distance in powerThrowScores) {
      if (roundedPowerThrow >= distance) {
        score = powerThrowScores[distance][0][ageGroup];
      } else {
        break; // Break out of the loop once the next distance is higher than the roundedPowerThrow
      }
    }

    return score || 0;
  };

  const calculatePushUpsScore = () => {
    if (!gender || !testScore[gender]) {
      return 0;
    }
    const ageGroup = getAgeGroup(age);
    const pushUpScores = testScore[gender]["hand-release-push-ups"];
    let score = 0;

    for (let reps in pushUpScores) {
      if (pushUps >= reps) {
        score = pushUpScores[reps][0][ageGroup];
      }
    }
    return score || 0;
  };

  const calculateSprintDragCarryScore = () => {
    if (!gender || !testScore[gender]) {
      return 0;
    }
    const ageGroup = getAgeGroup(age);
    const sprintDragCarryScores = testScore[gender]["sprint-drag-carry"];
    let score = 0;

    const totalSeconds = sprintDragCarry.minutes * 60 + sprintDragCarry.seconds;

    for (let time in sprintDragCarryScores) {
      const minutes = Number(time.slice(0, 2)); // Extracting minutes from the string
      const seconds = Number(time.slice(2, 4)); // Extracting seconds from the string
      const timeInSeconds = minutes * 60 + seconds;

      if (totalSeconds <= timeInSeconds) {
        score = sprintDragCarryScores[time][0][ageGroup];
        break; // Stop at the closest matching or lesser time
      }
    }
    return score || 0;
  };

  const calculatePlankScore = () => {
    if (!gender || !testScore[gender]) {
      return 0;
    }
    const ageGroup = getAgeGroup(age);
    const plankScores = testScore[gender]["plank"];
    let score = 0;

    const totalSeconds = plank.minutes * 60 + plank.seconds;

    for (let time in plankScores) {
      // Convert time string to total seconds
      const minutes = parseInt(time.substring(0, 2));
      const seconds = parseInt(time.substring(2, 4));
      const timeInSeconds = minutes * 60 + seconds;

      if (totalSeconds >= timeInSeconds) {
        score = plankScores[time][0][ageGroup];
      }
    }
    return score || 0;
  };

  const calculateRunScore = () => {
    if (!gender || !testScore[gender]) {
      return 0;
    }
    const ageGroup = getAgeGroup(age);
    const runScores = testScore[gender]["two-mile-run"];
    let score = 0;

    const totalSeconds = run.minutes * 60 + run.seconds;

    // Iterate over runScores in descending order of time
    const timeKeys = Object.keys(runScores).sort((a, b) => b - a); // Sort times in descending order

    for (let time of timeKeys) {
      const minutes = parseInt(time.substring(0, 2));
      const seconds = parseInt(time.substring(2, 4));
      const timeInSeconds = minutes * 60 + seconds;

      // Scores increase as times decrease
      if (totalSeconds <= timeInSeconds) {
        score = runScores[time][0][ageGroup];
      }
    }
    return score || 0;
  };

  const calculateTotalScore = () => {
    const deadliftScore = calculateDeadliftScore();
    const powerThrowScore = calculatePowerThrowScore();
    const pushUpsScore = calculatePushUpsScore();
    const sprintDragCarryScore = calculateSprintDragCarryScore();
    const plankScore = calculatePlankScore();
    const runScore = calculateRunScore();

    const total =
      deadliftScore +
      powerThrowScore +
      pushUpsScore +
      sprintDragCarryScore +
      plankScore +
      runScore;

    // Check if all scores meet the minimum standard of 60
    const meetsMinimumStandard =
      deadliftScore >= 60 &&
      powerThrowScore >= 60 &&
      pushUpsScore >= 60 &&
      sprintDragCarryScore >= 60 &&
      plankScore >= 60 &&
      runScore >= 60;

    // Check for exemption criteria
    const meetsExemptionCriteria =
      total >= 540 &&
      deadliftScore >= 80 &&
      powerThrowScore >= 80 &&
      pushUpsScore >= 80 &&
      sprintDragCarryScore >= 80 &&
      plankScore >= 80 &&
      runScore >= 80;

    return { total, meetsMinimumStandard, meetsExemptionCriteria };
  };
  const { total, meetsMinimumStandard } = calculateTotalScore();
  useEffect(() => {
    const { total, meetsExemptionCriteria } = calculateTotalScore();
    setTotalScore(total);
    setMeetsExemptionCriteria(meetsExemptionCriteria);
  }, [gender, age, deadlift, powerThrow, pushUps, sprintDragCarry, plank, run]);

  return (
    <div className="bg-gray-200 p-4 rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">ACFT Score Calculator</h2>

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
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Maximum Deadlift (lbs.)</label>
        <input
          type="range"
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
          onChange={(e) => setDeadlift(Number(e.target.value))}
        />
        <div>{deadlift} lbs.</div>
        <div>{calculateDeadliftScore()} points</div>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Standing Power Throw (m)</label>
        <input
          type="range"
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
          onChange={(e) => setPowerThrow(Number(e.target.value))}
        />
        <div>{powerThrow} m</div>
        <div>{calculatePowerThrowScore()} points</div>
      </div>

      <div className="mb-4">
        <label className="block font-medium">
          Hand-Release Push-Ups (reps)
        </label>
        <input
          type="range"
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
          onChange={(e) => setPushUps(Number(e.target.value))}
        />
        <div>{pushUps} reps</div>
        <div>{calculatePushUpsScore()} points</div>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Sprint Drag Carry (m:s)</label>

        <div className="flex space-x-2">
          <input
            type="range"
            min="0"
            max="201" // total seconds from 4m 48s to 1m 27s
            step="1"
            value={
              4 * 60 +
              48 -
              (sprintDragCarry.minutes * 60 + sprintDragCarry.seconds)
            }
            onChange={(e) => {
              const totalSeconds = Number(e.target.value);
              const newTotalSeconds = 4 * 60 + 48 - totalSeconds;
              const minutes = Math.floor(newTotalSeconds / 60);
              const seconds = newTotalSeconds % 60;
              setSprintDragCarry({ minutes, seconds });
            }}
          />
        </div>

        <div className="flex space-x-2 mt-2">
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={sprintDragCarry.minutes}
            onChange={(e) =>
              setSprintDragCarry({
                ...sprintDragCarry,
                minutes: Number(e.target.value),
              })
            }
          />
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={sprintDragCarry.seconds}
            onChange={(e) =>
              setSprintDragCarry({
                ...sprintDragCarry,
                seconds: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="mt-2">
          {sprintDragCarry.minutes} m {sprintDragCarry.seconds} s
        </div>
        <div className="font-semibold mt-2">
          {calculateSprintDragCarryScore()} points
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Plank (m:s)</label>

        <div className="flex space-x-2">
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={plank.minutes}
            onChange={(e) => {
              let minutes = Number(e.target.value);
              let seconds = plank.seconds;
              if (minutes === 3 && seconds > 40) {
                seconds = 40;
              }
              setPlank({ minutes, seconds });
            }}
          />
          <input
            type="range"
            min={plank.minutes === 0 ? "40" : "0"}
            max={plank.minutes === 3 ? "40" : "59"}
            step="1"
            value={plank.seconds}
            onChange={(e) => {
              let seconds = Number(e.target.value);
              if (plank.minutes === 0 && seconds < 40) {
                seconds = 40;
              }
              setPlank({ ...plank, seconds });
            }}
          />
        </div>

        <div className="flex space-x-2 mt-2">
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={plank.minutes}
            onChange={(e) => {
              let minutes = Number(e.target.value);
              let seconds = plank.seconds;
              if (minutes === 3 && seconds > 40) {
                seconds = 40;
              }
              setPlank({ minutes, seconds });
            }}
          />
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={plank.seconds}
            onChange={(e) => {
              let seconds = Number(e.target.value);
              if (plank.minutes === 0 && seconds < 40) {
                seconds = 40;
              }
              setPlank({ ...plank, seconds });
            }}
          />
        </div>

        <div className="mt-2">
          {plank.minutes} m {plank.seconds} s
        </div>
        <div className="font-semibold mt-2">{calculatePlankScore()} points</div>
      </div>

      <div className="mb-4">
        <label className="block font-medium">2 Mile Run (m:s)</label>

        <div className="flex space-x-2">
          <input
            type="range"
            min="0"
            max="14" // Difference between max (27) and min (13)
            step="1"
            value={27 - run.minutes} // Invert the range value
            onChange={(e) =>
              setRun({ ...run, minutes: 27 - Number(e.target.value) })
            }
          />
          <input
            type="range"
            min="0"
            max="59"
            step="1"
            value={run.seconds}
            onChange={(e) =>
              setRun({ ...run, seconds: Number(e.target.value) })
            }
          />
        </div>

        <div className="flex space-x-2 mt-2">
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={run.minutes}
            onChange={(e) =>
              setRun({ ...run, minutes: Number(e.target.value) })
            }
            min="13"
            max="27"
          />
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={run.seconds}
            onChange={(e) =>
              setRun({ ...run, seconds: Number(e.target.value) })
            }
            min="0"
            max="59"
          />
        </div>

        <div>
          {run.minutes} m {run.seconds} s
        </div>
        <div>{calculateRunScore()} points</div>
      </div>

      <div className="font-bold mt-4">Total Score: {total}</div>
      <div
        className={`font-medium ${
          meetsMinimumStandard ? "text-green-500" : "text-red-500"
        }`}
      >
        Results:{" "}
        {meetsMinimumStandard
          ? "Meets Army minimum standard"
          : "Does not meet Army minimum standard"}
      </div>
      <div className="font-medium">
        {meetsExemptionCriteria
          ? "Exempt from body fat circumference-based tape assessment"
          : ""}
      </div>
    </div>
  );
};

export default AcftCalcc;
