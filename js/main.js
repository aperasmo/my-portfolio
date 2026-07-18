(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var toggleBtn = document.getElementById("theme-toggle");
  var stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  }
  toggleBtn.addEventListener("click", function () {
    var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    var current = root.getAttribute("data-theme") || (prefersLight ? "light" : "dark");
    var next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---------- Image probing helpers ----------
     GitHub Pages serves static files only, so the page can't list a folder's
     contents. Instead we just try loading a fixed set of candidate filenames;
     whichever ones actually exist get used, the rest are silently skipped. */
  function probeImage(path) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(path); };
      img.onerror = function () { resolve(null); };
      img.src = path;
    });
  }

  function probeFirst(paths) {
    return paths.reduce(function (chain, path) {
      return chain.then(function (found) {
        return found ? found : probeImage(path);
      });
    }, Promise.resolve(null));
  }

  function probeAll(paths) {
    return Promise.all(paths.map(probeImage)).then(function (results) {
      return results.filter(Boolean);
    });
  }

  var EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

  /* ---------- Hero photo ---------- */
  var photoCandidates = EXTENSIONS.map(function (ext) {
    return "assets/photo/photo." + ext;
  });
  probeFirst(photoCandidates).then(function (found) {
    if (!found) return;
    var holder = document.getElementById("hero-photo");
    var img = document.createElement("img");
    img.src = found;
    img.alt = "Allan Erasmo";
    holder.innerHTML = "";
    holder.appendChild(img);
  });

  /* ---------- Project screenshot galleries ----------
     Drop numbered files (1.png, 2.jpg, ... up to 6) into
     assets/screenshots/<project>/ and they appear automatically. */
  var SLOTS = [1, 2, 3, 4, 5, 6];

  function buildGallery(containerId, folder) {
    var candidates = [];
    SLOTS.forEach(function (n) {
      EXTENSIONS.forEach(function (ext) {
        candidates.push("assets/screenshots/" + folder + "/" + n + "." + ext);
      });
    });

    probeAll(candidates).then(function (found) {
      // Keep at most one match per slot number, preserving slot order.
      var bySlot = {};
      found.forEach(function (path) {
        var match = path.match(/\/(\d+)\.[a-z]+$/);
        if (match && !bySlot[match[1]]) bySlot[match[1]] = path;
      });
      var ordered = SLOTS.map(function (n) { return bySlot[n]; }).filter(Boolean);
      if (!ordered.length) return;

      var container = document.getElementById(containerId);
      ordered.forEach(function (path) {
        var img = document.createElement("img");
        img.src = path;
        img.alt = "";
        img.loading = "lazy";
        img.addEventListener("click", function () { openLightbox(path); });
        container.appendChild(img);
      });
      container.hidden = false;
    });
  }

  buildGallery("gallery-glaucoma-ai", "glaucoma-ai");
  buildGallery("gallery-ai-git-assistant", "ai-git-assistant");

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.hidden = false;
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.removeAttribute("src");
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
})();
