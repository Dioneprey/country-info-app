# the Country Info App - Dionatan

## Some of the technologies used

### Next.js
- TanStack Query
- TailwindCSS

### Nest.js
- Nest.js
- Redis ( cache )
- SOLID


## Setup

### Nest.js

Start Docker containers:
```
docker compose up -d
```

Install dependencies:
```
npm i
```

Fill in the .env file (You can find the example in .env.example)

Start the project:
```
npm run start:dev 
```

### Next.js

Install dependencies:
```
npm i
```

Fill in the .env file (You can find the example in .env.example)

Start the project:
```
npm run dev 
```

#API Routes

### Get available countries

<details>
 <summary><code>GET</code> <code><b>/available-countries</b></code> <code>(Get a list of all available countries)</code></summary>

##### Response

```json
 "countries": [
    {
      "countryCode": "AD",
      "name": "Andorra",
      "officialName": null,
      "region": null,
      "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg",
      "borders": [],
      "population": []
    }
  ],
```
</details>

### Get country info

<details>
 <summary><code>GET</code> <code><b>/country/:id</b></code> <code>(Get details of a country)</code></summary>

##### Response

```json
"country": [
  {
    "countryCode": "BO",
    "name": "Bolivia",
    "officialName": "Plurinational State of Bolivia",
    "region": "Americas",
    "flagUrl": null,
    "borders": [
      {
        "countryCode": "AR",
        "name": "Argentina",
        "officialName": "Argentine Republic",
        "region": "Americas",
        "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
        "borders": [],
        "population": [
          {
            "year": 2018,
            "value": 44494502
          }
        ]
      }
    ],
    "population": [
      {
        "year": 1960,
        "value": 3656955
      }
    ]
  }
]
```
</details>
