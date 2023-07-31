import App from '../src';

const app = new App();
app.use(() => {
  return 'hello world';
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
