const { exec } = require("child_process");
require('dotenv').config();
const commitCount = process.env.COMMIT_COUNT;
const pushThreshold = process.env.PUSH_THRESHOLD;

const gitPull = () => {
    return exec("git pull", (err, stdout, stderr) => {
        if (err) {
            console.log("🔥 pull error: ", err);
            return;
        }
        console.log(`🚀 : ${stdout}`);
    });
};

const gitCommit = () => {
    console.log("🚀 : commiting...");
    return exec(
        'git commit --allow-empty -m "go + git + github = 💥"',
        (err, stdout, stderr) => {
            if (err) {
                return;
            }
            console.log(`🚀 : ${stdout}`);
        }
    );
};

const gitPush = () => {
    console.log("🚀 : pushing...");

    // promise of exec
    return new Promise((resolve, reject) => {
        exec("git push", (err, stdout, stderr) => {
            if (err) {
                console.log("🔥 push error: ", err);
                reject();
            }
            console.log(`🚀 : ${stdout}`);
            resolve();
        });
    });
};

const run = async () => {
    gitPull();

    for (let i = 0; i < commitCount; i++) {
        gitCommit();

        if (i % pushThreshold === 0) {
            await gitPush();
        }
    }
};

run().catch((err) => {
    console.log("🔥 error: ", err);
});
