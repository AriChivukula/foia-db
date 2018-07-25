# Freedom Oriented Information Automation Database

The code, test cases, and the below examples are intended to provide sufficient documentation. Since this is my design I'm sure I overestimate how intuitive this is to others; please open an issue against me if you have a question :heart:

## Creation

Edit JSON documents in GitHub, have their content auto-linted on pull requests.

```
<DB_REPO>/db/project/00

{
  "description": "My First Project"
}
```

```
<DB_REPO>/db/user/ari

{
  "gender": 1E+2
}
```

```
<DB_REPO>/db/project/00--EDGE--creator/user/ari

{
}
```

## Cleaning

Set lint rules by describing the data format expected.

```
<DB_REPO>/.foia-db

{
  "vertices": {
    "project": {
      "id": {
        "type": "number"
      },
      "properties": {
        "description": {
          "type": "string"
        }
      },
      "edges": {
        "creator": {
          "type": "user"
        }
      }
    },
    "user": {
      "id": {
        "type": "string"
      },
      "properties": {
        "gender": {
          "type": "number"
        }
      }
    }
  }
}
```

## Compilation

Enforce lint rules and generate releases containing the compiled DB.

```
<DB_REPO>/.travis.yml

language: node_js
node_js:
- node
install: npm install foia-db
jobs:
  include:
  - stage: Lint
    if: ( type = push ) AND ( branch != master )
    script: npx foia-db
  - stage: Release
    if: ( type = push ) AND ( branch = master )
    script: npx foia-db --compile
```

## Reading

Make use of the stored data.

```
<DB_REPO>/example.ts

import { Graph } from "foia-db";

... = Graph.read()...;

```
