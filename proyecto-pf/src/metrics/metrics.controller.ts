import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('metrics')
@ApiTags("metrics")
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getActiveMetrics() {
    return this.metricsService.getActiveMetrics()
  }

  @Get("memberhip")
  getMembershipMetrics() {
    return this.metricsService.getMembershipMetrics()
  }

  userUseToday() {
    return this.metricsService.userUseToday()
  }
}
