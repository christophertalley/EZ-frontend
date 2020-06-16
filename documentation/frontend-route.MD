# Frontend Routes

## Home Page ("/")
  - This will be the splash page for EZforms. IT will have a brief overview of the application and how to use it.
  - Link to login/signup page(auth0)
  - Link to Logout (AUTH)
  - Link to profile where you can view your created forms (AUTH)
  - Link to create a new form (AUTH)
  - Link to form templates (AUTH)
  
## Form Creation Page ("/form-builder")
  - This will be the UI for customizing and creating forms
  - Different form fields will be located on the left and can be dragged to desired location on the form
  - When a field is selected, different customizations will be available for that specific field
  - (STRECTH) Different styling options for the form
  
## Form Page ("/forms/:form_id")
  - This page will be used to fill out and submit each form
  - Anyone with access to this link can submit a form
  - form_id in the url will be encrypted to prevent unwanted submissions on the form
 
## Form Analytics Page("forms/:form_id/analytics")
  - This page will only be accessible by the form creator
  - This form will allow the creator to view the different submissions for their created form
  - (STRETCH) Graphs/charts to make analytics of submissions easier to read
  - (STRETCH) Downloadable csv file for use in other programs
  
## Profile Page("/profile/:user_id")
  - This page will display user info
  - This page will show any created forms from that user
  - Each form will also have a direct link to the analytics for that form
  - (STRETCH) Update user info
