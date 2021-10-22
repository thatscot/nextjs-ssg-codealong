# AND Digital AWS Next.js App

This project is designed to remove set up pain and streamline getting a Next.js app up and running on AWS Amplify.

----

## Infrastructure

This project is designed to be deployed on _AWS Amplify_ :- https://aws.amazon.com/amplify/

Under the hood, Amplify uses:

- [S3 Bucket](https://aws.amazon.com/s3/)
- [Cloudfront](https://aws.amazon.com/cloudfront/)

🔊🔊
----

## Stack 🥞 & Prerequisites

To get yourself off the ground ✈️ you will need to install the following:

- [AWS](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html)
- [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- [Next](https://nextjs.org/)

----

## How to run locally 🏃‍♂🏠

If you want to export statically and run:

(the below builds 🔨 and exports static files to dir _/out_ )

```
yarn build
```  

```
yarn start
```

Then hit up port 3000 🔌

If you want to benefit from real time changes then run:

```
yarn dev
```

----

## How to deploy to AWS ☁️☁️

To deploy to Amplify you must run:

```
cd terraform
```

```
terraform init 
```

```
terraform apply
```

Then just follow the steps in the CLI.

_Note :- you will need a git access token for it_

One Terraform has run you can check your output at :

- [Amplify Console](https://eu-west-2.console.aws.amazon.com/amplify/home?region=eu-west-2#/)

----

## Scripts 📜 📜

The following yarn scripts can be run from the root of the project:

|  Script   |                             Description                              |
| :----------- | :------------------------------------------------------------------ |
|`yarn build` | build the package |
|`yarn test` | runs tests with coverage |
|`yarn lint:fix` | runs the linter to correct errors, bugs and stylistic errors |
|`yarn dev` | compiles and starts the frontend development server |

----

## Husky 🐺🐺

The project uses Husky for git hooks which allows us to run scripts in cohesion with git commands.

- `pre-commit`, which runs the [linter](https://eslint.org/docs/user-guide/getting-started) before you commit any code.
  It also runs all the tests and won't commit unless they all pass.

----