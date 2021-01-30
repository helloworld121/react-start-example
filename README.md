# react-start-example

# store date
* to store data we are using Firebase: https://firebase.google.com/
    * the selected database type should be **Realtime Database**
    * to configure protected access we are using the following **rules**:
      `{
        "rules": {
          "ingredients": {
            ".read": "true",
            ".write": "true",
          },
          "orders": {
            ".read": "auth != null",
            ".write": "auth != null",
            ".indexOn": ["userId"],
          }
        }
      }`
* all necessary configurations should be stored in a file **environment.json** the file **environment-template.json** could be used as a template


# init data
* add ingredients to the data store
     * add "child" with the name "ingredients" and add all ingredients (with their key/value pairs) ({"bacon":0,"cheese":0,"meat":0,"salad":0})

# setup authentication
* set up authentication in firebase
  * choose "Email/Password" under "Authentication > Sign-in method" => click "edit" and then "Enable" + "Save"
* lookup url-endpoint for authentication: https://firebase.google.com/docs/reference/rest/auth https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  * API_KEY: "Overview > Configuration" => API-Key

## using css module
* https://dev.to/0x96f/using-css-modules-with-create-react-app-22hd
