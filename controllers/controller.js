const request = require('request');
const Table   = require('cli-table2');


const findUser = (username) => {
    return new Promise((resolve,reject) => {

        const options = {
            url:`https://api.github.com/users/${username}`,
            method: 'GET',
            headers: {
                'User-Agent': 'joshuaagapay'
            },
    
        }
    
        request(options, (err, res, body) => {
            if(err) return reject(err);
            resolve(JSON.parse(body));
        });


    });
}

const printUsers = (users) => {
    let table = new Table({
        head: ['ID','USERNAME','NAME', 'FOLLOWERS','FOLLOWING'],
        colWidths:[15,20,30,11,11]
    });
    let promises = [];
    users.forEach((element) => {
        promises.push(findUser(element));       

    });

    Promise.all(promises).then((result) =>{
        result.forEach((element,index) =>{
            table.push([element.id,element.login,element.name,element.followers,element.following])
        });
            console.log(table.toString());
    });

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

// }

// const printUsers = (users) => {
//     let table = new Table({
//         head: ['ID','USERNAME','NAME', 'FOLLOWERS','FOLLOWING'],
//         colWidths:[15,20,30,11,11]
//     });

//     users.forEach((element, index) => {     
//         findUser(element,(result) => {
//                 if(result){
//                     table.push([result.id,result.login,result.name,result.followers,result.following]);          
//                     if(index == users.length-1){
//                         console.log(table.toString());
//                         return;
//                     }
//                 }   
//             });
//     });

// }

module.exports = {findUser, printUsers};