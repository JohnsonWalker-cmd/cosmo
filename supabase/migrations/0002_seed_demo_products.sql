-- Demo catalog for the Cosmo template. Placeholder products only — replace
-- with a client's real catalog before handover. Safe to re-run: each insert
-- is keyed by slug/sku and skips rows that already exist.

with cat as (
  select slug, id from public.categories
)
insert into public.products (slug, name, brand, description, category_id, image_urls, featured)
select v.slug, v.name, v.brand, v.description, cat.id, v.image_urls, v.featured
from (
  values
    (
      'velvet-matte-lipstick',
      'Velvet Matte Lipstick',
      'Cosmo Studio',
      'A soft-matte lipstick that wears down to a comfortable stain. Full coverage in one swipe.',
      'lips',
      array['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800']::text[],
      true
    ),
    (
      'featherlight-foundation',
      'Featherlight Foundation',
      'Cosmo Studio',
      'A buildable, breathable foundation with a natural satin finish. Wear it alone or under powder.',
      'face',
      array['https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=800']::text[],
      true
    ),
    (
      'lengthening-mascara',
      'Lengthening Mascara',
      'Cosmo Studio',
      'Fibre-tipped brush for length without clumping. Smudge-resistant through a full day.',
      'eyes',
      array['https://images.unsplash.com/photo-1631214524115-af92d9d4c1a4?w=800']::text[],
      false
    ),
    (
      'hydrating-serum',
      'Hydrating Serum',
      'Cosmo Skin',
      'A lightweight serum with hyaluronic acid. Layers under moisturiser, morning or night.',
      'skincare',
      array['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800']::text[],
      true
    )
) as v (slug, name, brand, description, category_slug, image_urls, featured)
join cat on cat.slug = v.category_slug
on conflict (slug) do nothing;

-- Shade variants: Velvet Matte Lipstick
insert into public.product_variants
  (product_id, name, option_type, sku, price_cents, stock, stock_status, swatch_url, sort_order)
select p.id, v.name, 'shade', v.sku, v.price_cents, v.stock, v.stock_status, v.swatch_url, v.sort_order
from public.products p
join (
  values
    ('Rosewood',   'lip-velvet-rosewood',   4500, 12, 'in_stock',   '#a24552', 1),
    ('Brick Red',  'lip-velvet-brick',      4500,  0, 'restocking', '#9c3b2e', 2),
    ('Nude Fig',   'lip-velvet-fig',        4500,  6, 'in_stock',   '#b5776a', 3),
    ('Berry Wine', 'lip-velvet-berry',      4500,  0, 'out',        '#6e2540', 4)
) as v (name, sku, price_cents, stock, stock_status, swatch_url, sort_order)
  on true
where p.slug = 'velvet-matte-lipstick'
  and not exists (
    select 1 from public.product_variants pv where pv.sku = v.sku
  );

-- Size variants: Featherlight Foundation
insert into public.product_variants
  (product_id, name, option_type, sku, price_cents, stock, stock_status, sort_order)
select p.id, v.name, 'size', v.sku, v.price_cents, v.stock, v.stock_status, v.sort_order
from public.products p
join (
  values
    ('30ml', 'found-feather-30', 8500, 9, 'in_stock', 1),
    ('50ml', 'found-feather-50', 12000, 3, 'in_stock', 2)
) as v (name, sku, price_cents, stock, stock_status, sort_order)
  on true
where p.slug = 'featherlight-foundation'
  and not exists (
    select 1 from public.product_variants pv where pv.sku = v.sku
  );

-- Single-SKU: Lengthening Mascara
insert into public.product_variants
  (product_id, name, option_type, sku, price_cents, stock, stock_status, sort_order)
select p.id, 'Standard', 'default', 'mascara-lengthening', 6500, 15, 'in_stock', 1
from public.products p
where p.slug = 'lengthening-mascara'
  and not exists (
    select 1 from public.product_variants pv where pv.sku = 'mascara-lengthening'
  );

-- Size variants: Hydrating Serum
insert into public.product_variants
  (product_id, name, option_type, sku, price_cents, stock, stock_status, sort_order)
select p.id, v.name, 'size', v.sku, v.price_cents, v.stock, v.stock_status, v.sort_order
from public.products p
join (
  values
    ('15ml', 'serum-hydrating-15', 5500, 0, 'restocking', 1),
    ('30ml', 'serum-hydrating-30', 9000, 7, 'in_stock', 2)
) as v (name, sku, price_cents, stock, stock_status, sort_order)
  on true
where p.slug = 'hydrating-serum'
  and not exists (
    select 1 from public.product_variants pv where pv.sku = v.sku
  );
