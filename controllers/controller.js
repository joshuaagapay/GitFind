const Table     = require('cli-table2');
const fetch     = require('node-fetch');

const findUser = (username) => {
    let url = `https://api.github.com/users/${username}`;
     return fetch(url)
                .then(response => response.json());
}

const printUsers = async (users) => {
    let table = new Table({
        head: ['ID','USERNAME','NAME', 'FOLLOWERS','FOLLOWING'],
        colWidths:[15,20,30,11,11]
    });
    let promises = [];

    for (let x of users){  
        let res = await findUser(x);
        if(res.id != null) promises.push(res);
    }

    for (let result of promises) {
        table.push([result.id,result.login,result.name,result.followers,result.following]); 
    } 
    console.log(table.toString()); 
    
}

// const findUser = (username, handleresult) => {

//         const options = {
//             url:`https://api.github.com/users/${username}`,
//             method: 'GET',
//             headers: {
//                 'User-Agent': 'joshuaagapay'
//             },
    
//         }
    
//         request(options, (err, res, body) => {
//             let json = JSON.parse(body);
//             handleresult(json);
//         });

// };

// const printUsers = (users) => {
//     let table = new Table({
//         head: ['ID','USERNAME','NAME', 'FOLLOWERS','FOLLOWING'],
//         colWidths:[15,20,30,11,11]
//     });
//     users.forEach((element, index) => {     
//         findUser(element,(result) => {
//             console.log(result);
//             // console.log('Hell Yeahh');
//             // console.log('Hell WAAAAW');
//             //     if(result){
//             //         table.push([result.id,result.login,result.name,result.followers,result.following]);          
//             //         if(index == users.length-1){
//             //             console.log(table.toString());
//             //             return;
//             //         }
//             //     } 
                
//         });
//         // console.log('boangg!');
//     });
// };

module.exports = {printUsers};
