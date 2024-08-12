
// Function  : To calculate Item Index based on given item postion
// Parameter : itemPosition

export function getIndexValue(itemPosition) { 

    let itemIndex = itemPosition - 1;

    return itemIndex ;
  
};

// Function  : To Calculate yesterday's date
export function getYesterdayDate() {

    const dayjs = require('dayjs');
    
    const yesterday = dayjs().subtract(1, 'day').format('MM-DD'); 
    
    cy.log(" yesterday  = " +yesterday);

    return yesterday;

};
    
// Function  : To Get the same day as today but exactly 40 years ago

export function getDate40YearsAgo() {

    const today = new Date();
    const year = today.getFullYear() - 40;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const searchDate = `${year}-${month}-${day}`;
    
    return searchDate;

};