import { ECardType } from '../../enums/common/card-type.enum';

export interface ICard {
    readonly name: string;
    readonly type: ECardType;
}
