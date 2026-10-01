import express from "express"
import { asyncHandler } from "../lib/asyncHandler.js"
import { requireAuth, requireAdmin } from "../middleware/auth.js"
import { CartModel } from "../models/Cart.js"
import { OrderModel } from "../models/Order.js"
import { ProductModel } from "../models/Product.js"

const router = express.Router()

/**
 * POST /api/orders
 * Create a new order from the current cart.
 * Requires authentication (guest or customer).
 * Body: { customerName, customerPhone }
 * Returns the order with status "pending".
 */
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = res.locals.auth.userId
    const { customerName, customerPhone } = req.body

    if (!customerName || !customerPhone) {
      return res.status(400).json({ error: "customerName and customerPhone required" })
    }

    // Get the user's cart
    const cart = await CartModel.findOne({ userId })
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" })
    }

    // Convert cart items to order items, gathering product/variant snapshots
    let totalCents = 0
    const orderItems = []

    for (const cartItem of cart.items) {
      const product = await ProductModel.findById(cartItem.productId)
      if (!product) {
        return res.status(400).json({ error: `Product ${cartItem.productId} not found` })
      }

      const variant = product.variants.find((v) => v._id?.toString() === cartItem.productVariantId.toString())
      if (!variant) {
        return res.status(400).json({ error: `Variant not found in product` })
      }

      const itemTotal = variant.priceCents * cartItem.quantity
      totalCents += itemTotal

      orderItems.push({
        productId: cartItem.productId,
        variantId: cartItem.productVariantId,
        quantity: cartItem.quantity,
        nameSnapshot: `${product.name} - ${variant.name}`,
        unitPriceCents: variant.priceCents,
      })
    }

    // Create the order (status defaults to "pending")
    const order = new OrderModel({
      userId: userId as any,
      items: orderItems,
      totalCents,
      status: "pending",
      customerName,
      customerPhone,
    })

    await order.save()

    // Clear the cart after order creation
    cart.items = []
    await cart.save()

    res.status(201).json(order)
  }),
)

/**
 * GET /api/orders
 * List orders for the current user (guest or customer).
 * Admins can fetch all orders if no userId is present in auth.
 * Requires authentication.
 */
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = res.locals.auth.userId
    const role = res.locals.auth.role

    // Guests and customers can only see their own orders
    const query = role === "admin" ? {} : { userId }

    const orders = await OrderModel.find(query).sort({ createdAt: -1 })
    res.json(orders)
  }),
)

/**
 * GET /api/orders/:id
 * Fetch a single order by ID.
 * Guests/customers can only fetch their own orders; admins can fetch any.
 */
router.get(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = res.locals.auth.userId
    const role = res.locals.auth.role

    const order = await OrderModel.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    // Check access: admins can see any order, others can only see their own
    if (role !== "admin" && order.userId?.toString() !== userId) {
      return res.status(403).json({ error: "Forbidden" })
    }

    res.json(order)
  }),
)

/**
 * PATCH /api/orders/:id (admin only)
 * Update order status.
 * Body: { status } — one of "pending", "paid", "ready_for_pickup", "picked_up"
 */
router.patch(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ error: "status required" })
    }

    const validStatuses = ["pending", "paid", "ready_for_pickup", "picked_up"]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${validStatuses.join(", ")}` })
    }

    const order = await OrderModel.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    res.json(order)
  }),
)

/**
 * PATCH /api/orders/:id/paystack (admin only, webhook target)
 * Record a Paystack payment and mark the order as paid.
 * Body: { paystackReference }
 */
router.patch(
  "/:id/paystack",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { paystackReference } = req.body

    if (!paystackReference) {
      return res.status(400).json({ error: "paystackReference required" })
    }

    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { status: "paid", paystackReference },
      { new: true },
    )
    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    res.json(order)
  }),
)

export default router
