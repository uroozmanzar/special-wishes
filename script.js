(() => {
  "use strict";

  const data = window.WISHING_PAGE_CONTENT;
  if (!data || !data.site) {
    console.error("The page content could not be loaded. Check that content.js is next to index.html.");
    return;
  }

  const $ = (id) => document.getElementById(id);
  const setText = (id, value) => {
    const element = $(id);
    if (element && typeof value === "string") element.textContent = value;
  };
  const setTitle = (id, value) => {
    const element = $(id);
    if (!element || typeof value !== "string") return;
    const parts = value.split("|");
    element.replaceChildren();
    parts.forEach((part, index) => {
      if (index > 0) element.append(document.createElement("br"));
      if (index === parts.length - 1) {
        const em = document.createElement("em");
        em.textContent = part;
        element.append(em);
      } else {
        element.append(document.createTextNode(part));
      }
    });
  };
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  // Main text content.
  document.title = data.site.browserTitle || "A Little Something For You";
  setText("wordmarkText", data.site.wordmark);
  setText("eyebrowText", data.site.eyebrow);
  setTitle("heroTitle", data.site.heroTitle);
  setText("heroDescription", data.site.heroDescription);
  setText("heroSignature", data.site.heroSignature);
  setText("heroDate", data.site.heroDate);
  setText("photoStickerText", data.site.photoSticker);
  setText("dedicationText", data.site.dedication);
  setTitle("memoriesTitle", data.site.memoriesTitle);
  setText("memoriesIntro", data.site.memoriesIntro);
  setTitle("videosTitle", data.site.videosTitle);
  setText("videosIntro", data.site.videosIntro);
  setTitle("lettersTitle", data.site.lettersTitle);
  setText("lettersIntro", data.site.lettersIntro);
  setTitle("littleThingsTitle", data.site.littleThingsTitle);
  setText("littleThingsIntro", data.site.littleThingsIntro);
  setText("closingEyebrow", data.site.closingEyebrow);
  setTitle("closingTitle", data.site.closingTitle);
  setText("closingMessage", data.site.closingMessage);
  setText("closingSignature", data.site.closingSignature);
  setText("surpriseButton", data.site.surpriseButton);
  setText("surpriseMessage", data.site.surpriseMessage);
  setText("footerText", data.site.footer);

  const closingSignature = $("closingSignature");
  if (closingSignature && data.site.closingFrom) {
    const from = make("span", "", data.site.closingFrom);
    closingSignature.append(from);
  }

  // Cover photograph. A clear placeholder remains if the file has not been added yet.
  const cover = $("coverPhoto");
  const coverFallback = $("coverFallback");
  if (cover && data.site.coverPhoto) {
    cover.src = data.site.coverPhoto;
    cover.alt = data.site.coverAlt || "A favourite photo";
    cover.addEventListener("load", () => { if (coverFallback) coverFallback.hidden = true; });
    cover.addEventListener("error", () => { cover.hidden = true; if (coverFallback) coverFallback.hidden = false; });
  } else if (cover) {
    cover.hidden = true;
  }

  // Photo gallery and accessible full-size photo preview.
  const photoGrid = $("photoGrid");
  const photoDialog = $("photoDialog");
  const dialogImage = $("dialogImage");
  const dialogCaption = $("dialogCaption");

  function showPhoto(src, alt, caption) {
    if (!photoDialog || !dialogImage) return;
    dialogImage.src = src;
    dialogImage.alt = alt || "Photo preview";
    if (dialogCaption) dialogCaption.textContent = caption || "";
    if (typeof photoDialog.showModal === "function") photoDialog.showModal();
  }

  (Array.isArray(data.photos) ? data.photos : []).forEach((photo, index) => {
    if (!photo || !photo.src) return;
    const card = make("article", "photo-card");
    const open = make("button", "photo-open");
    open.type = "button";
    open.setAttribute("aria-label", `Open photo: ${photo.title || `Memory ${index + 1}`}`);

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt || photo.title || `Memory ${index + 1}`;
    img.loading = "lazy";

    const placeholder = make("span", "photo-placeholder");
    placeholder.hidden = true;
    placeholder.append(make("b", "", "鈾�"));
    placeholder.append(make("small", "", `Add your image here:\n${photo.src}`));
    img.addEventListener("error", () => { img.hidden = true; placeholder.hidden = false; });
    img.addEventListener("load", () => { placeholder.hidden = true; img.hidden = false; });

    open.append(img, placeholder);
    open.addEventListener("click", () => showPhoto(photo.src, img.alt, photo.caption || photo.title || ""));

    const caption = make("div", "photo-caption");
    caption.append(make("strong", "", photo.title || `Memory ${index + 1}`));
    caption.append(make("span", "", photo.caption || ""));
    card.append(open, caption);
    photoGrid.append(card);
  });

  if (photoDialog) {
    photoDialog.addEventListener("click", (event) => {
      if (event.target === photoDialog) photoDialog.close();
    });
  }

  // Video memories. Native video controls work on desktop and mobile.
  const videoGrid = $("videoGrid");
  const videos = Array.isArray(data.videos) ? data.videos : [];
  let usableVideoCount = 0;
  videos.forEach((video, index) => {
    if (!video || !video.src) return;
    usableVideoCount += 1;
    const card = make("article", "video-card");
    const player = document.createElement("video");
    player.controls = true;
    player.preload = "metadata";
    player.playsInline = true;
    player.setAttribute("aria-label", video.title || `Video ${index + 1}`);
    player.src = video.src;
    if (video.poster) player.poster = video.poster;

    const info = make("div", "video-info");
    info.append(make("h3", "", video.title || `A memory ${index + 1}`));
    info.append(make("p", "", video.caption || ""));
    card.append(player, info);
    videoGrid.append(card);
  });
  if (usableVideoCount === 0) {
    videoGrid.append(make("div", "video-empty", "Add video entries to the videos list in content.js and place the matching .mp4 files in assets/videos/."));
  }

  // Letters: each card opens independently using native details/summary elements.
  const lettersGrid = $("lettersGrid");
  (Array.isArray(data.letters) ? data.letters : []).forEach((letter, index) => {
    if (!letter) return;
    const card = make("details", "letter-card");
    const summary = document.createElement("summary");
    summary.append(make("span", "envelope-icon", letter.icon || "鉁�"));
    summary.append(make("h3", "", letter.title || `A letter ${index + 1}`));
    summary.append(make("span", "letter-teaser", letter.teaser || "A small note for you."));
    summary.append(make("span", "read-label", "Open this letter 鈫�"));

    const body = make("div", "letter-body", letter.body || "");
    card.append(summary, body);
    card.addEventListener("toggle", () => {
      const label = card.querySelector(".read-label");
      if (label) label.textContent = card.open ? "Close this letter 鈫�" : "Open this letter 鈫�";
    });
    lettersGrid.append(card);
  });

  // Small timeline / list of meaningful details.
  const timeline = $("timeline");
  (Array.isArray(data.timeline) ? data.timeline : []).forEach((item) => {
    if (!item) return;
    const row = make("article", "timeline-item");
    row.append(make("span", "timeline-date", item.date || "A moment"));
    const copy = make("div", "timeline-copy");
    copy.append(make("h3", "", item.title || "A little memory"));
    copy.append(make("p", "", item.text || ""));
    row.append(copy);
    timeline.append(row);
  });

  // Final surprise button.
  const surpriseButton = $("surpriseButton");
  const surpriseMessage = $("surpriseMessage");
  if (surpriseButton && surpriseMessage) {
    surpriseButton.addEventListener("click", () => {
      surpriseMessage.hidden = !surpriseMessage.hidden;
      surpriseButton.setAttribute("aria-expanded", String(!surpriseMessage.hidden));
      if (!surpriseMessage.hidden) surpriseMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
})();
