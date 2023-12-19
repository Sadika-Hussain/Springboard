function countdown (num) {
    const timer = setInterval(function () {
        if (num === 1) {
            console.log("DONE!");
            clearInterval(timer);
        } else {
            num--;
            console.log(num);
        }
    }, 1000);
}






