<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <title>quicBlog || Only the finest dog food</title>
        <script type="text/javascript" src="scripts/jquery-1.4.2.js"></script>
        <script type="text/javascript" src="scripts/showdown.js"></script>
        <script type="text/javascript" src="scripts/quicBlog.js"></script>
        <script type="text/javascript" src="scripts/quicBlog-ui.js"></script>
        <link rel="stylesheet" href="styles/quicBlog.css" type="text/css" media="screen"></link>
    </head>

    <body>
        <noscript><h2>You'll need to enable Javascript to use this tool.</h2></noscript>
        <div id="pageHeader">
            <h1>quicBlog</h1>
        </div>

        <div id="leftContainer">
            <div class="paneHeader">
                <span>Input</span>
            </div>
            <textarea id="inputPane" cols="80" rows="20" class="pane"></textarea>
        </div>

        <div id="rightContainer">
            <div class="paneHeader">
                <select id="paneSetting">
                    <option value="previewPane">Preview</option>
                    <option value="outputPane">HTML Output</option>
                    <option value="syntaxPane">Syntax Guide</option>
                </select>
            </div>
            <textarea id="outputPane" class="pane" cols="80" rows="20" readonly="readonly"></textarea>
            <div id="previewPane" class="pane"></div>
            <textarea id="syntaxPane" class="pane" cols="80" rows="20" readonly="readonly"></textarea>
        </div>

        <div id="footer">

            <span id="byline">Only the finest dog food!</span>
                <span id="convertTextControls">
                <button id="convertTextButton" type="button" title="Convert text now">
				Convert text
                </button>

                <select id="convertTextSetting">
                    <option value="delayed">in the background</option>
                    <option value="continuous">every keystroke</option>
                    <option value="manual">manually</option>
                </select>
            </span>
            <div id="processingTime" title="Last processing time">0 ms</div>
        </div>
    </body>
</html>