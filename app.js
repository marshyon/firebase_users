
import { initializeApp, applicationDefault } from 'firebase-admin/app';

import { getAuth } from "firebase-admin/auth";

// linux
// export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
// windows
// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"

let projectID = process.env.PROJECT_ID;

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



