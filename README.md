# WBA2SS18
SwapPapers

Repo clonen, mit cd in den Ordner wechseln und folgenden Befehl ausfuehren: npm install
Programm starten: node server.js dienstnutzer/dienstnutzer
Folgende abfragen sind mittels testclients wie Postman möglich:

GET                                                    GET
users                                                  documents/name/:id
users/:id                                              documents/isbn/:isbn
users/newUsers                                         documents/newDocuments

POST                                                   POST
users                                                  documents

PUT                                                    PUT
users/:id                                              documents/:id

DELETE                                                 DELETE
users/:id                                              documents/newDocuments/:id
