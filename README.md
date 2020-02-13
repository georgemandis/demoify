# Demoify

An Electron app for live demos at conferences. It gives me:

- A Monaco editor that lets me open files and walk through the code
- A toggalable in-window webcam view I can call from the command palette (Useful for my hardware demos on stage)
- A special "Demo" panel that stores a JSON file to localStorage and allows me to quickly open any of the URLs in that structure in a real browser with some keystrokes.



## Shortcuts:

- Command/Ctr+1: Edit the demo URLs JSON
- Command/Ctr+2: Star the webcam
- Command/Ctr+O: Open a file in the editor (can't save or make changes)
- Command/Ctr+S: Save current state of demo URLs JSON to localStorage
- Command/Ctr+K+[1-9] (Chord): Launch the specific demo from your JSON

You can also do Command/Ctrl+P to get the full Command Palette.