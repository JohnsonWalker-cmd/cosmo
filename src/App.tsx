import { Layout } from "@/components/layout/Layout"
import { AdminHomePage } from "@/pages/admin/AdminHomePage"
import { AdminLoginPage } from "@/pages/admin/AdminLoginPage"
import { CartPage } from "@/pages/CartPage"
import { CheckoutPage } from "@/pages/CheckoutPage"
import { ConfirmationPage } from "@/pages/ConfirmationPage"
import { HomePage } from "@/pages/HomePage"
import { PickupPage } from "@/pages/PickupPage"
import { ProductPage } from "@/pages/ProductPage"
import { ShopPage } from "@/pages/ShopPage"
import { Route, Routes } from "react-router-dom"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/pickup" element={<PickupPage />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Route>
    </Routes>
  )
}
