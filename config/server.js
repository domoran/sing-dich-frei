

module.exports = ({ env }) => {
const host = env('HOST', '0.0.0.0'); 
const port = env.int('PORT', 1337);
const publicHost = env('PUBLICHOST', 'localhost');
const publicPort = env('PUBLICPORT', 8080)

const exports = {
  host: host,
  port: port,
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'ed2cdecabbb5910e7b76efcb70ddd329'),
    },
  },
}

console.log(exports); 
return exports; 
};
