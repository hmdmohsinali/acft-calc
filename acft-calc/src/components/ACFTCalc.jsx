// import React, { useState, useEffect } from 'react';
// import testScore from './testScore.json';

// const ACFTCalculator = () => {
//     const [gender, setGender] = useState('');
//     const [age, setAge] = useState(17);
//     const [deadlift, setDeadlift] = useState(60);
//     const [powerThrow, setPowerThrow] = useState(3.3);
//     const [pushUps, setPushUps] = useState(0);
//     const [sprintDragCarry, setSprintDragCarry] = useState({ minutes: 4, seconds: 48 });
//     const [plank, setPlank] = useState({ minutes: 0, seconds: 48 });
//     const [run, setRun] = useState({ minutes: 27, seconds: 0 });
//     const [totalScore, setTotalScore] = useState(0);
//     const [meetsExemptionCriteria, setMeetsExemptionCriteria] = useState(false);

//     const getAgeGroup = (age) => {
//         if (age >= 17 && age <= 21) return "17-21";
//         if (age >= 22 && age <= 26) return "22-26";
//         if (age >= 27 && age <= 31) return "27-31";
//         if (age >= 32 && age <= 36) return "32-36";
//         if (age >= 37 && age <= 41) return "37-41";
//         if (age >= 42 && age <= 46) return "42-46";
//         if (age >= 47 && age <= 51) return "47-51";
//         if (age >= 52 && age <= 56) return "52-56";
//         if (age >= 57 && age <= 61) return "57-61";
//         return "62+";
//     };

//     const calculateDeadliftScore = () => {
//         if (!gender || !testScore[gender]) {
//             return 0;
//         }
//         const ageGroup = getAgeGroup(age);
//         const deadliftScores = testScore[gender]['max-dead-lift'];
//         let score = 0;

//         for (let weight in deadliftScores) {
//             if (deadlift >= weight) {
//                 score = deadliftScores[weight][0][ageGroup];
//             }
//         }
//         return score || 0;
//     };

//     const calculatePowerThrowScore = () => {
//       if (!gender || !testScore[gender]) {
//         return 0; // Return 0 or an appropriate default value when gender is not selected
//     }
//         const ageGroup = getAgeGroup(age);
//         const powerThrowScores = testScore[gender]['standing-power-throw'];
//         let score = 0;
  
//         // Find the nearest power throw distance in the JSON data
//         for (let distance in powerThrowScores) {
//             if (powerThrow >= distance) {
//                 score = powerThrowScores[distance][0][ageGroup];
//             }
//         }
//         return score || 0;
//     };

//   console.log(calculateDeadliftScore())

//     const calculatePushUpsScore = () => {
//         if (!gender || !testScore[gender]) {
//             return 0;
//         }
//         const ageGroup = getAgeGroup(age);
//         const pushUpScores = testScore[gender]['hand-release-push-ups'];
//         let score = 0;

//         for (let reps in pushUpScores) {
//             if (pushUps >= reps) {
//                 score = pushUpScores[reps][0][ageGroup];
//             }
//         }
//         return score || 0;
//     };

//     const calculateSprintDragCarryScore = () => {
//         if (!gender || !testScore[gender]) {
//             return 0;
//         }
//         const ageGroup = getAgeGroup(age);
//         const sprintDragCarryScores = testScore[gender]['sprint-drag-carry'];
//         let score = 0;

//         const totalSeconds = (sprintDragCarry.minutes * 60) + sprintDragCarry.seconds;

//         for (let time in sprintDragCarryScores) {
//             const timeParts = time.split(':');
//             const timeInSeconds = (Number(timeParts[0]) * 60) + Number(timeParts[1]);

//             if (totalSeconds <= timeInSeconds) {
//                 score = sprintDragCarryScores[time][0][ageGroup];
//             }
//         }
//         return score || 0;
//     };

//     const calculatePlankScore = () => {
//         if (!gender || !testScore[gender]) {
//             return 0;
//         }
//         const ageGroup = getAgeGroup(age);
//         const plankScores = testScore[gender]['plank'];
//         let score = 0;

//         const totalSeconds = (plank.minutes * 60) + plank.seconds;

