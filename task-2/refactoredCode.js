const TOKEN = 'abc';
/**
 * updates User & Shop if invitation is valid
 * @param {object} shop 
 * @param {object} invitationResponse 
 * @param {object} invitationBody 
 */
const updateUserAndShop = (res, shop, invitationResponse, invitationBody) => {
  if (invitationResponse.status === 201) {
    User.findOneAndUpdate({
      authId: invitationResponse.body.authId
    }, {
      email: invitationBody.email
    }, {
      upsert: true
    }, function (err, createdUser) {
      if (shop.invitations.indexOf(invitationResponse.body.invitationId) === -1) {
        shop.invitations.push(invitationResponse.body.invitationId);
      }
      if (shop.users.indexOf(createdUser._id) === -1) {
        shop.users.push(createdUser._id);
      }
      shop.save();
    });
  } else if (invitationResponse.status === 200) {
    res.status(400).json({
      error: true,
      message: 'User already invited to this shop'
    });
    return;
  }
  res.json(invitationResponse);
}

exports.inviteUser = (req, res) => {
  const invitationBody = req.body;
  const shopId = req.params.shopId;
  const authUrl = "https://url.to.auth.system.com/invitation";

  // at first find for the shopId
  Shop.findById(shopId).exec(function (err, shop) {
    if (err || !shop) {
      return res.status(500).send(err || { message: 'No shop found' });
    } else {
      // if shop exists, update User & Shop
      superagent
        .post(authUrl)
        .set('Authorization', 'bearer ' + TOKEN )
        .send(invitationBody)
        .end(
          (err, invitationResponse) => {
            updateUserAndShop(res, shop, invitationResponse, invitationBody);
          }
        )
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            error: true,
            message: 'Internal server error'
          })
          return;
        })
        ;
    }
  });
};