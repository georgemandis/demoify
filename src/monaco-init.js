module.exports = (() => {
  (function() {
    const path = require("path");
    const amdLoader = require("../node_modules/monaco-editor/min/vs/loader.js");
    const amdRequire = amdLoader.require;
    const amdDefine = amdLoader.require.define;

    function uriFromPath(_path) {
      var pathName = path.resolve(_path).replace(/\\/g, "/");
      if (pathName.length > 0 && pathName.charAt(0) !== "/") {
        pathName = "/" + pathName;
      }
      return encodeURI("file://" + pathName);
    }

    amdRequire.config({
      baseUrl: uriFromPath(
        path.join(__dirname, "../node_modules/monaco-editor/min")
      )
    });

    // workaround monaco-css not understanding the environment
    self.module = undefined;

    const themeData = require("./themeData.js");

    amdRequire(["vs/editor/editor.main"], function() {
      monaco.editor.defineTheme("myCustomTheme", themeData);

      editor = monaco.editor.create(document.getElementById("container"), {
        value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
          "\n"
        ),
        language: "javascript",
        fontSize: "22px",
        minimap: {
          enabled: false
        },
        automaticLayout: true,
        theme: "myCustomTheme"
      });

      // check for localstorage data first
      const savedDemoURLs = JSON.parse(localStorage.getItem("demoURLs"));

      const value = savedDemoURLs
        ? JSON.stringify(savedDemoURLs, null, 2)
        : [`[{`, `\t"Demo #1": "https://localhost/8080"`, `}]`].join("\n");

      demoURLsEditor = monaco.editor.create(document.getElementById("demos"), {
        value: value,
        language: "json",
        fontSize: "14px",
        lineNumbers: false,
        selectionHighlight: false,
        minimap: {
          enabled: false
        },
        scrollbar: {
          useShadows: false,
          verticalHasArrows: true,
          horizontalHasArrows: true,
          vertical: "hidden",
          arrowSize: 30
        },
        automaticLayout: true
      });

      require("./code-editor-actions.js")(editor, editor);
      require("./code-editor-actions.js")(demoURLsEditor, editor);
      // require("./demo-editor-actions.js");

      editor.focus();
    });
  })();
})();
