import { baseUrl } from '../../../fixtures/route';
import { getElement } from '../../utils/helper';

export const getProfile = () => getElement('.v-responsive__content').should('be.visible');

export const getPortalUrl = () => getElement('div.serverUrl').contains(baseUrl);

export const getSignOutButton = () =>
  getElement('div[role="menuitem"]  .v-list-item__title').contains('Sign Out');

export const getDomainUrlLabel = () => cy.contains('span', 'Choose a domain URL');

export const getSignInButton = () =>
  getElement('button[type="submit"]').contains('sign in').should('be.visible');

export const getCardText = () => getElement('.v-card__text');

export const getDomainInput = () => getElement('input');

export const navigateToCommandCenter = (url: string) => {
  cy.visit(url);
};

export const getSignOutTextSelector = () => getElement('.v-card__text');

export const getSignOutButtonSelector = () => getElement('.v-btn__content');

export const getSupportSelector = () => getElement('button[type="button"]');
