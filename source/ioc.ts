import { Container } from 'inversify';

import { TimeService } from './services/time.service';
import { GoalService } from './services/goal.service';

export let container = new Container();
container.bind<TimeService>(TimeService).toSelf();
container.bind<GoalService>(GoalService).toSelf();
