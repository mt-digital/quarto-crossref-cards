-- crossref-cards.lua
-- Quarto shortcode: {{< crossref-cards file="topics.yml" >}}

local function crossref_cards(args, kwargs, meta)
  local file = kwargs["file"] or "topics.yml"

  -- read scaffold HTML
  local f_html = io.open(quarto.utils.resolve_path("cards.html"), "r")
  local html = f_html and f_html:read("*all") or ""
  if f_html then f_html:close() end

  -- read scaffold JS
  local f_js = io.open(quarto.utils.resolve_path("cards.js"), "r")
  local js = f_js and f_js:read("*all") or ""
  if f_js then f_js:close() end

  return pandoc.RawBlock("html", [[
<div class="crossref-cards">
]] .. html .. [[
  <script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
  <script>
    window.crossrefCardsFile = "]] .. file .. [[";
  </script>
  <script>
]] .. js .. [[
  </script>
</div>
]])
end

return {
  ["crossref-cards"] = crossref_cards
}

