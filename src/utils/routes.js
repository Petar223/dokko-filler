export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CONFIRM_SIGNUP: '/confirm-signup',
  ABOUT: '/about',
  DEMO: '/demo',
  DOCUMENTS: '/documents',
  CREATE_DOCUMENT: '/documents/:id/create',
};

export const createDocumentPath = (id) =>
  `/documents/${encodeURIComponent(id)}/create`;
