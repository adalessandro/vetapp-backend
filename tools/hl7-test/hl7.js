// eslint-disable-next-line @typescript-eslint/no-var-requires
const hl7 = require('simple-hl7');

const args = process.argv.slice(2);
const filename = args[0];

if (!filename) {
  console.error('Need filename argument');
  process.exit(1);
}

const parser = new hl7.Parser({ segmentSeperator: '\n' });
const client = hl7.Server.createTcpClient({
  host: 'localhost',
  port: 7777,
  keepalive: true,
  callback: function (err, ack) {
    if (err) {
      console.log('*******ERROR********');
      console.log(err.message);
    } else {
      console.log(ack.log());
    }
  },
});

const msg = parser.parseFileSync(filename);

console.log('************sending message****************');
client.send(msg);

setTimeout(function () {
  process.exit();
}, 5000);
