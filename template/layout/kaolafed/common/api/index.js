export const doLogin = () => {
    window.location = `/api/doLogin?redirectUrl=${window.location.href}`;
};