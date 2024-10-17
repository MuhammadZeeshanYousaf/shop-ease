import schedule from "node-schedule";

const date = new Date(2024, 10, 15, 15, 29, 0); // 15th Oct 2024 at 3:29pm

const job = schedule.scheduleJob(date, function () {
  console.log("Time for standup!");
});

console.log("Scheduled")