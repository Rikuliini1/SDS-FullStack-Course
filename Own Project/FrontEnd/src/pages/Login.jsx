import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaSignInAlt } from 'react-icons/fa'
import { toast} from 'react-toastify'
import Spinner from '../components/Spinner.jsx'
import { loginUser, resetUserState } from '../features/user/userSlice.js'

function Login() {
    const navigate = useNavigate()
	const dispatch = useDispatch()

    const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
    const { email, password } = formData

    const { isLoggedIn, userLoading, justRegistered, justLoggedIn, gotUserError, userMessage } = useSelector((state) => state.user)

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard')
        }
        if (justRegistered) {
            dispatch(resetUserState())
        }
        if (justLoggedIn) {
            toast.success(userMessage)
            navigate('/dashboard')
        }
        if (gotUserError) {
            toast.error(userMessage)
            dispatch(resetUserState())
        }
    },
    [justLoggedIn, gotUserError, navigate, dispatch])

    const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
            [event.target.name]: event.target.value
		}))
	}

    const onSubmit = (event) => {
		event.preventDefault()
        // Login user (1/3)
		dispatch(loginUser({ email, password }))
	}

    const CONDITIONAL_CONTENT = userLoading ? (
        <Spinner/>
    ) : (
        <>
        <section className="heading">
            <h1><FaSignInAlt/> Login</h1>
            <p>Login and start making Top3 lists</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
        </>
    )

    const COMPONENT = isLoggedIn ? (
        <>
        </>
    ) : (
        <>
        {CONDITIONAL_CONTENT}
        </>
    )

    return COMPONENT
}

export default Login

// EOF
