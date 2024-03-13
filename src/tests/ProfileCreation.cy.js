import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import ProfileCreation from '../ProfileCreationScreen/ProfileCreation.js';

describe('Profile Creation Page', () => {
  it('successfully loads', () => {
    mount(
      <MemoryRouter>
        <ProfileCreation />
      </MemoryRouter>
    );
    cy.url().should('include', 'ProfileCreation');
  });

  it('allows user input', () => {
    mount(
      <MemoryRouter>
        <ProfileCreation />
      </MemoryRouter>
    );
    cy.get('input[id="fname"]').type('John');
    cy.get('input[id="lname"]').type('Doe');
  });
});
