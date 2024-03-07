export default () => ({
  port: parseInt(process.env.PORT) || 3001,
  secret: process.env.SECRET,
});
