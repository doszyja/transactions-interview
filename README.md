
## Introduction

Acordingly to requirements application uses React and Typescript. Additionaly Nextjs added.
Not much time to do everything as tidy as want (1 day). However all excercise steps complete.

// Dominik Szyja
## App description

To run application, run following commands in task directory:

    yarn
	yarn dev

Server will be available on http://localhost:3000.

## Excercise description

Application should contain list of bank transactions, based on design structure from _design.png_ file and contain following functionalities:

1.  Transactions fetched from API, displayed in table or list.
2.  Pagination (infinite-scroll or traditional, 20 items per page)
3.  Filtering by `beneficiary` field
4.  Form for adding new transaction to the list with basic non-empty fields validation. Add input fields for:
    -   amount (must be positive)
    -   account number (not empty, numbers)
    -   address
    -   description
    -   date and id should be generated when submiting form
5.  Simple communicate when success/error after form submission.
6.  Removing transaction from the list (please add animation for that)
7.  Balance should be calculated based on already filtered transactions.

NOTE: Points 2-6 can be done on front-end side only.
