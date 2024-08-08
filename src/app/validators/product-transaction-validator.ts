import * as yup from 'yup';

export const listProductTransactionSchema = yup.object().shape({
  startDate: yup.date()
    .nullable() // Permite valores nulos
    .optional()
    .typeError('Start date must be a valid date') 
    .test('is-valid-date', 'Start date must be a valid date', value => {
      return value === null || (value instanceof Date && !isNaN(value.getTime()));
    }),

  endDate: yup.date()
    .nullable() 
    .optional()
    .typeError('End date must be a valid date') 
    .test('is-valid-date', 'End date must be a valid date', value => {
      return value === null || (value instanceof Date && !isNaN(value.getTime()));
    }),

});
