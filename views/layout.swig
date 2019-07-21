<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>EPUB2PDF</title>

    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/spinner.css">
  </head>

  <body>
    <a href="/">
      <h1 id="big-title">EPUB2PDF</h1>
    </a>

    <p>Click the button and pick an EPUB file. It will be converted to PDF
    using <a href="https://manual.calibre-ebook.com/generated/en/ebook-convert.html">
    Calibre's</a> <code>ebook-convert</code>, with the default options. The
    download will start automatically when the conversion finishes.</p>

    <div id="form-or-load">
      <form action="/" enctype="multipart/form-data" method="post" id="upload-form">
        <div class="upload-btn-wrapper">
          <button class="upload-btn">Pick an EPUB</button>
          <input type="file" name="epub" multiple="multiple" id="upload-input">
        </div>
      </form>
    </div>

    <div id="content">
      {% block content %}{% endblock %}
    </div>

    <script src="/script.js"></script>
  </body>
</html>
