const { CalculateFreightService } = require("../../services/freight/CalculateFreightService");

class CalculateFreightController{
    async handle(request, response){
        const freightData = request.body;
        const calculateFreightService = new CalculateFreightService();
        const prices = await calculateFreightService.execute(freightData);
        return response.json(prices);
    }

}
module.exports = { CalculateFreightController }