//         for (let time in plankScores) {
//             const timeParts = time.split(':');
//             const timeInSeconds = (Number(timeParts[0]) * 60) + Number(timeParts[1]);

//             if (totalSeconds >= timeInSeconds) {
//                 score = plankScores[time][0][ageGroup];
//             }
//         }
//         return score || 0;
//     };

//     const calculateRunScore = () => {
//         if (!gender || !testScore[gender]) {
//             return 0;
//         }
//         const ageGroup = getAgeGroup(age);
//         const runScores = testScore[gender]['2-mile-run'];
//         let score = 0;

//         const totalSeconds = (run.minutes * 60) + run.seconds;

//         for (let time in runScores) {
//             const timeParts = time.split(':');
//             const timeInSeconds = (Number(timeParts[0]) * 60) + Number(timeParts[1]);

//             if (totalSeconds <= timeInSeconds) {
//                 score = runScores[time][0][ageGroup];
//             }
//         }
//         return score || 0;
//     };

//     const calculateTotalScore = () => {
//         const deadliftScore = calculateDeadliftScore();
//         const powerThrowScore = calculatePowerThrowScore();
//         const pushUpsScore = calculatePushUpsScore();
//         const sprintDragCarryScore = calculateSprintDragCarryScore();
//         const plankScore = calculatePlankScore();
//         const runScore = calculateRunScore();

//         const total = deadliftScore + powerThrowScore + pushUpsScore + sprintDragCarryScore + plankScore + runScore;

//         const meetsExemptionCriteria = 
//             total >= 540 &&
//             deadliftScore >= 80 &&
//             powerThrowScore >= 80 &&
//             pushUpsScore >= 80 &&
//             sprintDragCarryScore >= 80 &&
//             plankScore >= 80 &&
//             runScore >= 80;

//         return { total, meetsExemptionCriteria };
//     };

//     useEffect(() => {
//         const { total, meetsExemptionCriteria } = calculateTotalScore();
//         setTotalScore(total);
//         setMeetsExemptionCriteria(meetsExemptionCriteria);
//     }, [gender, age, deadlift, powerThrow, pushUps, sprintDragCarry, plank, run]);

//     return (
//         <div className="bg-gray-200 p-4 rounded-lg max-w-md mx-auto">
//             <h2 className="text-lg font-bold mb-4">ACFT Score Calculator</h2>
            
//             <div className="mb-4">
//                 <label className="block font-medium">Gender</label>
//                 <select className="w-full p-2 border rounded" value={gender} onChange={(e) => setGender(e.target.value)}>
//                     <option value="">-Select Gender-</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                 </select>
//             </div>
            
//             <div className="mb-4">
//                 <label className="block font-medium">Age</label>
//                 <input type="number" className="w-full p-2 border rounded" value={age} onChange={(e) => setAge(Number(e.target.value))} />
//             </div>
            
//             <div className="mb-4">
//                 <label className="block font-medium">Maximum Deadlift (lbs.)</label>
//                 <input type="range" min="60" max="340" step="10" value={deadlift} onChange={(e) => setDeadlift(Number(e.target.value))} />
//                 <input type="number" className="w-full p-2 border rounded mt-2" value={deadlift} onChange={(e) => setDeadlift(Number(e.target.value))} />
//                 <div>{deadlift} lbs.</div>
//                 <div>{calculateDeadliftScore()} points</div>
//             </div>
            
//             <div className="mb-4">
//                 <label className="block font-medium">Standing Power Throw (m)</label>
//                 <input type="range" min="3.3" max="12.5" step="0.1" value={powerThrow} onChange={(e) => setPowerThrow(Number(e.target.value))} />
//                 <input type="number" className="w-full p-2 border rounded mt-2" value={powerThrow} onChange={(e) => setPowerThrow(Number(e.target.value))} />
//                 <div>{powerThrow} m</div>
//                 <div>{calculatePowerThrowScore()} points</div>
//             </div>

