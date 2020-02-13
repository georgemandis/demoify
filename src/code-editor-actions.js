module.exports = (editor, mainEditor) => {
  /**
   * Save demo stuff to localstorage
   */

  let actions = [];

  editor.addAction({
    id: "save-json-local-storage",
    label: "✅ Save Demo URLs",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: "navigation",
    // contextMenuOrder: 0.15,

    run: function(ed) {
      // delete existing from menu
      removeDemosFromQuickLaunch();

      // add new ones to localstorage
      const data = JSON.parse(demoURLsEditor.getValue());
      localStorage.setItem("demoURLs", JSON.stringify(data));

      // update quick launch menu
      addDemosToQuickLaunch();
    }
  });

  /**
   * Open arbitrary file in editor
   */

  editor.addAction({
    id: "open-file-in-editor",
    label: "Open File",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_O],
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: "navigation",
    // contextMenuOrder: 0.15,

    run: function(ed) {
      const { ipcRenderer } = require('electron');
      ipcRenderer.send('request-open-file', true);
    }
  });

  /**
   * Open Demo URLs
   */

  editor.addAction({
    id: "launch-demos",
    label: "Launch All Demos",    keybindings: [],
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: "navigation",
    // contextMenuOrder: 0.15,

    run: function(ed) {
      const data = JSON.parse(demoURLsEditor.getValue());
      const { shell } = require("electron");

      data.forEach(url => {
        console.log(url);
        const label = Object.keys(url)[0];
        shell.openExternal(url[label]);
      });
    }
  });

  /**
   * Togle webcam
   */
  editor.addAction({
    id: "toggle-in-view-webcam",
    label: "📸 Webcam ",
    keybindings: [
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_2,
      // chord
      monaco.KeyMod.chord(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K,
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M
      )
    ],
    precondition: null,

    keybindingContext: null,
    contextMenuGroupId: "navigation",
    // contextMenuOrder: 0.1,

    run: function(ed) {
      if (mediaStreamObject.active) {
        mediaStreamObject.getTracks()[0].stop();
        document.querySelector("video").classList.remove("visible");
        document.querySelector("video").style = zIndex = -1;
      } else {
        startWebCam();
      }

      return null;
    }
  });

  /**
   * Toggle demo URL JSON editor
   */

  editor.addAction({
    id: "toggle-json-demo-editor",
    label: "🖥 Edit Demo URLs",
    keybindings: [
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_1
      // chord
      // monaco.KeyMod.chord(
      //   monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K,
      //   monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_E
      // )
    ],
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: "navigation",
    // contextMenuOrder: 1,

    run: function(ed) {
      const demos = document.querySelector("#demos");

      demos.classList.toggle("visible");

      if (demos.classList.contains("visible")) {
        demoURLsEditor.focus();
      } else {
        mainEditor.focus();
      }
    }
  });

  /**
   * Instantiate the quick command palette
   */
  const quickCommandAction = editor.getAction("editor.action.quickCommand");

  editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_P,
    quickCommandAction._run
  );

  addDemosToQuickLaunch();
  
  /**
   * Make the Demos quick-launchable
   */
  function addDemosToQuickLaunch() {

    const demos = JSON.parse(demoURLsEditor.getValue());    
    demos.forEach((demo, index) => {
      const label = Object.keys(demo)[0];
      const url = demos[label];

      actions.push(editor.addAction({
        id: `launch-demo-${index}`,
        label: `🚀Launch Demo: ${label}`,
        keybindings: [
          // monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_1,
          // chord
          monaco.KeyMod.chord(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K,
            monaco.KeyMod.CtrlCmd | monaco.KeyCode[`KEY_${index + 1}`]
          )
        ],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: "navigation",
        // contextMenuOrder: 1,

        run: function(ed) {
          alert(url);
        }
      }));

    });
    
  }

  /**
   * Make the Demos quick-launchable
   */
  function removeDemosFromQuickLaunch() {
    console.log(actions);
    actions.forEach((thing) => {
      thing.dispose();
    });
    
    
  }
};
