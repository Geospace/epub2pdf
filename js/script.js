const fileInput = document.getElementById('upload-input');
const uploadForm = document.getElementById('upload-form');
const formOrLoad = document.getElementById('form-or-load');
const working = document.getElementById('content');

fileInput.onchange = () => {
  uploadForm.submit();

  const name = fileInput.files[0].name;
  working.innerHTML = `
    <p>We started processing file <code>${name}</code>. This will take
    some time... Please, do not leave this page. <a href="#">Click here to cancel.</a></p>
  `;

  console.log(formOrLoad);
  formOrLoad.innerHTML = '<div class="spinner" id="loading" />';
};
