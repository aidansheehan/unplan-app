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
        <div>
          <PageHeaderComponent text={'Settings'} />

          <div className="py-10 px-6">
            <dl className="space-y-6 divide-y divide-gray-200 text-sm leading-6">
              { user.displayName && (
                <div className="py-6">
                  <dt className="font-semibold text-gray-600">Full name</dt>
                  <dd className="mt-1 text-gray-700">{user.displayName}</dd>
                </div>
              )}

              { user.email && (
                <div className="py-6">
                  <dt className="font-semibold text-gray-600">Email address</dt>
                  <dd className="mt-1 text-gray-700">{user.email}</dd>
                </div>
              )}

              { showChangePassword && (
                <div className="py-6">
                  <dt className="font-semibold text-gray-600">
                    <h2 className="text-lg">Change Password</h2>
                    <p className="text-sm text-gray-500">Receive an email with instructions to update your password.</p>
                  </dt>
                  <dd className="mt-1">
                    <button
                      onClick={() => setIsChangePasswordModalOpen(true)}
                      className="bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200 text-sm px-4 py-2 rounded flex items-center"
                    >
                      <FontAwesomeIcon icon={faKey} className="mr-2" />
                      Change Password
                    </button>
                  </dd>
                </div>
              )}

              <div className="py-6">
                <dt className="font-semibold text-gray-600">
                  <h2 className="text-lg">Delete Account</h2>
                  <p className="text-sm text-gray-500">
                    No longer want to use our service? You can delete your account here. This action is not reversible.
                    All information related to this account will be deleted permanently.
                  </p>
                </dt>
                <dd className="mt-1">
                  <button
                    onClick={() => setIsDeleteAccountModalOpen(true)}
                    className="bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 text-sm px-4 py-2 rounded flex items-center"
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