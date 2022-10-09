var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('callbackURL', 'https://eo43jb9pge46lqq.m.pipedream.net');
data.append('userDetails.address.streetAddress', 'Oxford Street House 1');
data.append('userDetails.address.city', 'Zabbar');
data.append('userDetails.address.zip', 'ZBR1803');
data.append('userDetails.address.country', 'MT');
data.append('userDetails.firstName', 'FABIAN');
data.append('userDetails.lastName', 'RUIZ');
data.append('userDetails.emailAddress', 'dssdfsdsdsdsdf@gmail.com');
data.append('userDetails.dateOfBirth', '1989-11-17');
data.append('userDetails.nationality', 'MT');
data.append('userDetails.locale', 'en');
data.append('ongoingCheck', 'false');
data.append('file', 'data:image/jpeg;name=id_card_sample.jpeg;base64,/9j/4AAQSkZJRgABAQEAyADIAAD/4RDSRXhpZ');
data.append('type', 'PASSPORT');
data.append('number', '32323');
data.append('issueDate', '1990-01-01');
data.append('expiryDate', '2025-01-01');
data.append('file', 'data:image/png;name=no_parking.png;base64,iVBORw0KGgoAAAANSUhEUgAAAigAAAIoCAYAAABDDRCFAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH2wYPAyIc0vsHjAAAIABJREFUeJzs3Xl8VdW9/vHPPidzAiFhEBUFJAELQm0dwLFiraV2criIVqu2WlsHHG+L9udQvVq9VSmOVFGvVq1jtVcrWmzFq3VqtVYtCCSA4gQyJQyZc/bvj5NYRCD');
data.append('type', 'UTILITY_BILL');
data.append('backgroundChecks.ongoingCheck', 'false');
data.append('note', 'selfie note');
data.append('fraudCheckId', 'b58fc016-0682-4303-87b8-cf6dc36c9e95');
data.append('faceAttachment', fs.createReadStream('t.txt'));
data.append('identityDetails.attachment.file', fs.createReadStream('t.txt'));
data.append('identityDetails.attachment.type', 'PASSPORT');
data.append('identityDetails.identity.number', '32232');
data.append('identityDetails.identity.issueDate', '2020-01-01');
data.append('identityDetails.identity.expiryDate', '2025-01-01');
data.append('addressAttachment.file', fs.createReadStream('t.txt'));
data.append('addressAttachment.type', 'UTILITY_BILL');

var config = {
  method: 'post',
  url: 'https://api.sekuritance.com/verification/v2/kyc',
  headers: { 
    'Accept': '*/*', 
    'Origin': '', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWt1cml0YW5jZSIsImlhdCI6MTY2MzAxODIzMCwiZXhwIjoxNjYzMDIwMDMwLCJqdGkiOiJkOGY4NzcwNy1mMmVhLTQ2MjctYTIwYi01NjJkMzQxODE0MDQiLCJ1c2VybmFtZSI6ImFwaUB2aWlvLmNvbSIsImNyZWRlbnRpYWxzSWQiOiI2MDZiMDcwZC05ODEyLTRiZGUtODNlNi00ODcxNDc3ZTcwYTYiLCJzdWJNZXJjaGFudElkcyI6W10sIm1lcmNoYW50SWQiOiJmYWUxNTk1NS05ZTBjLTRhMDktYTQxNS1jNzM4YTQ3OGRjMDMiLCJhdXRoZW50aWNhdGVkIjp0cnVlLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIiwiUk9MRV9WRVJJRllfVVNFUiJdLCJwcm9kdWN0cyI6WyJLWUMiXSwib3JpZ2luYWxVc2VyIjpudWxsfQ.IXUByBRGM4COeczthwr5hu_5NkCuGBAq-gEjJ9Z1Bgk', 
    'Cookie': 'Authorization=Bearer+eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWt1cml0YW5jZSIsImlhdCI6MTY2MzAxNzQ4MywiZXhwIjoxNjYzMDE5MjgzLCJqdGkiOiIyYmUwNTg3Mi1hNzY5LTQ4N2UtYWRmMy1hMmEzMDgwMWU4ODYiLCJ1c2VybmFtZSI6ImRldmVsb3BlckB2aWlvLmNvbSIsImNyZWRlbnRpYWxzSWQiOiJkOWZjNjhkOS05OWU5LTRiM2MtYTgxZC1kZmNhMzc4YWE0MjkiLCJzdWJNZXJjaGFudElkcyI6W10sIm1lcmNoYW50SWQiOiJiYWMwMTBiNS03YTFmLTRjNWQtODQ1Yi04MmYyNmU1YjhmY2EiLCJhdXRoZW50aWNhdGVkIjp0cnVlLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIiwiUk9MRV9WRVJJRllfVVNFUiJdLCJwcm9kdWN0cyI6W10sIm9yaWdpbmFsVXNlciI6bnVsbH0.j7KGp-9Jpjzt6Ywq55hlrlk3fWQe2wbVsVIjTw_s-ok', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
