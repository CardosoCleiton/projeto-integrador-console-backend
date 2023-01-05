const { User } = require("./models/User");
const { Address } = require("./models/Address");
const { Employee } = require("./models/Employee");
const { Product } = require("./models/Product");
const { Packaging } = require("./models/Packaging");
const { Category } = require("./models/Category");

// Usuário tem muitos endereços e um endereço pertence a um usuário.
User.hasMany(Address);
Address.belongsTo(User);

// 1 Usuário é um Employee, e 1 employee é 1 User
User.hasOne(Employee);
Employee.belongsTo(User);

//************PRODUTO************/
//1 pacote tem varios produtos, 1 produto pertence a um pacote
Packaging.hasMany(Product);
Product.belongsTo(Packaging);
//1 Empregado publica varios produtos, 1 produto é publicado por 1 funcionario
Employee.hasMany(Product);
Product.belongsTo(Employee);
//1 Categoria tem varios produtos, 1 produto pertence a uma categoria.
Category.hasMany(Product);
Product.belongsTo(Category);
//1 Produto tem varias imagems e 1 imagem pertence a um produto.
