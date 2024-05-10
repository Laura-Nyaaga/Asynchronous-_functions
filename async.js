const { reject } = require("async");

// 1. Write an asynchronous function that accepts a message string and a delay time in milliseconds. The function should log the message to the console after the specified delay time.
function greet (){
console.log(`Hello`)
}
setTimeout(greet, 3000)

// 2.You have an array of user IDs and a function getUserData(id) that returns a Promise with user data when given a user ID. Write an asynchronous function that fetches and logs the data for each user ID one by one, in sequence.

async function getUserData(id) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    return `User data  ${id}`;
}

async function takeData(ids) {
    for (const identity of ids) {
        try {
            const userData = await getUserData(identity);
            console.log(`User identity ${identity}: ${userData}`);
        } catch (error) {
            console.error(`user identity ${identity}: invalid`);
        }
    }
}
takeData(["002","004","007", "009"]);
// 3. You have an asynchronous function performTask() that returns a Promise. The Promise resolves if the task is successful and rejects if there's an error. Write a function that calls performTask() and logs a custom success message if the task is successful, and a custom error message if there's an error.
async function performTaskFunction(performTask) {
    try {
        await performTaskFunction();
        console.log("Task is successful"); 
    }
    catch(error){
        console.error("Error in task", error);
    }
}
performTaskFunction()

// 4.Write a function unstableTask that:
// 
// 1.Accepts a taskName and failureProbability (a number between 0 and 1).
// 2. Returns a Promise that:
// Resolves immediately with a success message if a randomly generated number is greater than failureProbability.
// Rejects immediately with a failure message if a randomly generated number is less than or equal to failureProbability.
// Write another function executeWithRetry that:

// Accepts a taskName, retries, and failureProbability.
// Uses a retry mechanism to attempt the unstableTask up to retries times.
// Logs whether the task succeeded or failed after all attempts.

function unstableTask(taskName, failureProbability) {
    return new Promise((resolve, reject) => {
        const randomValue = Math.random();

        if (randomValue > failureProbability) {
            resolve(`${taskName} succeeded`);
        } else {
            reject(`${taskName} failed`);
        }
    });
}

async function executeWithRetry(taskName, retries, failureProbability) {
    let attempts = 0;
  while (attempts < retries) {
    try {
      const result = await unstableTask(taskName, failureProbability);
      console.log(result);
      return;
    } 
    catch (error) {
      attempts++;
      if (attempts === retries) {
        console.error(`Maximum retries reached for task: ${taskName}`);
      } 
      else {
        console.log(`Retrying task: ${taskName} after this ${attempts}attempts and ${retries} trials`)
    }
 }
}
}

executeWithRetry("SampleTask", 3, 0.5);

