const jobs = {
  printMessage: (data) => {
    console.log({ ...data, runAt: new Date().toISOString() });
    console.log("*".repeat(20));
  },
};

module.exports = jobs;
