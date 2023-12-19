function randomGame() {
    let counter = 0;
    let randomNum;
    const timer = setInterval(function() {
        randomNum = Math.random();
        counter++;
        if (randomNum > 0.75) {
            clearInterval(timer);
            console.log(`Number of tries: ${counter}`);
        } else {
            randomNum = Math.random();
        }
    }, 1000);
}
