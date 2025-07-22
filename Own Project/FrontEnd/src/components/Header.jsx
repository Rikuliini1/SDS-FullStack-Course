import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { logoutUser } from '../features/user/userSlice'

function Header() {
    const dispatch = useDispatch()

    const { isLoggedIn } = useSelector((state) => state.user)

    const checkForToken = () => {
        if (isLoggedIn && !localStorage.getItem('token')) {
            toast.error('User unauthorized')
            dispatch(logoutUser())
        }
    }

    const onLogout = () => {
        // Logout user (1/3)
        dispatch(logoutUser())
    }

    const CONDITIONAL_CONTENT = isLoggedIn ? (
        <li><button className="btn" onClick={onLogout}><FaSignOutAlt/> Logout</button></li> 
    ) : (
        <>
        <li><Link to='/login'><FaSignInAlt/> Login</Link></li>
        <li><Link to='/register'><FaUser/> Register</Link></li>
        </>
    )

    const COMPONENT = (
        <header className="header">
            <div className="logo">
                <Link to='/dashboard' onClick={checkForToken}>MyTop3</Link>
            </div>
            <ul>
                {CONDITIONAL_CONTENT}
            </ul>
        </header>
    )

    return COMPONENT
}

export default Header

// EOF
