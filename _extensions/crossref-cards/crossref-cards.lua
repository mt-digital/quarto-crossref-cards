function Shortcodes (sc)
  if sc.name == "crossref-cards" then
    local file = sc.args.file
    if not file then
      error("crossref-cards shortcode requires a 'file' argument, e.g. {{< crossref-cards file=\"topics.json\" >}}")
    end

    local style = sc.args.style or quarto.project.options["crossref-cards"].style or "bootstrap"
    local cssfile = "cards-" .. style .. ".css"

    -- inject CSS at build time (before user css)
    quarto.doc.include_file("after-body", cssfile)

    -- read scaffold HTML
    local f = io.open("cards.html", "r")
    local html = f:read("*all")
    f:close()

    return pandoc.RawBlock("html", [[
<div class="crossref-cards">
]] .. html .. [[
  <script>
    window.crossrefCardsDataFile = "]] .. file .. [[";
  </script>
  <script src="cards.js"></script>
</div>
]])
  end
end
