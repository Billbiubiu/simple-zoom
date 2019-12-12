function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
      try {
          let str = ''
          ctx.req.on('data', (data) => {
              str += data
          })
          ctx.req.on('end', () => {
            resolve(str)
          })
      } catch (err) {
          reject(err)
      }
  });
}

post('/api/json').to.handle(async (ctx) => {
  let data = await parsePostData(ctx);
  console.log(JSON.parse(data));
  ctx.body = data;
})