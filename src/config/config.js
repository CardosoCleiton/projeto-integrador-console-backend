const freightConfig = {
   cepOrigin: process.env.CEP_ORIGIN ?? "58040530",
   sedexCode : process.env.SEDEX_CODE ?? "04014",
   pacCode: process.env.PAC_CODE ?? "04510"
}

const mercadoPagoConfig = {
   accessToken: process.env.MP_ACCESS_TOKEN ?? ""
}

const appConfig = {
   port: process.env.APP_PORT
}

module.exports = { freightConfig, mercadoPagoConfig, appConfig }