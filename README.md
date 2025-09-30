# Quarto-crossref-cards Extension For Quarto

This extension adds a `crossref-cards` shortcode for displaying searchable, filterable reference cards backed by a `.json` file.  

It’s useful for building small compendia or cross-references (e.g. *Social Science for Sustainability* topics, book recommendations, etc.).  

For example:

```qmd
{{< crossref-cards file="topics.json" >}}
```

---

## Installing

```bash
quarto add mt-digital/quarto-crossref-cards
```

This will install the extension under the `_extensions` subdirectory.  
If you're using version control, you will want to check in this directory.  

For local dev:  

```bash
quarto install extension ./quarto-crossref-cards
```

or symlink it:

```bash
cd my-project/_extensions
ln -s ~/dev/quarto-crossref-cards .
```

---

## Using

1. Create a JSON file with your content. Example (`topics.json`):

   ```json
   [
     {
       "title": "Group Polarization",
       "desc": "Groups adopt more extreme positions than individuals.",
       "tags": ["Social Psychology", "Sociology", "Opinion Dynamics"]
     },
     {
       "title": "Opinion Dynamics",
       "desc": "Models of how opinions evolve through social interaction.",
       "tags": ["Network Science", "Sociology", "Complex Systems"]
     }
   ]
   ```

2. Call the shortcode in your `.qmd`:

   ```qmd
   {{< crossref-cards file="topics.json" >}}
   ```

3. That will render a grid of cards with:  
   - Live search box  
   - Tag filters with reset button  
   - Clickable tag badges on each card  

---

## Options

You can choose which built-in stylesheet to use:

```yaml
crossref-cards:
  style: bootstrap   # or "ss4s"
```

Per-page override:

```qmd
{{< crossref-cards file="topics.json" style="ss4s" >}}
```

- **bootstrap** → minimal vanilla Bootstrap look  
- **ss4s** → styled to match *Social Science for Sustainability*  

Advanced: you can also override styles completely with your own CSS. Just add:  

```yaml
format:
  html:
    css: custom-cards.css
```

Any rules in `custom-cards.css` will cascade after the extension defaults.

---

## Try it yourself!

Edit the example to test your own:  

- [example.qmd](example.qmd) demonstrates the shortcode.  
- [topics.json](topics.json) provides a simple dataset.  

---

⚡ Next step: share your `cards-bootstrap.css` and `cards-ss4s.css` then update this README with screenshots so people can see the difference and download your styles if they like them. 


### Bootstrap Style
![Bootstrap cards screenshot](screenshots/bootstrap.png)

### SS4S Style
![SS4S cards screenshot](screenshots/ss4s.png)




---