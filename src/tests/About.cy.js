import React from 'react';
import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import About from '../About.js';


describe('About Page', () => {
    it('Contains About', () => {
        mount(
            <MemoryRouter> 
              <About />
            </MemoryRouter>
          );
      cy.url().should('include', 'About');
    });
  });