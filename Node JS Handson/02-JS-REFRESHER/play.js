const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        // argument "resolve": it would complete the Promise successfully
        // argument "reject": it would reject i.e. throwing an error 
        setTimeout(() => {
            resolve('Data Fetched!!');
        }, 1500);
    });
    return promise; // this is sync code, thus promise is immediately returned after setTimeout() expires
};

setTimeout(() => {
    console.log("Timeout!!")
    fetchData().then(test => {
        console.log(test);
    });
}, 2000);   // this is async code as it do not execute instantly

console.log("Hello");