const fs = require('fs');
const { get } = require('superagent');
const superagent = require('superagent');



//Function creates a promise that returns either or data or an error
function readFilePro(file) {                   
    return new Promise((resolve, reject) => {          
        fs.readFile(file, (err, data) =>{
            if (err) reject('I could not find that file')
            resolve(data);
        })
    })
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file,data, err =>{
            if (err) reject("Unable to write file")
            resolve('success');
        })
    })
}

// Call our function here and if the above promise was rejected, we will instead get back our error string, if not the superagent code will execute. 
/*
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
      console.log(res.body.message);
      return writeFilePro('dog-img.txt', res.body.message)
  })
  .then(() =>{
   console.log("Dog Image saved to file");
  })
  .catch(err => {
      console.log(err.message);
  });
*/




const getDogPic = async () => {
    try {
      const data = await readFilePro(`${__dirname}/dog.txt`);
      console.log(`Breed: ${data}`);

      const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
      const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
      const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
      const all = await Promise.all([res1Pro, res2Pro, res3Pro])
      const imgs = all.map(el => el.body.message)
      console.log(all)
      console.log(imgs)
    

      await writeFilePro('dog-img.txt', imgs.join('\n'));
      console.log("Dog Image saved to file");
    } catch (err) {
      console.log(err);
      throw(err)
    }
    return '2: Ready'
};

(async () => {
   try {
    console.log('1:will get dog pic')
    const x = await getDogPic();
    console.log(x)
    console.log('Done getting dog pics')
   } catch(err) {
    console.log('ERROR!')
   } 
})();
// console.log('1:will get dog pic')
// getDogPic().then(x  => {
//     console.log(x)
//     console.log('Done getting dog pics')
// })
// .catch(err => {
//     console.log('ERROR!')
// });

//reminder of the 3 main methods of constructing a function 
// function myFunc(data) {
//     console.log(data)
// }

// const myFunc2 = function(data) {
//     console.log(data)
// }


// const myFunc3 = data => {
//     console.log(data)
// }


// myFunc('stuff')
// myFunc2('stuff')
// myFunc3('stuff')