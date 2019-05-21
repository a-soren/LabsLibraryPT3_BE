const faker = require("faker");

const createFakeUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber()
});
module.exports={
  createFakeUser
}






faker.fake("{{name.firstName}} {{name.lastName}} {{internet.email}} {{phone.phoneNumber}}")