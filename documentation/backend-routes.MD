# Backend Routes
## Users
  - POST ('/users') - This endpoint will create a new user
  - User can update information through AUth0
 ## Empty Forms
  - An empty form is a form with customized inputs that does not yet have any data
  - GET ('/empty-forms') - This endpoint will return all empty forms
  - GET ('/empty-forms/:emptyFormId') - This endpoint will return a single empty form
  - POST ('/empty-forms) AUTH - This endpoint will create a new empty form
  - PUT ('/empty-forms/:emptyFormId') AUTH - This endpoint will update an empty form
  - DELETE ('/empty-forms/:emptyFormId') AUTH - This endpoint will delete an empty form
  ## Form Data
  - Each instance of form data will be connected to the correlating empty form
  - GET('/empty-forms/:emptyFormId/form-data') AUTH - This endpoint will retrieve all of the data for a specific form. Only the form creator can access this.
  - GET('/empty-forms/:emptyFormId/form-data/:formDataId') AUTH - This endpoint will retrieve the desired instance of form data that is connected the the empty form. Only the creator can access this.
  - POST('/empty-forms/:emptyFormId/form-data') - This will be used to create a new instance of form data. This will be posted from the hosted url for the form and is open to anyone who has the form link.
  - DELETE('/empty-forms/:emptyFormId/form-data/:formDataId') AUTH - This endpoint will be used to delete an instance of form data. Only the creator can access this.
  #### The AUTH keyword signals that the user must be signed in to access this route. The backend will use JWTchecks to confirm this or handle the bad request.
