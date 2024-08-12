
describe('PokeAPI valid berry Name Tests', () => {

  let inputData; // Declare inputData 

  before(() => {             

      // Load fixture data before running any tests
      cy.fixture('pokeAPITestData').then( (data)  => {
    
          inputData = data;      // Assign fixture data to inputData

      });

  });

  it('should return a valid response for a valid berry Name', () => {

    // Use a valid berry Name, for example 'cheri'

    cy.request({
        method: 'GET',
        url: `${inputData.apiUrl}/berry/${inputData.validBerryName}`,
        failOnStatusCode: false  // Do not fail the test on HTTP errors
      }).then((response) => {

        // Assert the status code
        expect(response.status).to.eq(200);

        // Assert the response body
        expect(response.body).to.have.property('name',inputData.validBerryName);
        expect(response.body).to.have.property('id');            
          
    });

  });

  it('should return an error for an invalid berry Name', () => {
    
    // Use an invalid berry Name, for example 'apple'    

    cy.request({
        method: 'GET',
        url: `${inputData.apiUrl}/berry/${inputData.invalidBerryName}`,
        failOnStatusCode: false  // Do not fail the test on HTTP errors
      }).then((response) => {

        // Assert the status code
        expect(response.status).to.eq(404);

        // Assert the response body      
        expect(response.body).contains('Not Found');

    });

  });

});