import Link from "next/link"

const Nav = () => {
    return(
        <nav className="h-10 bg-black text-white">
            <ul className="flex justify-evenly ">
                <Link href="http://localhost:3000/shop">SHOP</Link>
                <Link href="http://localhost:3000/users">USER</Link>
            </ul>
        </nav>
    )
}

export default Nav