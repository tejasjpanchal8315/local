
describe('PokeAPI flavor and potency tests', () => {

    let inputData; // Declare inputData 

    before(() => {             

        // Load fixture data before running any tests
        cy.fixture('pokeAPITestData').then( (data)  => {
      
            inputData = data;    // Assign fixture data to inputData

        });

    });
  
    it('Fetch a berry with spicy flavor using a valid name and validate response', () => {    
        
        cy.request({
            method: 'GET',
            url: `${inputData.apiUrl}/berry-flavor/${inputData.flavorName}`,
            failOnStatusCode: false   // Do not fail the test on HTTP errors
          }).then((response) => {

            expect(response.status).to.eq(200);        
            expect(response.body).to.have.property('berries');
            expect(response.body).to.have.property('name',inputData.flavorName);
            expect(response.body.name).to.eq(inputData.flavorName);                
        
        });

    });

    it('Retrieve all berries with "spicy" flavor and fetch the one with the highest potency', () => {
          
        cy.request({
            method: 'GET',
            url: `${inputData.apiUrl}/berry-flavor/${inputData.flavorName}`,
            failOnStatusCode: false  // Do not fail the test on HTTP errors
            }).then((response) => {

                const berries = response.body.berries;
                expect(berries).to.be.an('array').and.to.have.length.greaterThan(0);

                let highestPotencyBerry = berries[0];
                let highestPotency = 0;       

                berries.forEach(berryEntry => {
                    if (berryEntry.potency > highestPotencyBerry.potency) {
                        highestPotencyBerry = berryEntry;
                        highestPotency = highestPotencyBerry.potency; 
                    }
                });

                const highestPotencyBerryName = highestPotencyBerry.berry.name;
                cy.log(`Berry with highest potency: ${highestPotencyBerryName}`);
                cy.log(`Berry potency Value : ${highestPotencyBerry.potency}`);
          
                cy.request({
                method: 'GET',
                url: `${inputData.apiUrl}/berry/${highestPotencyBerryName}`,
                failOnStatusCode: false  // Do not fail the test on HTTP errors
                }).then((berryResponse) => {
                    expect(berryResponse.status).to.eq(200);
                    expect(berryResponse.body.name).to.eq(highestPotencyBerryName);
                    expect(response.body).to.have.property('name',inputData.flavorName);
                    expect(response.body).to.have.property('id');
                    expect(berryResponse.body.name).to.eq(highestPotencyBerryName);
                  });
            });
    });

});