# Requirements

- A user must be able to easily register to vote/use the site. We want them to register so it's easier to limit votes.
- Do not keep any user's PII
  - Perhaps make a user key an hashed version of their email address
  - When they want to vote they have to enter an email
  - It's hashed on the client and kept in localstorage
  - Sign up simply stores this hash along with vote count and last vote timestamp
  - Voting sends the user's hash so that a vote count can be incremented.
- Limit user votes to X/day
- A user can vote for the same beer more than once
- Voting is prevented if the user has maxed their vote count in a given 00:00 to 23:59 period. So you could max vote at 23:59 and then again at 00:00, but only once. To make life simple, just keep it in the time zone of the server
  - This implies that we need some kind of server beyong just serving up static files. Perhaps just a lambda for votes?
- Landing page should display a rank list of beers up for voting. Perhaps a sidebar or callout with beers on tap, in process, etc.
  - That implies that we need a beer to be in different states: draft, up for vote, brewing (WIP), on deck (finished, but not on tap), on tap, empty/off tap/kicked
- A beer should have the following properties
  - Name: string
  - Style: string - not specific to any guide
  - Description: string - any short description that's appropriate to further define it
  - ?Image: url
  - ABV min, max, actual: numbers - give a range for voting and actual once complete
  - Tags: string[] - some vague flavor and aroma descriptors like hoppy/bitter, dark, coffee, fruity, sweet...
  - It's probably a good idea to keep track of beer serving format as well: keg/draft, bottle (size), can(size)
- Future: it would be nice to allow users to vote on names for the beers, too.
- Future: Give some kind of tracker for progress once a beer is selected for brewing.
  - Narrowing "error bars" for release?
- Future: Give users some way to suggest new beers.
  - Maybe some kind of "beer builder". Aroma, Flavor, Mouthfeel descriptors

# Thoughts

- Firebase firestore backend seems like a decent idea
- I'll need a web server for static files and some tiny server or serverless thing for voting
  - Look at firebase hosting and Google Cloud Functions
- Commercial: pre sell the beers.
  - People can say they'd pay \$X per pint. Charge and hold credit card.
  - People vote with dollars to fund a beer - "kickstarter model"
  - People pay \$X/month to get access to releases - "patreon model"
  - have to pick up by X date
