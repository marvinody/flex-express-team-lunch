const mail = [
  { from: 'steve', id: 0 }
]
// these functions don't need async but they have them
// in order to "pretend to be" asyncronous
// they really aren't, but pretend they are...


// returns an array of objects of all the mail that exists
const findAll = async () => {
  return mail
}

// adds the data to the 'database' and gives it a unique ID. returns the newly created object
const create = async (data) => {
  data.id = mail.length
  mail.push(data)
  return data
}

// get a mail using just the ID
// but id is a string...
const findById = async (id) => {
  return mail.find(letter => Number(id) === letter.id)
}


module.exports = {
  findAll,
  create,
  findById
}
