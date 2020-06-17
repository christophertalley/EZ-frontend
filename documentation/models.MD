# Models
## MongoDB Models
### - User Model
- ID: Integer OBjID
- Name
### - Empty Form Model
- OBJId
- Name
  - String
- Fields
  - ID Intger Pkey
  - Label: String(50)
  - Type: array()
    -  Will be an array of documents used to signal different types of input and provide any extra data required for rendering the form.
  - UserId = Integer Fkey refs UserID
  - URL
    - String
 ### - Form Data
 - OBJId
 - Empty Form ID:
    - Integer
    - References empty form
 - FieldData:
    - This will be a mongo document that will change based on the form being submitted
    - Type: Obj
      - [Ex FieldData Obj](https://github.com/christophertalley/EZ-frontend/blob/master/documentation/Field%20Data%20Ex.PNG)
    
  
