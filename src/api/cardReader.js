import readerClient from './readerClient';

// Returns the card fields as delivered by the reader, e.g. { GivenName, ... }.
export const readCard = async () => (await readerClient.get('/read')).data;