//             <div className="mb-4">
//                 <label className="block font-medium">Hand-Release Push-Ups (reps)</label>
//                 <input type="range" min="0" max="100" step="1" value={pushUps} onChange={(e) => setPushUps(Number(e.target.value))} />
//                 <input type="number" className="w-full p-2 border rounded mt-2" value={pushUps} onChange={(e) => setPushUps(Number(e.target.value))} />
//                 <div>{pushUps} reps</div>
//                 <div>{calculatePushUpsScore()} points</div>
//             </div>

//             <div className="mb-4">
//                 <label className="block font-medium">Sprint Drag Carry (m:s)</label>
//                 <input type="range" min="0" max="8" step="1" value={sprintDragCarry.minutes} onChange={(e) => setSprintDragCarry({ ...sprintDragCarry, minutes: Number(e.target.value) })} />
//                 <input type="range" min="0" max="59" step="1" value={sprintDragCarry.seconds} onChange={(e) => setSprintDragCarry({ ...sprintDragCarry, seconds: Number(e.target.value) })} />
//                 <input type="number" className="w-full p-2 border rounded mt-2" value={sprintDragCarry.minutes} onChange={(e) => setSprintDragCarry({ ...sprintDragCarry, minutes: Number(e.target.value) })} />
//                 <input type="number" className="w-full p-2 border rounded mt-2" value={sprintDragCarry.seconds} onChange={(e) => setSprintDragCarry({ ...sprintDragCarry, seconds: Number(e.target.value) })} />
//                 <div>{sprintDragCarry.minutes} m {sprintDragCarry.seconds} s</div>
//                 <div>{calculateSprintDragCarryScore()} points</div>
//             </div>

//             <div className="mb-4">
//                 <label className="block font-medium">Plank (m:s)</label>
//                 <input type="range" min="0" max="8" step="1" value={plank.minutes} onChange={(e) => setPlank({ ...plank, minutes: Number(e.target.value) })} />
//                 <input type="range" min="0" max="59" step="1" value={plank.seconds} onChange={(e) => setPlank({ ...plank, seconds: Number(e.target.value) })} />
//                 <input type="number" className="w-full p-2 border rounded mt-2" value={plank.minutes} onChange={(e) => setPlank({ ...plank, minutes: Number(e.target.value) })} />
//                 <input type="number" className="w-full p-2 border rounded mt-2" value={plank.seconds} onChange={(e) => setPlank({ ...plank, seconds: Number(e.target.value) })} />
//                 <div>{plank.minutes} m {plank.seconds} s</div>
//                 <div>{calculatePlankScore()} points</div>
//             </div>

//             <div className="mb-4">
//                 <label className="block font-medium">2 Mile Run (m:s)</label>
//                 <input type="range" min="0" max="30" step="1" value={run.minutes} onChange={(e) => setRun({ ...run, minutes: Number(e.target.value) })} />
//                 <input type="range" min="0" max="59" step="1" value={run.seconds} onChange={(e) => setRun({ ...run, seconds: Number(e.target.value) })} />
//                 <input type="number" className="w-full p-2 border rounded mt-2" value={run.minutes} onChange={(e) => setRun({ ...run, minutes: Number(e.target.value) })} />
//                 <input type="number" className="w-full p-2 border rounded mt-2" value={run.seconds} onChange={(e) => setRun({ ...run, seconds: Number(e.target.value) })} />
//                 <div>{run.minutes} m {run.seconds} s</div>
//                 <div>{calculateRunScore()} points</div>
//             </div>

//             <div className="font-bold mt-4">
//                 Total Score: {totalScore}
//             </div>
//             <div className="font-medium">
//                 Results: {totalScore >= 60 ? 'Meets Army minimum standard' : 'Does not meet Army minimum standard'}
//             </div>
//             <div className="font-medium">
//                 {meetsExemptionCriteria ? 'Exempt from body fat circumference-based tape assessment' : ''}
//             </div>
//         </div>
//     );
// };

// export default ACFTCalculator;


import React, { useState, useEffect } from 'react';
import testScore from './testScore.json';

