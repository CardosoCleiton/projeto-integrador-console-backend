const { User } = require("./models/User");
const { Address } = require("./models/Address");

// Usuário tem muitos endereços e um endereço pertence a um usuário.
User.hasMany(Address);
Address.belongsTo(User);