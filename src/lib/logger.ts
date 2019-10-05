import bunyan from 'bunyan';
import formatOut from 'bunyan-format';

export default bunyan.createLogger({
  name: process.env.NAME || 'Mikrop',
  stream: new formatOut({ outputMode: 'short' }),
});
