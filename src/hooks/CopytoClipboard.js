import { toast } from 'react-hot-toast';

export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            toast.success('Copy to clipboard')
        })
        .catch((err) => {
            toast.error('something went wrong to copy')
        });
};
