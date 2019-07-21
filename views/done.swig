{% extends 'layout.swig' %}

{% block content %}
<p>Done! We finished converting your file and the download should have
started automatically. Please, <a href="/pdf/{{ id }}">click here</a> if
it is not the case.</p>

<p>The download link is valid for 15 minutes. You may now leave this page
or convert another file.</p>

<script>
  setTimeout(() => window.location = '/pdf/{{ id }}', 200);
</script>
{% endblock %}
