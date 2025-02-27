
const checkPermissions = ({ currentUserId, jobOwnerId }) => {
    if (currentUserId !== jobOwnerId.toString()) {
        throw new Error('Not authorized to access this route');
    }
}
export default checkPermissions;