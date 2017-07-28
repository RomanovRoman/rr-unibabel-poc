
const tplHelloWorld = env => `Hello world! (${ env })`;

export function HelloWorld(env) {
  const msg = tplHelloWorld(env);
  console.log(msg);
  return msg;
}
