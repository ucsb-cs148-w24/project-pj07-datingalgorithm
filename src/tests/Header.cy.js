import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Header from '../Header.js';

describe('App Component', () => {
  it('successfully displays the logo text', () => {
    mount(
      <MemoryRouter> {/* Wrap Header with MemoryRouter */}
        <Header />
      </MemoryRouter>
    );
    cy.contains('Blindly'); // Checks if the text "Blindly" is present in the document
  });
});
