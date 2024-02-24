import DeleteAccountModal from "@/components/modal/delete-account.modal.component"
import { auth } from "../../firebaseConfig"
import ProtectedRoute from "@/hoc/protected-route.hoc"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey, faTrashAlt, faUserCog } from "@fortawesome/free-solid-svg-icons"
import SignOutButtonComponent from "@/components/sign-out.button.component"
import ChangePasswordModal from "@/components/modal/change-password.modal.component"
import { useState, useEffect } from "react"

/**
 * Settings page for account management
 */
const SettingsPage = () => {
    const [ isChangePasswordModalOpen, setIsChangePasswordModalOpen ]   = useState(false)
    const [ isDeleteAccountModalOpen, setIsDeleteAccountModalOpen ]     = useState(false)
    const [ showChangePassword, setShowChangePassword ]                 = useState(false)

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

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-xl font-bold text-gray-700 mb-4 flex items-center justify-start">
                <FontAwesomeIcon icon={faUserCog} className="mr-2" />
                Account Settings
            </h1>

            {showChangePassword && (
                <button
                    onClick={() => setIsChangePasswordModalOpen(true)}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200 text-sm flex items-center justify-start mb-3"
                >
                    <FontAwesomeIcon icon={faKey} className="mr-2" />
                    Change Password
                </button>
            )}

            <SignOutButtonComponent />

            <button
                onClick={() => setIsDeleteAccountModalOpen(true)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200 text-sm flex items-center justify-start"
            >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Delete Account
            </button>

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