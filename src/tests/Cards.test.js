import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cards from '../SwipeScreen/Cards';
import {auth, provider, db} from '../firebaseConfig';
import { MemoryRouter } from 'react-router-dom';


//example test
test('example test', () => {
    expect(true).toBe(true);
})

// test('getDataFromFirestore retrieves data from Firestore for Cards component', async () => {
//   // Mock the Firestore implementation and the data to be retrieved
//   const mockFirestore = {
//     collection: jest.fn(() => ({
//       doc: jest.fn(() => ({
//         get: jest.fn(() => Promise.resolve({ data: () => ({ /* Your expected data here */ }) })),
//       })),
//     })),
//   };

//   // Render the Cards component
//   render(<Cards firestore={mockFirestore} />);

//   // Call the function that retrieves data from Firestore within the Cards component
//   const data = await getDataFromFirestore(mockFirestore, 'collectionId', 'documentId');

//   // Assert that the retrieved data is as expected
//   expect(data).toEqual({ /* Your expected data here */ });
// });
    