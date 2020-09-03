const { fork } = require('child_process');

(runForkOperation =>{
    console.log('I am Called');
    // fork another process
    const process = fork('./send_mail.js');
    const mails = ['basit','wishaal','shahzaib','noman','faraz']
   // send list of e-mails to forked process
    process.send({ mails });

    //killing child process after 2 sec
    setTimeout(()=>{
        // console.log(process.memoryUsage());
        // process.kill("SIGINT")
    },2000);


   // listen for messages from forked process
    process.on('message', (message) => {
        console.log(`Number of mails sent ${message.counter}`);
    });

    process.on('close', (message) => {
        console.log(`On close Called`);
    });
})()
