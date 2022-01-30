
## QA
- Q: What do you think is wrong with the code, if anything?
- A: Yes, these are incorrect things:
    - In this current code, the User data is updated in the User_table before checking whether or not the shopId exits in the Shop_table.
    So if a shopId doesn't exist then any invitation for that shopId is "Invalid" & we shouldn't be updating the user details in the User_table using `findOneAndUpdate` function.

    In the ideal case, at first check whether or not shopId exists, if it does then check the invitation status otherwise send error 'No shop found'. If the invitation isn't added to shop then add it otherwise send error with message 'User already invited to this shop'

- Q: Can you see any potential problems that could lead to exceptions
- A:
  - This code should be updated. So as to add invitatioin only if it's missing. 
    ```
      if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
        shop.invitations.push(invitationResponse.body.invitationId);
      }
    ```
    to
    ```
    if (shop.invitations.indexOf(invitationResponse.body.invitationId)===-1) {
      // if invitations doesn't exists then add it to shops invitation list
      shop.invitations.push(invitationResponse.body.invitationId);
    }
    ```
    - This should be updated. In current schenario the if will be always true.
    ```
      if (shop.users.indexOf(createdUser._id) === -1) {
        shop.users.push(createdUser);
      }
    ```
    to
    ```
      if (shop.users.indexOf(createdUser._id) === -1) {
        shop.users.push(createdUser._id);
      }
    ```

    - findOneAndUpdate function we don't need to update the `authId` as it's not changed.
    - findOneAndUpdate function `new: true` isn't a valid param.
    - Authorization header should be sent to access auth url.

  - Catch block missing.
  - `invitationBody` can be of text type in that cases it's to be parsed to JSON format.




    