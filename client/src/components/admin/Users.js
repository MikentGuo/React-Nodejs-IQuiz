import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import ReactPaginate from 'react-paginate';

function Items({ currentItems, updateUser, deleteUser }) {
    return (
        <>
            {currentItems &&
                currentItems.map((user, i) => {
                    return (
                        <tr key={i}>
                            <td width="100px"><img style={{ borderRadius: '50%' }, { width: '60px' }, { height: '60px' }} src={process.env.REACT_APP_SERVER_URL + user.imageFilePath} /></td>
                            <td >{user.username}</td>
                            <td >{user.email}</td>
                            <td >{user.isAdmin ? "Admin" : "Player"}</td>
                            <td >{user.total_score}</td>
                            <td>
                                <div
                                    className="btn btn-primary" onClick={() => updateUser(user)}>Update</div>

                                <div
                                    className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</div>

                            </td>
                        </tr>
                    )
                })}
        </>
    )
}

function PaginatedItems({ itemsPerPage, items, resetPage, setResetPage, updateUser, deleteUser }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        if (resetPage) {
            setItemOffset(0)
            setResetPage(false)
            return
        }
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, resetPage, items]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th> User Image </th>
                        <th> User Name</th>
                        <th> User Email </th>
                        <th> User Role </th>
                        <th> Total Scores </th>
                        <th> Actions </th>
                    </tr>
                </thead>

                <tbody>
                    <Items currentItems={currentItems} updateUser={updateUser} deleteUser={deleteUser} />
                </tbody>

            </table>
        </>
    )
}

function Users() {
    const [userList, setUserList] = useState([])
    const [showUserForm, setShowUserForm] = useState(false)
    const [selectedUser, setSelectedUser] = useState("")
    const [reload, setReload] = useState(false)
    const [resetPage, setResetPage] = useState(true)
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "admin/users", {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(res => {
            setUserList(res.data.userList)
        })
        setShowUserForm(false)
    }, [reload])
    const addUser = () => {
        setSelectedUser("")
        setShowUserForm(!showUserForm)

    }
    const updateUser = (user) => {
        setSelectedUser(user)
        setShowUserForm(true)
    }
    const deleteUser = (userId) => {
        axios.delete(process.env.REACT_APP_SERVER_URL + "admin/users/byId/" + userId, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }).then(res => {
            setReload(!reload)
        })
    }
    return (

        <div className="container">
            <div className="row">
                <h1> List Users </h1>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <div className="btn btn-primary btn-sm mb-3" onClick={addUser}> Add User</div>
                </div>
            </div>
            {showUserForm && <UserForm user={selectedUser ? selectedUser : null} />}
            <PaginatedItems itemsPerPage={5} 
                items={userList} 
                resetPage={resetPage} 
                setResetPage={(flag)=>setResetPage(flag)}
                updateUser={updateUser}
                deleteUser={deleteUser}
                />
        </div>

    );
}

export default Users;