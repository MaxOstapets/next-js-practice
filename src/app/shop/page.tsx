import React from 'react'
import Link from 'next/link';
import Nav from '@/Components/Nav';

const Shop = async() => {
  const res = await fetch(`https://dummyjson.com/products/2`)
  const projects = await res.json()
  return (
    <>
        <Nav />
        <div>SHOP</div>
        <div>Product: {projects.title}</div>
        <Link href="/product">PRODUCT</Link>
    </>
  )
}

export default Shop;