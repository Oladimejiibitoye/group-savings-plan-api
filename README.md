# MVP WALLET SERVICE

## Lendsqr Backend Engineer Assessment

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

You are required to build an MVP (Minimum viable product) wallet service where:

- A user can create an account
- A user can fund their account
- A user can transfer funds to another user’s account
- A user can withdraw funds from their account.

## Installation

Install the dependencies and devDependencies and start the server.

```sh
npm install
npm run tsc
npm run start
```

For production environments...

```sh
npm run prod
```

## Endpoint

### Signup

```sh
{base_url}/api/auth/signup
method: post
json
{
"name": "string",
"email": "string",
"password": "string"
}
```

### Signin

```sh
{base_url}/api/auth/login
method: post
json
{
"email": "string",
"password": "string"
}
```

### Change Password

```sh
{base_url}/api/auth/change-password
method: patch
Authorization - Bearer Token
json
{
"oldPassword": "string",
"password": "string"
}
```

### Get Users

```sh
{base_url}/api/users
method: get
```

### Get User

```sh
{base_url}/api/users/user
Authorization - Bearer Token
```

### Create Saving Plan

```sh
{base_url}/api/saving-plan/create
method: post
Authorization - Bearer Token
json
{
    "title": "string",
    "number_of_saving_buddy": number,
    "target_set": boolean,
    "saving_process": "string",
    "saving_frequency": "string",
    "twelve_month_saving_target": number,
    "saving_start": "date"

}
```

### Invite Buddy

```sh
{base_url}/api/saving-plan/invite/{saving_plan_id}
method: post
Authorization - Bearer Token
json
{
"name": "string"
}
```

### Accept Invite

```sh
{base_url}/api/saving-plan/status/{buddy_id}?acceptance=accepted
query params: {
  acceptance : accepted
}
method: get
Authorization - Bearer Token

```

### Reject Invite

```sh
{base_url}/api/saving-plan/status/{buddy_id}?acceptance=rejected
query params: {
  acceptance : rejected
}
method: get
Authorization - Bearer Token

```

## Postman
