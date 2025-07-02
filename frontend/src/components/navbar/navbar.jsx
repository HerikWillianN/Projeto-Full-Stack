import styles from './navbar.module.css'
import { LuShoppingCart, LuUser, LuMenu } from "react-icons/lu"
import { Drawer } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItems}>
                <Link to={'/'}>
                    <img className={styles.logo} src="/imgs/logo1.png" alt="" />
                </Link>
                <div className={styles.navbarLinksContainer}>

                    <Link to={'/'} className={styles.navbarLink}>Home</Link>
                    <Link to={'/roupas'} className={styles.navbarLink}>Roupas</Link>
                    <Link to={'/carrinho'}>
                        <LuShoppingCart className={styles.navbarLink} />
                    </Link>
                    <Link to={'/perfil'}>
                        <LuUser className={styles.navbarLink} />
                    </Link>
                </div>
            </div>

            <div className={styles.mobileNavbarItems}>
                <img className={styles.logo} src="/logo1.png" alt="" />
                <div className={styles.mobileNavbarBtns}>
                    <Link to={'/carrinho'}>
                        <LuShoppingCart className={styles.navbarLink} />
                    </Link>
                    <LuMenu className={styles.navbarLink} onClick={handleOpenMenu} />
                </div>
            </div>
            <Drawer
                anchor='right'
                open={openMenu}
                onClose={handleOpenMenu}
            >
                <div className={styles.drawer}>
                    <Link to={'/'} className={styles.navbarLink}>Home</Link>
                    <Link to={'/roupas'} className={styles.navbarLink}>Roupas</Link>
                    <Link to={'/perfil'} className={styles.navbarLink}>Perfil</Link>
                </div>
            </Drawer>

        </nav>
    )
}