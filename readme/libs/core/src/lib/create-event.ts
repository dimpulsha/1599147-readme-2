import { NotifyCommandEnum } from '@readme/shared';

export function createEvent(cmdEvent: NotifyCommandEnum) {
 return {cmd: cmdEvent}
}
