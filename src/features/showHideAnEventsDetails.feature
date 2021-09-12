Feature 2: Show/Hide an event's details

Scenario: An event element is collapsed by default.
Given user user hasn't expanded an event to see its details
When the user clicks the hide details button on that event
Then user will not be able to see details of that event

Scenario: User can expand an event to see its details.
Given the user has opened an event
When the user clicks on the show details button
Then the user will be able to see an event's details.

Scenario: User can collapse an event to hide its details.
Given user opened an event
When the user is clicking on the hide details button
Then details on an event should be hidden by the user.
