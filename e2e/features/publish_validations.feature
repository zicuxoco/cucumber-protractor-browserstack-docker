@publish
Feature: To verify that a message is published
  correctly in GitHub Community

  Scenario: Checking if as a normal user I can publish a message
    Given browser cache is empty
    Given I go to the GitHub Community main page
    Then I click on sign in link button
    #And I see SignIn popop
    And I type Username: "********" and Pass: "*******"
    And I click on sign in button
    Then I see GitHub Main Page
    #And I click in a random Conversations topic
    And I click in Welcome topic
    And I click Start a topic button
    Then I validate "New Message" title is displayed
