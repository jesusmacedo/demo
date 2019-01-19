/**
 * `interface` for defining an `Account` object.
 */
interface IAccount {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly userId: string;
    readonly deposits: number;
    readonly withdrawals: number;
    readonly balance: number;
}
