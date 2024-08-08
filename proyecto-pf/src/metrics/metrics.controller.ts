import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { ApiTags } from '@nestjs/swagger';
import { getActiveMetricsDecorator, getMembershipMetricsDecorator, lastMonthSubscriptionDecorator, userUseTodayDecorator } from './metrics.decorators';

@Controller('metrics')
@ApiTags("metrics")
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  @getActiveMetricsDecorator()
  getActiveMetrics() {
    return this.metricsService.getActiveMetrics()
  }

  @Get("memberhip")
  @getMembershipMetricsDecorator()
  getMembershipMetrics() {
    return this.metricsService.getMembershipMetrics()
  }

  @Get("use")
  @userUseTodayDecorator()
  userUseToday() {
    return this.metricsService.userUseToday()
  }

  @Get("lastmonth")
  @lastMonthSubscriptionDecorator()
  lastMontSubscriptions() {
    return this.metricsService.lastMonthSubscription()
  } 
}
