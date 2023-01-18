const { User } = require("./models/User");
const { Address } = require("./models/Address");
const { Employee } = require("./models/Employee");
const { Product } = require("./models/Product");
const { Packaging } = require("./models/Packaging");
const { Category } = require("./models/Category");
const { ImageProduct } = require("./models/ImageProduct");
const { Order } = require("./models/Order");
const { OrderItem } = require("./models/OrderItem");
const { HistoryStatusOrder } = require("./models/HistoryStatusOrder");

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
Product.hasMany(ImageProduct);
ImageProduct.belongsTo(Product);

//************PEDIDO************/
//1 usuario faz varios pedidos, e o pedido pertence a 1 usuário
User.hasMany(Order);
Order.belongsTo(User);
//1 pedido possui 1 endereço, e um endereço pode pertence a varios pedidos.
Address.hasMany(Order);
Order.belongsTo(Address);
//1 pedido possui varios items de pedido, e 1 item de pedido pertence a 1 pedido
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
//1 pedido tem varios status, e 1 status pertence a 1 pedido
Order.hasMany(HistoryStatusOrder);
HistoryStatusOrder.belongsTo(Order);
//1 item de pedido tem 1 produto, e 1 produto pode pertcencer a varios itens de pedido.
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);