const ACFTCalculator = () => {
    // State for user inputs with default values
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(17);
    const [deadlift, setDeadlift] = useState(60);
    const [powerThrow, setPowerThrow] = useState(3.3);
    const [pushUps, setPushUps] = useState(0);
    const [sprintDragCarry, setSprintDragCarry] = useState({ minutes: 4, seconds: 48 });
    const [plank, setPlank] = useState({ minutes: 0, seconds: 48 });
    const [run, setRun] = useState({ minutes: 27, seconds: 0 });
    const [totalScore, setTotalScore] = useState(0);

    // Example function to calculate scores (replace with your logic)
     // Helper function to get age group
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

  // Function to calculate score for Maximum Deadlift
  const calculateDeadliftScore = () => {
    if (!gender || !testScore[gender]) {
      return 0; // Return 0 or an appropriate default value when gender is not selected
  }
      const ageGroup = getAgeGroup(age);
      const deadliftScores = testScore[gender]['max-dead-lift'];
      let score = 0;

      // Find the nearest deadlift weight in the JSON data
      for (let weight in deadliftScores) {
          if (deadlift >= weight) {
              score = deadliftScores[weight][0][ageGroup];
          }
      }
      return score || 0;
  };

  // Function to calculate score for Standing Power Throw
  const calculatePowerThrowScore = () => {
    if (!gender || !testScore[gender]) {
        return 0; // Return 0 or an appropriate default value when gender is not selected
    }

    const ageGroup = getAgeGroup(age);
    const powerThrowScores = testScore[gender]['standing-power-throw'];
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




  // Functions for other events...

  // Calculate total score by summing all event scores
  const calculateTotalScore = () => {                                       
      const deadliftScore = calculateDeadliftScore();
      const powerThrowScore = calculatePowerThrowScore();
      // Call functions for other events and sum up the scores...
      const total = deadliftScore + powerThrowScore; // + other event scores
      return total;
  };

  useEffect(() => {
      setTotalScore(calculateTotalScore());
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
            onChange={(e) => setAge(e.target.value)}
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
            onChange={(e) => setDeadlift(e.target.value)}
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
        onChange={(e) => setPowerThrow(e.target.value)} 
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
            onChange={(e) => setPushUps(e.target.value)}
          />
          <div>{pushUps} reps</div>
          <div>{/* Display corresponding points here */}0 points</div>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Sprint Drag Carry (m:s)</label>
          <input
            type="range"
            min="0"
            max="8"
            step="1"
            value={sprintDragCarry.minutes}
            onChange={(e) =>
              setSprintDragCarry({
                ...sprintDragCarry,
                minutes: e.target.value,
              })
            }
          />
          <input
            type="range"
            min="0"
            max="59"
            step="1"
            value={sprintDragCarry.seconds}
            onChange={(e) =>
              setSprintDragCarry({
                ...sprintDragCarry,
                seconds: e.target.value,
              })
            }
          />
          <div>
            {sprintDragCarry.minutes} m {sprintDragCarry.seconds} s
          </div>
          <div>{/* Display corresponding points here */}0 points</div>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Plank (m:s)</label>
          <input
            type="range"
            min="0"
            max="8"
            step="1"
            value={plank.minutes}
            onChange={(e) => setPlank({ ...plank, minutes: e.target.value })}
          />
          <input
            type="range"
            min="0"
            max="59"
            step="1"
            value={plank.seconds}
            onChange={(e) => setPlank({ ...plank, seconds: e.target.value })}
          />
          <div>
            {plank.minutes} m {plank.seconds} s
          </div>
          <div>{/* Display corresponding points here */}0 points</div>
        </div>

        <div className="mb-4">
          <label className="block font-medium">2 Mile Run (m:s)</label>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={run.minutes}
            onChange={(e) => setRun({ ...run, minutes: e.target.value })}
          />
          <input
            type="range"
            min="0"
            max="59"
            step="1"
            value={run.seconds}
            onChange={(e) => setRun({ ...run, seconds: e.target.value })}
          />
          <div>
            {run.minutes} m {run.seconds} s
          </div>
          <div>{/* Display corresponding points here */}0 points</div>
        </div>

        <div className="font-bold mt-4">Total Score: {totalScore}</div>
        <div className="font-medium">
          Results:{" "}
          {totalScore >= 60
            ? "Meets Army minimum standard"
            : "Does not meet Army minimum standard"}
        </div>
      </div>
    );
};

export default ACFTCalculator;