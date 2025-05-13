import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useUsers } from "../../providers/UsersProvider";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";
import DeleteModal from "../../components/DeleteModal";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import UserApproval from "../../components/UserApproval";

const Users = () => {
  const { users, getUsers, totalPages } = useUsers();
  const limit = 20;
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("pending");
  const [role, setRole] = useState("admin");
  const [search, setSearch] = useState("");

  const [deleteModal, showDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [barangayId, setBarangayId] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const [modal, showModal] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [approvalForm, showApprovalForm] = useState(false);

  const deleteUser = async (userId: string) => {
    if (userId) {
      try {
        let url = `http://localhost:8080/api/users/${userId}`;

        let response = await axios.delete(url);

        if (response.data.success === true) {
          showModal(true);
          setError(false);
          setMessage("Account has been successfully deleted!");
          getUsers(barangayId, page, limit, status, role);
        }
      } catch (error: any) {
        showModal(true);
        setError(true);
        setMessage("An error occurred, please try again later!");
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const user = localStorage.getItem("user");

      if (user) {
        const currUser = JSON.parse(user);

        if (currUser) {
          try {
            let url = `http://localhost:8080/api/users/${currUser._id}`;
            setCurrentUser(currUser._id);

            let response = await axios.get(url);

            if (response.data.success === true) {
              setBarangayId(response.data.data.barangayId);
              await getUsers(
                search,
                response.data.data.barangayId,
                page,
                limit,
                status,
                role
              );
            }
          } catch (error: any) {
            console.log(error);
          }
        }
      }
    };

    getData();
  }, [search, page, limit, status, role]);

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-6">
          {/* title */}
          <div className="w-full flex flex-row items-center justify-between">
            <div className="w-1/2 flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">Manage Users</p>
              <p className="text-xs font-normal w-full truncate">
                Approve or delete users and admins
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div
                className="p-3 rounded-xl bg-green-700 text-xs font-normal text-white cursor-pointer"
                onClick={() => navigate("/admin/users/add/user")}
              >
                Add User
              </div>
              <div
                className="p-3 rounded-xl bg-green-700 text-xs font-normal text-white cursor-pointer"
                onClick={() => navigate("/admin/users/add/admin")}
              >
                Add Admin
              </div>
            </div>
          </div>
          {/* search + filters */}
          <div className="w-full flex flex-row gap-4 items-center justify-start">
            <div className="relative w-2/5 lg:w-3/5 flex items-center justify-center">
              <input
                type="text"
                className="w-full outline-none border border-green-700 pl-10 pr-3 py-3 rounded-xl text-xs font-normal truncate"
                placeholder="search for users"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <RiSearchLine
                size={16}
                color="black"
                className="absolute left-4"
              />
            </div>
            <select
              className="outline-none bg-green-700 text-white p-3 rounded-xl text-xs font-normal"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select
              className="outline-none bg-green-700 text-white p-3 rounded-xl text-xs font-normal"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Approved</option>
              <option value="pending">Pending</option>
              <option value="inactive">Declined</option>
            </select>
          </div>
          {/* data */}
          <table className="w-full border-collapse border border-black/10">
            <thead>
              <tr>
                <th className="border border-black/10 text-left text-sm font-semibold p-2">
                  Name
                </th>
                <th className="border border-black/10 text-left hidden lg:table-cell text-sm font-semibold p-2">
                  Email
                </th>
                <th className="border border-black/10 text-left text-sm font-semibold p-2">
                  ID Card
                </th>
                <th className="border border-black/10 text-left text-sm font-semibold p-2">
                  Status
                </th>
                <th className="border border-black/10 text-left text-sm font-semibold p-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user: any) => (
                  <tr key={user._id}>
                    <td className="border border-black/10 text-left text-xs font-normal p-3">
                      <div className="w-full flex flex-wrap items-center justify-start gap-2">
                        <div
                          className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-200 bg-cover bg-center"
                          style={{
                            backgroundImage: `url("http://localhost:8080/api/images/${user.profile}")`,
                          }}
                        ></div>
                        <p className="text-xs font-normal">{`${user.firstName} ${user.lastName}`}</p>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell border border-black/10 text-left text-xs font-normal p-3">
                      {user.email}
                    </td>
                    <td className="border border-black/10 text-left p-3">
                      <p
                        className="text-green-700 text-xs font-semibold cursor-pointer"
                        onClick={() => {
                          setSelectedUser(user._id);
                          showApprovalForm(true);
                        }}
                      >
                        View File
                      </p>
                    </td>
                    <td className="border border-black/10 text-left text-xs font-normal p-3">
                      {user.status === "pending" ? (
                        <div className="inline-flex p-2 rounded-xl bg-yellow-500 text-white text-xs font-normal">
                          Pending
                        </div>
                      ) : user.status === "active" ? (
                        <div className="inline-flex p-2 rounded-xl bg-green-700 text-white text-xs font-normal">
                          Approved
                        </div>
                      ) : user.status === "inactive" ? (
                        <div className="inline-flex p-2 rounded-xl bg-red-700 text-white text-xs font-normal">
                          Declined
                        </div>
                      ) : null}
                    </td>
                    <td className="border border-black/10 text-left text-xs font-normal p-3">
                      <div className="flex flex-wrap items-center justify-start gap-2">
                        <div
                          className="p-3 rounded-xl bg-green-700 text-white cursor-pointer"
                          onClick={() =>
                            navigate("/admin/users/view", { state: user._id })
                          }
                        >
                          <p className="text-xs font-normal">View</p>
                        </div>
                        <div
                          className="p-3 rounded-xl bg-green-700 text-white cursor-pointer"
                          onClick={() =>
                            navigate("/admin/users/edit", { state: user._id })
                          }
                        >
                          <p className="text-xs font-normal">Edit</p>
                        </div>
                        {currentUser !== user._id ? (
                          <div
                            className="p-3 rounded-xl bg-red-700 text-white cursor-pointer"
                            onClick={() => {
                              setSelectedUser(user._id);
                              showDeleteModal(true);
                            }}
                          >
                            <p className="text-xs font-normal">Delete</p>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="">
                  <td
                    className="text-center p-6 text-xs font-normal"
                    colSpan={5}
                  >
                    No Results Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex flex-row items-center justify-center space-x-4 py-6">
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter(
                (pageNumber) =>
                  pageNumber === page ||
                  pageNumber === page - 1 ||
                  pageNumber === page + 1
              )
              .map((pageNumber) => (
                <p
                  key={pageNumber}
                  className={`cursor-pointer ${
                    page === pageNumber
                      ? "font-semibold text-sm"
                      : "font-normal text-xs text-[#6E6E6E]"
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </p>
              ))}
          </div>
        </div>
      </div>
      {deleteModal && (
        <DeleteModal
          onClose={() => {
            showDeleteModal(false);
          }}
          onDelete={() => deleteUser(selectedUser)}
        />
      )}
      {modal && (
        <Modal
          message={message}
          error={error}
          onClose={() => {
            showModal(false);
            showDeleteModal(false);
          }}
        />
      )}
      {approvalForm && (
        <UserApproval
          userId={selectedUser}
          onClose={() => {
            getUsers(search, barangayId, page, limit, status, role);
            showApprovalForm(false);
          }}
        />
      )}
    </>
  );
};

export default Users;
