const fs = require('fs');
const { spawn } = require('child_process');

const uuid = require('uuid/v4');
const koa = require('koa');
const koaRouter = require('koa-router');
const koaStatic = require('koa-static');
const koaViews = require('koa-views');
const koaMulter = require('@koa/multer');


const app = new koa(); // Server
const router = new koaRouter(); // Router
const upload = new koaMulter(); // Upload middleware

// Views
app.use(koaViews(__dirname + '/views'));

// Serve CSS and JS as static
app.use(koaStatic(__dirname + '/css'));
app.use(koaStatic(__dirname + '/js'));

// Convertion function
const doConvert = file => new Promise((s, f) => {
  // Generate random names for input and outputs
  const id = uuid();
  const name = `/files/${id}.epub`;
  const outName = `/files/${id}.pdf`;

  // Write the buffer (from the upload)
  fs.writeFile(name, file.buffer, err => {
    if (err) {
      return f(err);
    }

    // Run Calibre's ebook-convert on the saved file
    const convert = spawn('ebook-convert', [name, outName]);

    convert.on('close', code => {
      if (code !== 0) {
        // The command failed, tell the user why
        return f(err);
      }

      // Everything went well, return the id of the output file
      return s(id);
    });
  });
});

// Upload an EPUB and trigger the convertion
/* eslint-disable require-atomic-updates */
router.post('/', upload.single('epub'), async ctx => {
  try {
    // Wait for convertion and redirect user
    const id = await doConvert(ctx.file);
    ctx.redirect(`/done/${id}`);
  } catch (e) {
    ctx.redirect('/error');
  }
});
/* eslint-enable require-atomic-updates */

// Homepage vue
router.get('/', async ctx => {
  await ctx.render('layout.swig');
});

// Done vue
router.get('/done/:id', async ctx => {
  const { id } = ctx.params;
  await ctx.render('done.swig', { id });
});

router.get('/error', async ctx => {
  await ctx.render('error.swig');
});

// Retrieve a converted file from its id
// These links are valid for 15 minutes
router.get('/pdf/:id', async ctx => {
  const { id } = ctx.params;

  ctx.attachment(`/files/${id}.pdf`);
  ctx.body = fs.createReadStream(`/files/${id}.pdf`);
});

app.use(router.routes());
app.listen(8080);
