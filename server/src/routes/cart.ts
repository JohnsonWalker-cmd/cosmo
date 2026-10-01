import express from "express"
import { asyncHandler } from "../lib/asyncHandler.js"
import { requireAuth } from "../middleware/auth.js"
import { CartModel, type CartItem } from "../models/Cart.js"
import { ProductModel } from "../models/Product.js"

const router = express.Router()

/**
 * GET /api/cart
 * Fetch the current user's cart.
 * Requires authentication.
 */
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = res.locals.auth.userId

    let cart = await CartModel.findOne({ userId })
    if (!cart) {
      // Create an empty cart if it doesn't exist
      cart = new CartModel({ userId, items: [] })
      await cart.save()
    }

    res.json(cart)
  }),
)

/**
 * POST /api/cart/items
 * Add an item to the cart, or update quantity if it already exists.
 * Requires authentication.
 * Body: { productId, variantId, quantity }
 */
router.post(
  "/items",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = res.locals.auth.userId
    const { productId, variantId, quantity } = req.body

    if (!productId || !variantId || !quantity || quantity < 1) {
      return res.status(400).json({ error: "productId, variantId, and quantity (>0) required" })
    }

    // Verify the product and variant exist and get stock info
    const product = await ProductModel.findById(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    const variant = product.variants.find((v) => v._id?.toString() === variantId)
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" })
    }

    if (variant.stockStatus === "out") {
      return res.status(400).json({ error: "Variant is out of stock" })
    }

    // Clamp quantity to available stock
    const clampedQuantity = Math.min(quantity, variant.stock)
    if (clampedQuantity === 0) {
      return res.status(400).json({ error: "No stock available" })
    }

    // Get or create the cart
    let cart = await CartModel.findOne({ userId })
    if (!cart) {
      cart = new CartModel({ userId, items: [] })
    }

    // Check if this item already exists in the cart
    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.productVariantId.toString() === variantId,
    )

    if (existingItem) {
      // Update quantity
      existingItem.quantity = Math.min(existingItem.quantity + clampedQuantity, variant.stock)
    } else {
      // Add new item
      cart.items.push({
        productId: productId as any,
        productVariantId: variantId as any,
        quantity: clampedQuantity,
      } as CartItem)
    }

    await cart.save()
    res.json(cart)
  }),
)

/**
 * PATCH /api/cart/items/:variantId
 * Update the quantity of a cart item.
 * Requires authentication.
 * Body: { quantity } (0 to remove, >0 to update)
 */
router.patch(
  "/items/:variantId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = res.locals.auth.userId
    const { variantId } = req.params
    const { quantity } = req.body

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ error: "quantity (>= 0) required" })
    }

    const cart = await CartModel.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    // Find the item
    const item = cart.items.find((i) => i.productVariantId.toString() === variantId)
    if (!item) {
      return res.status(404).json({ error: "Item not in cart" })
    }

    if (quantity === 0) {
      // Remove the item
      cart.items = cart.items.filter((i) => i.productVariantId.toString() !== variantId)
    } else {
      // Update quantity
      item.quantity = quantity
    }

    await cart.save()
    res.json(cart)
  }),
)

/**
 * DELETE /api/cart/items/:variantId
 * Remove an item from the cart.
 * Requires authentication.
 */
router.delete(
  "/items/:variantId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = res.locals.auth.userId
    const { variantId } = req.params

    const cart = await CartModel.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    const item = cart.items.find((i) => i.productVariantId.toString() === variantId)
    if (!item) {
      return res.status(404).json({ error: "Item not in cart" })
    }

    cart.items = cart.items.filter((i) => i.productVariantId.toString() !== variantId)
    await cart.save()
    res.json(cart)
  }),
)

/**
 * DELETE /api/cart
 * Clear the entire cart.
 * Requires authentication.
 */
router.delete(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = res.locals.auth.userId

    const cart = await CartModel.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    cart.items = []
    await cart.save()
    res.json(cart)
  }),
)

export default router
