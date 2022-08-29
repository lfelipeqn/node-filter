function FirstFactorial(num) {
    let ans = 1;
    for(let i=1; i<=num;i++){
      ans = ans * i
    }
    return ans
  }
     
  // keep this function call here 
  console.log(FirstFactorial(readline()));