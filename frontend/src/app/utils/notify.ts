import { ToastOptions, TypeOptions, toast } from "react-toastify";

const toastDefaultProps: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export function notify(msg: string, type: TypeOptions) {
    toast(msg, {
        ...toastDefaultProps,
        type: type
    });
}