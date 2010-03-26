<!DOCTYPE html>
<html>
    <head>
        <title>quicBlog Test Suite || GutZofter</title>

        <link rel="stylesheet" href="../../qunit/qunit.css" type="text/css" media="screen">
        <link rel="stylesheet" href="../quicBlog.css" type="text/css" media="screen">

        <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
        <script type="text/javascript" src="../../qunit/qunit.js"></script>
        <script type="text/javascript" src="../quicBlog.js"></script>
        <script type="text/javascript" src="quicBlog_tests.js"></script>
        <script type="text/javascript" src="placeHolder_tests.js"></script>

    </head>
    <body>
        <h1 id="qunit-header">quicBlog Test Suite</h1>
        <h2 id="qunit-banner"></h2>
        <div id="qunit-testrunner-toolbar"></div>
        <h2 id="qunit-userAgent"></h2>
        <ol id="qunit-tests"></ol>

        <?php
        require('../content.php');
        ?>

    </body>
</html>
