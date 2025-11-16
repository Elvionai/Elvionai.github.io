import os
from datetime import datetime

root_url = "https://elvionai.com.ng"
html_files = []

for subdir, _, files in os.walk('.'):
    for file in files:
        if file.endswith(".html"):
            path = os.path.join(subdir, file)
            path = path.replace("\\", "/")
            if path.startswith("./"):
                path = path[2:]
            html_files.append(path)

now = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S+00:00")

sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

for file in html_files:
    url = f"{root_url}/{file}"
    sitemap.append("  <url>")
    sitemap.append(f"    <loc>{url}</loc>")
    sitemap.append(f"    <lastmod>{now}</lastmod>")
    sitemap.append("    <priority>0.80</priority>")
    sitemap.append("  </url>")

sitemap.append('</urlset>')

with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write("\n".join(sitemap))
