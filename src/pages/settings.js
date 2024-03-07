import DeleteAccountModal from "@/components/modal/delete-account.modal.component"
import { auth } from "../../firebaseConfig"
import ProtectedRoute from "@/hoc/protected-route.hoc"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import ChangePasswordModal from "@/components/modal/change-password.modal.component"
import { useState, useEffect } from "react"
import PageHeaderComponent from "@/components/page-header"
import { useAuth } from "@/context/auth.context"


/**
 * Settings page for account management
 */
const SettingsPage = () => {
    const [ isChangePasswordModalOpen, setIsChangePasswordModalOpen ]   = useState(false)
    const [ isDeleteAccountModalOpen, setIsDeleteAccountModalOpen ]     = useState(false)
    const [ showChangePassword, setShowChangePassword ]                 = useState(false)

    const { user } = useAuth()

    useEffect(() => {
        const user = auth.currentUser
        if (user) {
            // Check if user has an email/password account
            const { providerData } = user
            const isEmailProvider = providerData.some(p => p.providerId === 'password')
            setShowChangePassword(isEmailProvider)
        }
    }, [])

    return (
        <div  >
            <PageHeaderComponent text={'Settings'} />

            <div>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                { user.displayName && (
                    <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{user.displayName}</div>
                    {/* <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Update
                    </button> */}
                  </dd>
                </div>
                )}
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{user.email}</div>
                    {/* <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Update
                    </button> */}
                  </dd>
                </div>

                {/* Change Password */}
                {
                    showChangePassword && (
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                <h2>Change Password</h2>
                                <p className="text-sm text-gray-400">Recieve an email with insturctions to update your password.</p>
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <button
                                    onClick={() => setIsChangePasswordModalOpen(true)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200 text-sm flex items-center justify-start mb-3"
                                >
                                    <FontAwesomeIcon icon={faKey} className="mr-2" />
                                    Change Password
                                </button>
                            </dd>
                        </div>
                    )
                }

                <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                            <h2>Delete Account</h2>
                            <p className="text-sm text-gray-400">
                            No longer want to use our service? You can delete your account here. This action is not reversible.
                    All information related to this account will be deleted permanently.
                            </p>
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <button
                                onClick={() => setIsDeleteAccountModalOpen(true)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-200 text-sm flex items-center justify-start"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                                Delete Account
                            </button>
                        </dd>
                    </div>
              </dl>
            </div>


            {/* Modals */}
            {showChangePassword && (
                <ChangePasswordModal
                    isOpen={isChangePasswordModalOpen}
                    onClose={() => setIsChangePasswordModalOpen(false)}
                />
            )}
            <DeleteAccountModal
                isOpen={isDeleteAccountModalOpen}
                onClose={() => setIsDeleteAccountModalOpen(false)}
            />

        </div>
    )

}

export default ProtectedRoute(SettingsPage)