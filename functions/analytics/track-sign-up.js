const functions = require('firebase-functions');
const { mixpanel } = require('../utils/mixpanel')

exports.trackSignUp = functions.auth.user().onCreate((user) => {
  // You can add more user properties here if needed
  mixpanel.track('Sign Up', {
    distinct_id: user.uid, // Use Firebase Auth UID as the distinct identifier
  });
});
