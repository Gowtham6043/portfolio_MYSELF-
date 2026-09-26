# Gowtham Portfolio — editable in VS Code

Your complete anime-themed portfolio, with readable HTML/CSS, artwork, animations,
and a Python preview server. No npm, pip packages, API keys, or build step required.

## Start on Windows
1. Extract the entire ZIP. Do not edit files inside the ZIP viewer.
2. Open VS Code. Choose File > Open Folder and select `gowtham-portfolio`.
   You can also open `gowtham-portfolio.code-workspace`.
3. Press Ctrl+Shift+B and choose **Preview portfolio** if asked.
4. The server opens your browser at http://127.0.0.1:5500/.
5. Edit a file, press Ctrl+S, then refresh the browser with Ctrl+R.
6. To stop, select the preview terminal and press Ctrl+C.

The preview requires Python 3. Check it in the VS Code terminal with `py --version`.
If `py` is unavailable but `python --version` works, run `python serve.py` instead.
You can also double-click `start-preview.cmd` outside VS Code.

### No Python available?
Open `dist/index.html` directly in your browser. All portfolio content and animations
work without a server. Save and manually refresh after edits.

### macOS / Linux
Run `python3 serve.py` from the extracted project folder.

## Where to edit

| What you want to change | File |
| --- | --- |
| Name, headline, biography, jobs, projects, skills, email and social links | `dist/index.html` |
| Main colors and your new style overrides | `dist/custom.css` |
| Anime panels, artwork layout, neon accents, mobile theme | `dist/anime.css` |
| Base layout, typography and original animation rules | `dist/style.css` |
| Scroll reveal and pause/reduced-motion behavior | `dist/motion.js` |
| Hero illustration | `dist/anime-engineer.webp` |

The CSS loads in this order: style.css → anime.css → custom.css.
Start with custom.css; later matching rules override earlier ones.
Some original decorative accents use explicit colors in anime.css; edit those there
if you want a complete palette change.

## Common changes

### Update your name or contact details
In index.html use Ctrl+F to find the current text and edit it. Update the page title
and description near the top as well. For email, update BOTH the visible address
and each `href="mailto:..."`. For GitHub and LinkedIn, edit the matching href URL.

### Add another project
Find the comment `PROJECTS` in index.html. Inside `<div class="project-grid">`,
copy one complete `<article class="project"> ... </article>` block. Paste it next
to the other cards, then edit its title, description, tags and details.
Keep the closing tags intact. Do not duplicate section IDs.

### Replace the picture
Put your image into dist/, for example `my-photo.jpg`. Find the image inside
`<figure class="anime-panel">` and change its src to `my-photo.jpg`.
Update its alt text and width/height attributes to match the new image.
Use the custom.css example to adjust cropping. The supplied art is a fictional
character, not a photograph of the portfolio owner.

### Change the accent color
In custom.css change `--accent: #68edff;` to your preferred hex color.
Save and refresh. The other variables control backgrounds, borders and text.

### Format code in VS Code
Use Shift+Alt+F on Windows to format HTML, CSS or JavaScript with the built-in
formatters. No extension is required. Comments mark the main HTML edit locations.

## Troubleshooting
- Port already in use: `py serve.py --port 5501`.
- Browser did not open: copy the URL printed in the terminal.
- Changes not visible: save the correct file, refresh, and check you opened the
  extracted folder rather than a different copy. Ctrl+F5 forces a refresh.
- Missing image/styles: keep all files inside dist/ and check filename spelling.
- Animations paused: check the page button and your operating system's reduced-motion
  setting. The page deliberately respects that accessibility preference.
- Google Fonts requires internet; offline the page uses fallback fonts.

## Publishing later
Upload the CONTENTS of dist/ to a static website host. The Python server is for local
preview only. This package is independent of the original Sites hosting configuration.
Local edits do not automatically update your hosted portfolio. Configure hosting
access separately; this static code does not implement sign-in or private access.
