function score(string){
  let total = 0;
  //iterationCount decides what rolls are additional and aren't standalone frames 
  let k = iterationCount(string);
  
  //loop through sequence & score each frame 
  for(let i=0; i < k; i++){
    if(string[i]==="X"){
      total+= scoreX(string, i);
      //checks for numbers, assuming 0 is never an input
    }else if(Number(string[i])){
      total+= scoreNum(string,i)
      //skip the next roll, as its part of the same frame
      i++;
    }else if(string[i]==="-"){
      total+=scoreMiss(string,i)
      //skip the next roll, as its part of the same frame
      i++;
    }else{
      return "invalid input";
    }
  }
  return total
}

function iterationCount(string){
  if(string.length===12 || string.length===22){
    return string.length-2;
  }else if(string.length%2!==0){
    return string.length-1;
  }else{
    return string.length;
  }
}

function scoreX(string, i){
  let total = 10;
  //check next 
  if(string[i+1]==="X"){
    total+=10;
  }else{
    total+=Number(string[i+1]);
  }
  //check next next 
  if(string[i+2]==="X"){
    total+=10;
  }else{
    total+=Number(string[i+2]);
  }
  return total;
}

function scoreNum(string,i){
  let total=Number(string[i]);
  //check next
  if(Number(string[i+1])){
    total+=Number(string[i+1]);
  }else if(string[i+1]==="/"){
    total+=10-Number(string[i]);
    let additional=string[i+3];
    if(additional==="X"){
      total+=10;
    }else{
      total+=Number(string[i]);
    }
  }
  return total;
}

function scoreMiss(string,i){
  let total =0; 
  //check next
  if(Number(string[i+1])){
      total+=Number(string[i+1]);
  }else if(string[i+1]==="/"){
    total+=10;
    if(string[i+2]==="X"){
      total+=10;
    }else if(Number(string[i+2])){
      total+=Number(string[i+2]);
    }
  }
  return total;
}

/**tests**/
const test = require('tape');

test('equality', function(t){
  t.plan(3)
  t.equal(score("XXXXXXXXXXXX"), 300, 'same same')
  t.equal(score("9-9-9-9-9-9-9-9-9-9-"), 90, 'same same')
  t.equal(score("5/5/5/5/5/5/5/5/5/5/5"), 150, 'same same')
})

