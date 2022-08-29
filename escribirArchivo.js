/*
In the JavaScript file, write a program to perform a GET request on the route https://coderbyte.com/api/challenges/json/age-counting which contains a data key and the value is a string which contains items in the format: key=STRING, age=INTEGER. Your goal is to count how many items exist that have an age equal to 32. Then you should create a write stream to a file called output.txt and the contents should be the key values (from the json) each on a separate line in the order they appeared in the json file (the file should end with a newline character on its own line). Finally, then output the SHA1 hash of the file.

Example Input
{"data":"key=IAfpK, age=32, key=WNVdi, age=64, key=jp9zt, age=40, key=9snd2, age=32"}

File Contents (output.txt)
IAfpK
9snd2

Example Output
7caa78c7180ea52e5193d2b4c22e5e8a9e03b486
*/

const axios = require("axios").default
const fs = require('fs');
const crypto = require('crypto')


let filter = 32
let content=[];

let getData = async (url) =>{
    try{
        const remote = await axios.get(url)
        return remote.data
    }catch (error){
        throw error;
    }
}

let writeFile = (content, name)=>{
    try{
        fs.writeFileSync(name,content);
        return true
    }catch(error){
        throw error;
    }
}

let readFile = (name)=>{
    try{
        const data = fs.readFileSync(name,{encoding:'utf-8'});
        return data
    }catch(error){
        throw error;
    }
}

getData('https://coderbyte.com/api/challenges/json/age-counting')
.then(results =>{
    let ages = results.data.replace(/(\s|\")/gi,'').split(',');
    ages = ages.reverse()
    for (let i=0; i < ages.length; i+=2) {
        let result = ages[i].split('=')
        if(Number(result[1])===filter) content.push(ages[i+1].split('=')[1])
    }
    content=content.join('\n');
    let saved = writeFile(content,'output.txt');
    if(saved){
        let dataFile = readFile('output.txt');
        console.log(crypto.createHash('sha1').update(dataFile).digest('hex'));
    } 
});