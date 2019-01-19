/**
 * `interface` for definind a `Session` object.
 */
interface ISession {
    readonly id: string;
    readonly iat: number;
    readonly exp: number;
    readonly email: string;
    readonly firstname: string;
    readonly lastname: string;
}
