
describe('PokeAPI valid berry id Tests', () => {

    let inputData; // Declare inputData 

    before(() => {             

        // Load fixture data before running any tests
        cy.fixture('pokeAPITestData').then( (data)  => {
      
            inputData = data;      // Assign fixture data to inputData
  
        });

    });

    it('should return a expexted response for a valid berry ID', () => {

        // Use a valid berry ID  
        cy.request({
            method: 'GET',
            url: `${inputData.apiUrl}/berry/${inputData.validBerryId}`,
            failOnStatusCode: false  // Do not fail the test on HTTP errors
          }).then((response) => {
       
            // Assert the status code
            expect(response.status).to.eq(200);

            // Assert the response body
            expect(response.body).to.have.property('id', inputData.validBerryId);
            expect(response.body).to.have.property('name');       
    
        });
  
    });

    it('should return an error for an invalid berry ID', () => {
        
        // Use an invalid berry ID       
        cy.request({
            method: 'GET',
            url: `${inputData.apiUrl}/berry/${inputData.invalidBerryId}`,
            failOnStatusCode: false  // Do not fail the test on HTTP errors
          }).then((response) => {

          // Assert the status code
          expect(response.status).to.eq(404);

          // Assert the response body     
          expect(response.body).contains('Not Found');
        
        });
  
    });

});