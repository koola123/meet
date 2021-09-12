Feature 3: Specify number of events

Scenario: When a user hasn't specified a number, 32 is the default number.
Given the user hasn't specified a number of events in a city
When the user didn't enter any number in the text field
Then user should see all events in that city he has specified - in total 32 events

Scenario: User can change the number of events they want to see.
Given the user is typing a number in the number of events textbox, he wants to see.
When the user types a number in the number of events textbox
Then the number the user types inside textbox is what's shown in the textbox
