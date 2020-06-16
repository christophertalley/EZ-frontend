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
    -  Will be an array of strings used to signal different types of input
  - UserId = Integer Fkey refs UserID
  - URL
    - String
 ### - Form Data
 - OBJId
 - Empty Form ID:
    - Integer
    - References empty form
 - FieldData:
    - Type: Obj
      - This will be a mongo document that will change based on the form being submitted
      - [Ex FieldData Obj](https://github.com/christophertalley/EZ-frontend/blob/master/documentation/Field%20Data%20Ex.PNG)
    
  
