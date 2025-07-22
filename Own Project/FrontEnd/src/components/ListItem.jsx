import { useDispatch } from 'react-redux'
import { deleteList } from '../features/lists/listSlice'

function ListItem({ listData }) {
    const dispatch = useDispatch()

    const COMPONENT = (
        <div className="list">
            <div>
                {new Date(listData.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{listData.topic}</h2>
            <div className="itemContainer">
                <div className="listItems">
                    <p>1. {listData.first}</p>
                    <p>2. {listData.second}</p>
                    <p>3. {listData.third}</p>
                </div>
            </div>
            {/* Delete a list (1/3) */}
            <button onClick={() => dispatch(deleteList(listData._id))} className="close">X</button>
        </div>
    )

    return COMPONENT
}

export default ListItem

// EOF
