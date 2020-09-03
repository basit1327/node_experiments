async function sendMultipleMails(mails) {
    for(let i=0; i<mails.length;i++){
        await new Promise((resolve)=>{
            setTimeout(()=>{ 
                resolve(console.log(`Sending mail to: ${mails[i]}`));
            },1000)
        })
    }
    console.log('All Mails sent')

    return mails.length;
}

// receive message from master process
process.on('message', async (message) => {
    const numberOfMailsSend = await sendMultipleMails(message.mails); 

   // send response to master process
    process.send({ counter: numberOfMailsSend });
});