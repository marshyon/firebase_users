
import { initializeApp, applicationDefault } from 'firebase-admin/app';

import { getAuth } from "firebase-admin/auth";

let projectID = 'PROJECT_ID HERE';

initializeApp({
    credential: applicationDefault(),
    projectId: projectID,
});

// getAuth()
//     .getUserByEmail('jon@ajbc.co')
//     .then((userRecord) => {
//         console.log('Successfully fetched user data:', userRecord.toJSON());
//     })
//     .catch((error) => {
//         console.log('Error fetching user data:', error);
//     });

const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    getAuth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
        const user = userRecord.toJSON();
          console.log('user :', user.uid, 'email :', user.email, 'customClaims :', user.customClaims);
        //   console.log(user) 
          
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });
  };
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();



