# Node.js Server Framework `douh`

## Introduction

douh is node.js server framework.

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
