import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser } from 'react-icons/fa'
import { toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import { registerUser, resetUserState } from '../features/user/userSlice'

function Register() {
    const navigate = useNavigate()
	const dispatch = useDispatch()

    const [formData, setFormData] = useState({
		email: '',
		password: '',
		password2: ''
	})
    const { email, password, password2 } = formData

    const { isLoggedIn, userLoading, justRegistered, gotUserError, userMessage } = useSelector((state) => state.user)

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard')
        }
        if (justRegistered) {
            toast.success(userMessage)
            navigate('/login')
        }
        if (gotUserError) {
            toast.error(userMessage)
            dispatch(resetUserState())
        }
    },
    [justRegistered, gotUserError, navigate, dispatch])

    const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
            [event.target.name]: event.target.value
		}))
	}

    const onSubmit = (event) => {
		event.preventDefault()
		if (password !== password2) {
			toast.error('Passwords do not match')
		} else {
            // Register a new user (1/3)
			dispatch(registerUser({ email, password }))
		}
	}

    const CONDITIONAL_CONTENT = userLoading ? (
        <Spinner/>
    ) : (
        <>
        <section className="heading">
            <h1><FaUser/> Register</h1>
            <p>Please create an account</p>
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
                    <input type="password" className="form-control" id='password2' name='password2' value={password2} placeholder='Confirm password' onChange={onChange}/>
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

export default Register

// EOF
