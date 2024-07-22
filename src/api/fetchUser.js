import axiosAPI from "./axiosApi";

export const getUser = async (token) =>{
    const res = await axiosAPI.get('http://localhost:3000/profile', { headers: { authorization: token } })
    return res.data
}

export const loginUser = async ({email, pass}) => {
    const res = await axiosAPI.post('/login', {email, pass})
    return res.data;
}

export const registerUser = async ({ email, pass }) => {
    const res = await axiosAPI.post('/register', { email, pass });
    return res.data;
  };