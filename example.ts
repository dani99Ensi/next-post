const neme: String= 'Daniel';
const owner="Andres"
const age=8


console.log({neme})
console.log(neme)
console.log(neme && {neme})
console.log(false && {neme})
console.log({...(true && {neme}),...(owner && {owner})})
console.log({age})