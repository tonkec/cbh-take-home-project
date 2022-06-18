# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
## 1 Fetch the database id
 - Get the current user from database by their database id
 - store database id for further reference into state management

 #### Time: 30 minutes

## 2 Create UI for the user input of custom id
 - Create beautiful and appealing input
    - check the color system of the codebase
    - check the fonts of the codebase
    - check the spacings of some other inputs
    - check other inputs in the codebase
 - Have a placeholder say "Your custom id"
 - Put some limits on the string for custom id
    - validate input as user types
        - can not have spaces
        - can not have speical characters (!#$%)
        - can not be longer than 8 caharacters
        - must have at least 4 characters
        - can not be empty
 - Have next to an input field some validation info for the user
    - min characters 4
    - max characters 8
 - Have a beautiful button with text "Change my id"
    - check colors of the system
    - check other buttons in the codebase
 
 #### Time: 1 hour 

## 3 Prepare the architecture for the form submission
 - Store new custom id to the application state first
    - have it accessible across the components
        - input component that 
            - renders an input
            - has validation
            - create validation helper methods
                - make them abstract
                - make them reusable
                    - no hard coding
                    - allows the parsing of the input value
            - move input to the components folder
        - submit button component that
            - renders a button
            - sends an api POST request with a helper method
                - trigger POST request on the first click
        - API helpers
            - create an axios instance
            - store the db url to DATABASE_URL constant
            - create POST request with the existing axios instance
            - use axios interceptors
                - check if online/offline
            - move API file to the api folder
            - export function
 
 #### Time 2 hours

## 4 Submit the input form
 - On the submit of the form check the validity of the string
    - prevent user from double clicking the submit button
        - make button disabled after the first click
    - check if a user is online
        - if not online, prevent the submission
            - show an error message
                - should be red
                - should have text "Waiting for the internet connection..."
                - disable submit button
        - if online, continue with the submission
            - check if string is valid
                - if not valid, prevent sumbission
                    - show an error message 
                    - an error message should have info about how to fix the validation error
                        - "can not have empty spaces"
                        - "id is too long"
                        - "id is too short"
                        - "no special characters allowed"
                - if valid, continue with submission
                    - on submit 
                        - downcase all characters in the id
                        - check if id is the same as someone else's id
                            - show the error message if it is the same
                            - error message should say "Something went wrong. Please use another id"
                        - manage different states of the submit button
                            - before submit
                                - should be green
                                - should have text "Change my id"
                            - waiting for response
                                - should be disabled
                                - should have pointer "not-allowed"
                                - should have text "Sending..."
                                - loader should appear in the button
                                    - spinner
                                    - should be animated
                                - should be yellow
            - Check the response of the database
                - If everything goes well, show a success message
                    - should be green
                    - should disappear after 2000 miliseconds
                    - should inform the user about their new updated custom id
                    - should show the new custom id on the user profile page
                    - should be redirected to the profile page
                - If something goes wrong, show an error message
                    - should be red
                    - should disappear after 2000 miliseconds
                    - should have a text "Something went wrong, please try again."
                    - should have a link to the input for submitting a new custom_id
                    - error should be caught
                        - flow must continue on exception
                        - error should not break the app

 #### Time: 3 hours