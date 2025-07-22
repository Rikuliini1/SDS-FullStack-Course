import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import ListForm from '../components/ListForm'
import ListItem from '../components/ListItem'
import { logoutUser, resetUserState } from '../features/user/userSlice'
import { getLists, resetListState, clearLists } from '../features/lists/listSlice'

function Dashboard() {
	const dispatch = useDispatch()

    const { isLoggedIn, justLoggedIn, justLoggedOut, gotUserError, userMessage } = useSelector((state) => state.user)
    const { lists, listsLoading, justGotLists, justCreatedList, justDeletedList, gotListError, listMessage } = useSelector((state) => state.lists)

    useEffect(() => {
        if (isLoggedIn && localStorage.getItem('token')) {
            // Get all lists (1/3)
            dispatch(getLists())
        }
        if (isLoggedIn && !localStorage.getItem('token')) {
            dispatch(logoutUser())
        }
    }, [])

    useEffect(() => {
        if (justLoggedIn) {
            dispatch(resetUserState())
        }
        if (justLoggedOut) {
            toast.success(userMessage)
            dispatch(clearLists())
            dispatch(resetUserState())
        }
        if (justGotLists) {
            dispatch(resetListState())
        }
        if (justCreatedList || justDeletedList) {
            toast.success(listMessage)
            dispatch(resetListState())
        }
        if (gotUserError) {
            toast.error(userMessage)
            dispatch(resetUserState())
        }
        if (gotListError) {
            toast.error(listMessage)
            dispatch(resetListState())
        }
    },
    [justGotLists, justCreatedList, justDeletedList, justLoggedOut, gotUserError, gotListError, dispatch])

    const LISTS = listsLoading ? (
        <>
        </>
    ) : (
        lists.length > 0 ? (
            <div className="lists">
                {lists.map((list) => (
                    <ListItem key={list._id} listData={list}/>
                ))}
            </div>
        ) : (
            <h3>You have not created any lists</h3>
        )
    )

    const CONDITIONAL_CONTENT = isLoggedIn ? (
        <>
        <section className="heading">
            <h1>My Top3 lists</h1>
        </section>
        <ListForm/>
        {LISTS}
        </>
    ) : (
        <h1>Please login to view lists</h1>
    )

    const COMPONENT = (
        <>
        {CONDITIONAL_CONTENT}
        </>
    )

    return COMPONENT
}

export default Dashboard

// EOF
