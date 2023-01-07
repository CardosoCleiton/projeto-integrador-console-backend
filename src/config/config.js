const freightConfig = {
   cepOrigin: process.env.CEP_ORIGIN ?? "58040530",
   sedexCode : process.env.SEDEX_CODE ?? "04014",
   pacCode: process.env.PAC_CODE ?? "04510"
}

module.exports = { freightConfig }