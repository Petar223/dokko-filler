import httpClient from './httpClient';

export const getDocuments = async () =>
  (await httpClient.get('GetListOfDocs')).data;

export const getDocumentById = async (id) =>
  (await httpClient.get('/document', { params: { id } })).data;
