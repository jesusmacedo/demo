/**
 * `enum` for storing all available endpoints.
 */
export enum EApi {
    postCreate = 'auth/user/create',
    postLogin = 'auth/user/authenticate',
    getAccounts = 'accounts',
    getCardCatalog = 'catalogs/cards',
    postAccount = 'accounts'
}
