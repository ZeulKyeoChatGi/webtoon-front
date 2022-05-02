const toDate = "2022-05-01T09:00:00+09:00"
const nowDate = new Date()


// console.log(new Date(toDate))

// if (toDate.getTime()) 
// if (nowDate.getTime())

console.log(new Date(toDate).getTime())
console.log(nowDate.getTime())

if (nowDate.getTime() > new Date(toDate).getTime()) {

  console.log('날짜차이')
  const diffDate = nowDate.getTime() - new Date(toDate).getTime()
  const dateDays = Math.round(diffDate / (1000 * 3600 * 24));

  console.log(dateDays)




}