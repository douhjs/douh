# Node.js Server Framework `douh`

## Introduction

douh is node.js server framework.
super slow and heavy. but want to be fast and light.
Contributions are always welcome!

<hr/>

## Installation

```bash
$ npm install douh
```

## Usage

### Hello world

when return, douh will send response body.

```typescript
import App from 'douh';

const app = new App();

app.use(() => {
  return 'hello world!';
});

app.listen(3000);
```

### Middleware

douh supports async middleware.

```typescript
app.use(async (req, res, next) => {
  console.time('start');
  await next();
  console.timeEnd('end');
});
```

### Use Router

```typescript
import App, { Router } from 'douh';

const app = new App();
const router = new Router();

router.get('/ping', (req, res, next) => {
  return 'pong';
});

app.use(router.middleware());

app.listen(3000);
```

### bodyParser

you can use `bodyParser` middleware.

```typescript
import App, { bodyParser, Router } from 'douh';

const app = new App();
const router = new Router();

router.post('/ping', (req, res, next) => {
  console.log(req.body);
  console.log(req.files); // when content type is multipart/form-data
  return 'pong';
});

app.use(bodyParser);
app.use(router.middleware());

app.listen(3000);
```

### Use Service

you can use service with `@Service` decorator.
access service with `req.service`.

```typescript
import App, { Service } from 'douh';

@Service()
class DouhService {
  public hello(name: string) {
    return `hello ${name}`;
  }
}

const app = new App();
app.use(async (req, res) => {
  const result = req.service.userService.hello('douh');
  return result; // hello douh
});
```

### Use Repository

you can use repository with `@Repository` decorator.
access repository in service constructor.

```typescript
@Repository()
class DouhRepository {
  hello(name) {
    return `hello ${name}`;
  }
}

@Service()
class DouhService {
  constructor(private readonly douhRepository: DouhRepository) {}

  hello(name: string) {
    return this.douhRepository.hello(name);
  }
}

const app = new App();
app.use(async (req, res) => {
  const result = req.service.douhService.hello('douh');
  return result; // hello douh
});
```

### Use File Service

you can use file service with middleware.

```typescript
import App, { serveStatic } from 'douh';

const app = new App();

app.use(serveStatic('public')); // it must be placed before bodyParser
app.use(bodyParser);

app.listen(3000);
```
