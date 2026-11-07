<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

Mount the shared storefront state provider in the document shell so every root and route consumer shares one context boundary.

Render only each product's exact supplied catalogue photographs in their original order; missing or failed images use neutral placeholders to avoid misidentifying garments.

Derive storefront products directly from the supplied catalogue without merging generated legacy product details, so names, slugs, prices and images remain authoritative.

Use shared modal focus/scroll-lock behaviour for drawers and the mobile menu, so inactive overlays are inert and open overlays are keyboard accessible.

Expose progressive catalogue batches alongside server-rendered search-parameter pagination links, so discovery remains accessible to crawlers and non-observer browsers.
