import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createList } from '../features/lists/listSlice'

function ListForm() {
    const dispatch = useDispatch()

    const [listData, setListData] = useState({
		topic: '',
		first: '',
        second: '',
        third: ''
	})
    const { topic, first, second, third } = listData

    const onChange = (event) => {
		setListData((prevState) => ({
			...prevState,
            [event.target.name]: event.target.value
		}))
	}

    const onSubmit = (event) => {
        event.preventDefault()
        // Create a new list (1/3)
        dispatch(createList(listData))
        setListData({ topic: '', first: '', second: '', third: '' })
    }

    const COMPONENT = (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <h3>Create a list</h3>
                    <input type="text" name='topic' id='topic' value={topic} placeholder='Topic' onChange={onChange}/>
                    <input type="text" name='first' id='first' value={first} placeholder='1.' onChange={onChange}/>
                    <input type="text" name='second' id='second' value={second} placeholder='2.' onChange={onChange}/>
                    <input type="text" name='third' id='third' value={third} placeholder='3.' onChange={onChange}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>Add list</button>
                </div>
            </form>
        </section>
    )

    return COMPONENT
}

export default ListForm

// EOF
