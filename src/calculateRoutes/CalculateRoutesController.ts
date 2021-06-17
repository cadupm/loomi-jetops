import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CalculateRoutesUseCase } from './CalculateRoutesUseCase'

class CalculateRoutesController {
  async handle(request: Request, response: Response): Promise<Response> {
    // const { file } = request
    const { aircraftId } = request.params

    const calculateRoutesUseCase = container.resolve(CalculateRoutesUseCase)

    const calculateRoutes = await calculateRoutesUseCase.execute(
      aircraftId
    )
    
    const mostProfitableRoutes = calculateRoutes.map(oportunity => {
      const fillers = oportunity.paths.map(filler => {
        const pathProfit = filler.reduce((totalProfit, currentPath) => totalProfit + currentPath.profit , 0)
        return [...filler, { total: pathProfit }]
      })

      fillers.sort((totalA, totalB) => totalA < totalB ? 1 : -1)

      return {
        id: oportunity.id,
        fillers
      }
    })

    return response.json(mostProfitableRoutes)
}
}

export { CalculateRoutesController }
