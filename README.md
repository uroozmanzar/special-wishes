# Personalised Wishing Website

A responsive, scrapbook-style wishing website made with plain HTML, CSS, and JavaScript. It is designed for GitHub Pages and does not need a build step or framework.

## Files

- `index.html` — the page structure.
- `styles.css` — colours, layout, and responsive design.
- `content.js` — the text, photo list, video list, letters, and timeline. This is the main file you personalise.
- `script.js` — renders the content and adds the photo preview and surprise interactions.
- `assets/photos/` — add your photos here.
- `assets/videos/` — add your video clips here.

## 1. Personalise the words

Open `content.js` and edit the values inside `window.WISHING_PAGE_CONTENT`.

- Change the `site` section for the heading, introduction, sign-off, and other text.
- Edit the `photos` list to change each photo's filename, title, caption, and alt text.
- Edit the `videos` list to change each video filename, title, caption, and optional poster image.
- Edit the `letters` list to write your own letters. Use `\n\n` to create paragraph breaks.
- Edit the `timeline` list for dates and little memories.

For headings, use `|` to indicate a line break. The last part is styled in italics. Example: `A day to|remember forever.`

## 2. Add your photographs

Put your images in `assets/photos/`. The starter content expects these names:

```text
assets/photos/cover.jpg
assets/photos/photo-01.jpg
assets/photos/photo-02.jpg
assets/photos/photo-03.jpg
assets/photos/photo-04.jpg
assets/photos/photo-05.jpg
assets/photos/photo-06.jpg
```

You can use different names, but update the matching `src` values in `content.js`. Keep filenames simple, use lowercase letters and hyphens, and make sure the letter case matches exactly. GitHub Pages filenames are case-sensitive.

The cover photo is the large image in the opening section. Gallery photos open in a larger preview when clicked.

## 3. Add your videos

Put MP4 videos in `assets/videos/`. The starter content expects:

```text
assets/videos/clip-01.mp4
assets/videos/clip-02.mp4
```

Update the `videos` list in `content.js` to match your actual filenames. You can add or remove video objects in that list. Optional poster images can be placed in `assets/photos/` and referenced with the `poster` property.

For smoother loading, use reasonably compressed MP4 videos. Very large videos make the website slow and use up your GitHub repository storage.

## 4. Preview the website

Keep all files in the same folder structure. Open `index.html` in a browser. If your browser blocks local video playback, test the published GitHub Pages link instead.

## 5. Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload the files and folders while keeping the same structure.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish. The page address will appear in the Pages settings.

Every time you update `content.js` or add media files and push the changes, the published page will update.

## Privacy reminder

A GitHub Pages website is publicly viewable. Only upload photos, videos, and letters that the people shown or mentioned are comfortable sharing publicly. Avoid private contact details, home addresses, school details, or anything sensitive. Get permission before posting someone else's photos or videos.

## Notes

- No account, database, or server is required.
- The site uses the visitor's browser to display the media.
- The Google Fonts connection is optional. If the visitor is offline, fallback fonts will be used.
