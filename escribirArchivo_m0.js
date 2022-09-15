/*
In the JavaScript file, write a program to perform a GET request on the route https://coderbyte.com/api/challenges/json/age-counting which contains a data key and the value is a string which contains items in the format: key=STRING, age=INTEGER. Your goal is to count how many items exist that have an age equal to 32. Then you should create a write stream to a file called output.txt and the contents should be the key values (from the json) each on a separate line in the order they appeared in the json file (the file should end with a newline character on its own line). Finally, then output the SHA1 hash of the file.

Example Input
{"data":"key=IAfpK, age=32, key=WNVdi, age=64, key=jp9zt, age=40, key=9snd2, age=32"}

File Contents (output.txt)
IAfpK
9snd2

Example Output
7caa78c7180ea52e5193d2b4c22e5e8a9e03b486
0b8781a3b9e2e8af92c419b860e09700d380baf9
*/

const https = require('https');
const fs = require('fs');
const crypto = require('crypto')

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  let data = '';
  let content=[];
  resp.on('data', (d) => {
    data += [d]
  })

  resp.on('end', () => {
    let ages = data.split(',')
    .map(data => data.replace(' ', ''))
    for (let i=0; i < ages.length; i++) {
        let result = ages[i].split('=')
        if(result[0]==='age' && result[1]===filter){
            content.push(ages[i-1].split('=')[1])
        }
    }
    content = content.join('\n');
    fs.writeFileSync('output.txt',content);
    const dataFile = fs.readFileSync('output.txt','utf8');
    console.log(crypto.createHash('sha1').update(dataFile).digest('hex'));
  })
});