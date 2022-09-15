const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  let data = '';

  resp.on('data', (d) => {
    data += [d]
  })

  resp.on('end', () => {
    let parsedData = data.split(',').map(data => {
        console.log(data)
    })
                //.filter(data => !data.indexOf(' age='))
                //.map(data => {data.replace(" key=", ''); data.replace(" age=", '')})
                //.map(data => parseInt(data))
                /*.filter(data => {
                  return data === 32
                })*/
    console.log(parsedData)
  })
});