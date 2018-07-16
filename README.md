# Freedom Oriented Information Automation Database

The code, test cases, and the below examples are intended to provide sufficient documentation. Since this is my design I'm sure I overestimate how intuitive this is to others; please open an issue against me if you have a question :heart:

## Content Creators

Edit JSON documents in GitHub, have their content auto-linted on pull requests.

```
$> /project/0

{
  "description": "My First Project"
}
```

```
$> /project/1

{
  "description": "My First Project++"
}
```

```
$> /user/ari

{
  "gender": 1E+2
}
```

## Data Managers

Set lint rules by describing the data format expected.

```
$> /.foia-db

{
  "tables": {
    "project": {
      "key": {
        "type": "number",
      },
      "document": {
        "description": {
          "type": "string",
        }
      }
    },
    "user": {
      "key": {
        "type": "string",
      },
      "document": {
        "description": {
          "gender": "number",
        }
      }
    },
  }
}
```

## FOIA DB (Server)

Enforce lint rules and generate releases containing the compiled DB.

## FOIA DB (Client)

Downloads the DB, provides an API to access it.
