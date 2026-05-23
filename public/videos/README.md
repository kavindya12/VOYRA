# Hero videos

Place these files in this folder:

| File | Notes |
|------|--------|
| `hero-1.mp4` | Optional slide 2 |
| `hero-2.mp4` | Optional slide 3 |
| `hero-3.mp4` | Hero slide 3 |
| `253907.mp4` | Your Pixabay beach clip (`Downloads/253907.mp4`) |

## Format for browsers

Use **H.264** (not HEVC/H.265), **1080p or lower**, and **faststart** so playback begins immediately:

```bash
ffmpeg -i input.mp4 -an -c:v libx264 -pix_fmt yuv420p -vf scale=1920:-2 -preset fast -crf 28 -movflags +faststart hero-3.mp4
```

`hero-3.mp4` in this project was converted from your `253907.mp4` download for Chrome/Edge/Firefox compatibility.
