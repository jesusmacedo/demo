import { EAlert } from '../../enums/common/alert.enum';

/**
 * `interface` for defining an `Alert` object.
 */
export interface IAlert {
    content: string;
    type: EAlert;
}
