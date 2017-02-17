import getDecorators from 'inversify-inject-decorators';
import { container } from './ioc';

export const lazyInject = getDecorators(container).lazyInject;
