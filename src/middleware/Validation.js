// validation.js
export const validateProductForm = (formValues) => {
    const errors = {};
    const { name, description, price, status, isRecommended, isBestseller } = formValues;
  
 
    if (!name) errors.name = 'Product name is required';
    else if (name.length < 3) errors.name = 'Product name must be at least 3 characters';
    else if (name.length > 100) errors.name = 'Product name must be less than 100 characters';
  
    //Validation for description
    if (!description) errors.description = 'Description is required';
    else if (description.length < 10) errors.description = 'Description must be at least 10 characters';
  
    // Validation for price
    if (!price) errors.price = 'Price is required';
    else if (isNaN(price) || price < 0) errors.price = 'Price must be a positive number';
  
    // Validation for status
    if (!status) errors.status = 'Status is required';
    else if (!['available', 'unavailable'].includes(status)) errors.status = 'Invalid status';
  
    // Validation for isRecommended
    if (typeof isRecommended !== 'boolean') errors.isRecommended = 'IsRecommended must be true or false';
  
    // Validation for isBestseller
    if (typeof isBestseller !== 'boolean') errors.isBestseller = 'IsBestseller must be true or false';
  
    return errors;
  };
  