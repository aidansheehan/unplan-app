import ModalComponent from "./modal.component"

const { deleteUser } = require("firebase/auth")
const { auth } = require("../../../firebaseConfig")

/**
 * Modal to handle account deletion
 */
const DeleteAccountModal = ({ isOpen, onClose }) => {

    // Function to handle account deletion
    const handleDeleteAccount = async () => {
        const user = auth.currentUser

        if (!user) {
            alert('No user is signed in to delete.')
            return
        }

        if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
            deleteUser(user)
                .then(() => {
                    alert('Your account has been deleted')
                    onClose()
                })
                .catch((error) => {
                    console.error(error)
                    alert('Failed to delete account. You may need to sign in again or contact us for support.')
                })
        }
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={onClose}>
            <div className="p-4 text-center">
                <h3 className="font-bold text-lg mb-2">Delete Account</h3>
                <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 mr-2"
                >
                    Delete Account
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
      </ModalComponent>
    )
}

export default DeleteAccountModal