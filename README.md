# Ablaze
## Project Details
Project Name: Ablaze

Project Description: Ablaze is a web app that supports Asian Americans and Pacific Islanders (AAPI) businesses and creators. We hope to spread awareness of the AAPI businesses that exist in a user’s area, as well as draw attention to the many talented AAPI creators and artists out there. 

Team Members:
- Joyce Li (jli455)
- Lisa Liong (lliong)
- Karis Ma (jma78)
- Kelly Wei (kwei8)

Github Repo: https://github.com/cs0320-f23/term-project-lliong-jma78-kwei8-jli455.git

## Intended Audience and Users
Our project is called Ablaze, and the goal of Ablaze is to support Asian American and Pacific Islander (AAPI) owned busiensses and creators. The rise in anti-Asian sentiment during the COVID-19 pandemic disproportionately affected AAPI-owned businesses, and Ablaze seeks to support AAPI businesses and creators by increasing awareness. Ablaze spotlights dozens of AAPI-owned businesses in the Boston area, and our future goal is to expand our app to more cities across the country. [add spotify stuff]

## Design Choices
In the backend, we divided the project into two parts: businesses and creators. To receive information on all available businesses, the program returns a json mapping eaech business to its information. To receive information on specific subsets of businesses (such as restaurants or grocery stores), the backend returns a list of businesses matching the criteria. Since the backend ranks each restaurant based on criteria such as number of reviews and ratings, we did not use a Map data structure because it will be unranked. 

## Errors and Bugs
...

## Tests
We implmented integration tests and mocks in the backend. Since the Spotify API and Yelp API can be difficult to call, mocks help us test individuals methods without needing to actually call the APIs.

## How to...
To install all required packages in the backend, run 'mvn install' in your terminal. Then, nevigate to the "Server" class to start the backend server.

## Credits
- APIs used: Spotify, Yelp
- Spotify API Wrapper: https://github.com/spotify-web-api-java/spotify-web-api-java
- Regex: CS32 Staff and https://stackoverflow.com/questions/1757065/java-splitting-a-comma-separated-string-but-ignoring-commas-in-quotes
- We scraped the following website for information about AAPI-owned businesses in Boston: https://www.boston.com/community/readers-say/aapi-and-asian-owned-businesses-to-shop-support-in-greater-boston/
